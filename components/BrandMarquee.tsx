"use client";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
const words = [
  "MD NATION",
  "BUILT BY DISCIPLINE",
  "MOVIDO POR EVOLUÇÃO",
  "SEU PRÓXIMO NÍVEL",
];
export default function BrandMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <div
      className="brand-strip"
      role="region"
      aria-label="Identidade MD Nation"
    >
      <div className={`brand-strip-track ${paused ? "is-paused" : ""}`}>
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="brand-strip-set"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {words.map((word) => (
              <span className="brand-strip-item" key={word}>
                <span>{word}</span>
                <i aria-hidden="true">+</i>
              </span>
            ))}
          </div>
        ))}
      </div>
      <button
        className="brand-strip-toggle"
        aria-label={paused ? "Retomar faixa" : "Pausar faixa"}
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={13} /> : <Pause size={13} />}
      </button>
    </div>
  );
}
