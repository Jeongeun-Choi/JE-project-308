'use client';

import * as s from './KanbanBoard.css';
import { TicketCard } from './TicketCard';
import type { Ticket, TicketStatus } from '@/types';

const COLUMNS: { status: TicketStatus; label: string }[] = [
  { status: 'TODO', label: 'TODO' },
  { status: 'IN_PROGRESS', label: 'IN_PROGRESS' },
  { status: 'DONE', label: 'DONE' },
];

interface KanbanBoardProps {
  tickets: Ticket[];
  projectId: string;
}

export function KanbanBoard({ tickets, projectId }: KanbanBoardProps) {
  return (
    <div className={s.board}>
      {COLUMNS.map(({ status, label }) => {
        const columnTickets = tickets.filter((t) => t.status === status);
        return (
          <div key={status} className={s.column}>
            <div className={s.columnHeader}>
              <div className={`${s.indicator} ${s.indicatorVariants[status]}`} />
              <span className={s.columnTitle}>{label}</span>
              <span className={s.count}>CNT: {columnTickets.length}</span>
            </div>
            <div className={s.columnBody}>
              {columnTickets.length === 0 ? (
                <p className={s.emptyState}>— NO TASKS —</p>
              ) : (
                columnTickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    projectId={projectId}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
