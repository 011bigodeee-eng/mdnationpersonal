"use client";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
export function Wordmark() {
  return (
    <span className="wordmark">
      <span className="monogram">
        M<span>D</span>
      </span>
      <span className="wordmark-text">
        NATION<small>MATHEUS DIAS</small>
      </span>
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="display">{children}</h2>;
}

export function ContactButton({
  children,
  onClick,
  secondary = false,
}: {
  children: ReactNode;
  onClick: () => void;
  secondary?: boolean;
}) {
  return (
    <button
      className={`button ${secondary ? "button-secondary" : ""}`}
      onClick={onClick}
    >
      {children}
      <ArrowUpRight size={19} />
    </button>
  );
}
