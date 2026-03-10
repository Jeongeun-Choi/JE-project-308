import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createOctokit } from '@/lib/octokit';

interface Params {
  params: Promise<{ ticketId: string }>;
}

export async function POST(_request: NextRequest, { params }: Params) {
  const { ticketId } = await params;
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.provider_token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = session.user;

  // 티켓 + 프로젝트 정보 조회 (소유권 확인 포함)
  const { data: ticket } = await supabase
    .from('ghostdev_tickets')
    .select('*, ghostdev_projects!inner(*)')
    .eq('id', ticketId)
    .eq('ghostdev_projects.user_id', user.id)
    .single();

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
  }

  const project = ticket.ghostdev_projects;

  // 1. agent_runs 레코드 생성 — runId가 에이전트와의 correlation key
  const { data: run } = await supabase
    .from('ghostdev_agent_runs')
    .insert({
      ticket_id: ticket.id,
      triggered_by: user.id,
      status: 'PENDING',
    })
    .select()
    .single();

  if (!run) {
    return NextResponse.json({ error: 'Failed to create run' }, { status: 500 });
  }

  const dispatchInputs = {
    run_id: run.id,
    ticket_id: ticket.id,
    ticket_title: ticket.title,
    ticket_description: ticket.description ?? '',
    base_branch: ticket.base_branch ?? project.default_branch,
    supabase_url: process.env.SUPABASE_URL!,
  };

  try {
    // 2. workflow_dispatch 트리거 — provider_token은 저장 안 함
    const octokit = createOctokit(session.provider_token);
    await octokit.actions.createWorkflowDispatch({
      owner: project.repo_owner,
      repo: project.repo_name,
      workflow_id: project.workflow_file,
      ref: ticket.base_branch ?? project.default_branch,
      inputs: dispatchInputs,
    });

    // 3. QUEUED로 업데이트
    await supabase
      .from('ghostdev_agent_runs')
      .update({
        status: 'QUEUED',
        dispatch_inputs: JSON.stringify(dispatchInputs),
      })
      .eq('id', run.id);

    return NextResponse.json({ runId: run.id }, { status: 201 });
  } catch (error) {
    await supabase
      .from('ghostdev_agent_runs')
      .update({ status: 'FAILURE' })
      .eq('id', run.id);

    console.error('workflow_dispatch 실패:', error);
    return NextResponse.json(
      { error: 'Failed to dispatch workflow' },
      { status: 500 },
    );
  }
}
