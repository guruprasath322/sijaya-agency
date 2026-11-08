'use client';

import { useEffect, useRef } from 'react';

interface ModalProps {
  label: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ label, onClose, children }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog ref={dialog} aria-label={label} onCancel={event => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} className="app-modal fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center overflow-y-auto bg-transparent p-4 text-primary backdrop:bg-primary/50 backdrop:backdrop-blur-sm open:flex">
      {children}
    </dialog>
  );
}
