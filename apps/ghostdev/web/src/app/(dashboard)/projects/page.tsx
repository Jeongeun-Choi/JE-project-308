import { createClient } from '@/lib/supabase/server';

export default async function ProjectsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userProjects } = await supabase
    .from('ghostdev_projects')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at');

  return (
    <main>
      <h1>프로젝트</h1>
      <pre>{JSON.stringify(userProjects, null, 2)}</pre>
    </main>
  );
}
