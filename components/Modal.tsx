"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { trapDialogFocus } from "@/lib/accessibility";
export default function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    d?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      d?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-label={title}
      onKeyDown={(e) => trapDialogFocus(e, e.currentTarget)}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-inner">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Fechar janela"
        >
          <X />
        </button>
        <h2>{title}</h2>
        {children}
      </div>
    </dialog>
  );
}
