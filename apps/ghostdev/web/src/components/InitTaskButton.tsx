'use client';

import { useState } from 'react';
import { CreateTicketModal } from './CreateTicketModal';
import * as s from './InitTaskButton.css';

interface Props {
  projectId: string;
  defaultBranch: string;
}

export function InitTaskButton({ projectId, defaultBranch }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={s.button} onClick={() => setIsOpen(true)}>
        <span className={s.inner}>+ INIT_TASK</span>
      </button>
      {isOpen && (
        <CreateTicketModal
          projectId={projectId}
          defaultBranch={defaultBranch}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
