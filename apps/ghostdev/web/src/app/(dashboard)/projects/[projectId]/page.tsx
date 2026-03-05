import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { KanbanBoard } from '@/components/KanbanBoard';
import type { Ticket } from '@/types';
import * as s from './page.css';

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
    <div className={s.pageWrapper}>
      <div className={s.pageHeader}>
        <div>
          <div className={s.breadcrumb}>
            <span>⎇</span>
            <span>NODE: {project.repo_full_name}</span>
          </div>
          <h1 className={s.pageTitle}>{project.name}</h1>
        </div>
        <button className={s.initTaskButton}>
          <span className={s.initTaskInner}>
            + INIT_TASK
          </span>
        </button>
      </div>

      <div className={s.boardWrapper}>
        <KanbanBoard
          tickets={(projectTickets ?? []) as Ticket[]}
          projectId={projectId}
        />
      </div>
    </div>
  );
}
