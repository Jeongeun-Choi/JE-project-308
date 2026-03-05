import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const createProjectSchema = z.object({
  repoOwner: z.string().min(1),
  repoName: z.string().min(1),
  repoFullName: z.string().min(1),
  repoNodeId: z.string().min(1),
  defaultBranch: z.string().default('main'),
  workflowFile: z.string().default('ghostdev.yml'),
  name: z.string().min(1),
  description: z.string().optional(),
  workspaceConfig: z.record(z.unknown()).optional(),
});

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data } = await supabase
    .from('ghostdev_projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at');

  return NextResponse.json(data ?? []);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createProjectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { data: created } = await supabase
    .from('ghostdev_projects')
    .insert({
      user_id: user.id,
      repo_owner: parsed.data.repoOwner,
      repo_name: parsed.data.repoName,
      repo_full_name: parsed.data.repoFullName,
      repo_node_id: parsed.data.repoNodeId,
      default_branch: parsed.data.defaultBranch,
      workflow_file: parsed.data.workflowFile,
      name: parsed.data.name,
      description: parsed.data.description ?? null,
      workspace_config: parsed.data.workspaceConfig ?? null,
    })
    .select()
    .single();

  return NextResponse.json(created, { status: 201 });
}
