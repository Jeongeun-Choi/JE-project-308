import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

interface Props {
  params: Promise<{ projectId: string; runId: string }>;
}

export default async function RunPage({ params }: Props) {
  const { runId } = await params;
  const supabase = await createClient();

  const { data: run } = await supabase
    .from('ghostdev_agent_runs')
    .select('*, ghostdev_tickets(*)')
    .eq('id', runId)
    .single();

  if (!run) notFound();

  return (
    <main>
      <h1>Run #{runId.slice(0, 8)}</h1>
      <p>Status: {run.status}</p>
      <p>Ticket: {run.ghostdev_tickets?.title}</p>
      {/* 실시간 로그 뷰어는 클라이언트 컴포넌트로 별도 추가 예정 */}
    </main>
  );
}
