import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { projectId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: project } = await supabase
    .from('ghostdev_projects')
    .select('*')
    .eq('id', projectId)
    .eq('user_id', user!.id)
    .single();

  if (!project) notFound();

  const { data: projectTickets } = await supabase
    .from('ghostdev_tickets')
    .select('*')
    .eq('project_id', projectId)
    .order('priority');

  return (
    <main>
      <h1>{project.name}</h1>
      <p>{project.repo_full_name}</p>
      <pre>{JSON.stringify(projectTickets, null, 2)}</pre>
    </main>
  );
}
