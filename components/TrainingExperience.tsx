"use client";
import { useState } from "react";
import { Activity, Check, ArrowUpRight } from "lucide-react";
import { Wordmark, Eyebrow, SectionTitle } from "./Primitives";
export default function TrainingExperience() {
  const [day, setDay] = useState(0);
  return (
    <section className="section experience" data-scroll-scene>
      <div className="container experience-grid">
        <div className="phone-scene reveal">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="phone">
            <div className="phone-camera" />
            <div className="phone-top">
              <Wordmark />
              <span className="phone-profile" aria-hidden="true">MD</span>
            </div>
            <p className="tiny-label">UM PASSO DE CADA VEZ</p>
            <h3>
              Seu próximo
              <br />
              <em>movimento.</em>
            </h3>
            <div className="phone-week-heading"><span>SUA SEMANA</span><span>12 — 18</span></div>
            <div className="phone-days">
              {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
                <button
                  key={i}
                  className={day === i ? "selected" : ""}
                  onClick={() => setDay(i)}
                  title={`Ver dia ${i + 1} da semana`}
                  aria-pressed={day === i}
                >
                  {d}
                  <small>{12 + i}</small>
                </button>
              ))}
            </div>
            <div className="phone-workout">
              <span>SEU FOCO DO DIA</span>
              <h4>
                {
                  [
                    "Força & constância",
                    "Movimento & rotina",
                    "Foco & técnica",
                    "Pausa & equilíbrio",
                    "Intenção & progresso",
                    "Rotina & energia",
                    "Recuperar & recomeçar",
                  ][day]
                }
              </h4>
              <div className="workout-bars">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div>
                <Check size={15} /> Seu ritmo. Seu processo.
              </div>
            </div>
            <div className="phone-stat">
              <Activity size={24} />
              <div>
                Consistência faz parte.<small>Uma etapa por vez.</small>
              </div>
              <ArrowUpRight size={16} />
            </div>
            <div className="phone-home-indicator" aria-hidden="true" />
          </div>
        </div>
        <div className="reveal">
          <Eyebrow>ROTINA COM MAIS CLAREZA</Eyebrow>
          <SectionTitle>
            ACOMPANHAMENTO
            <br />
            NA PALMA DA
            <br />
            <em>SUA MÃO.</em>
          </SectionTitle>
          <p className="lead">
            Uma visão de como organização e treinamento podem caminhar juntos.
          </p>
          <p>
            Treinos, planejamento e evolução reunidos em uma experiência
            simples, para manter o foco no próximo passo.
          </p>
          <ul className="check-list">
            <li>
              <Check />
              Organização da rotina de treinamento
            </li>
            <li>
              <Check />
              Visão das etapas e dos objetivos
            </li>
            <li>
              <Check />
              Atenção à consistência do processo
            </li>
          </ul>
          <p className="preview-note">
            Converse com Matheus para conhecer as ferramentas e os canais de
            acompanhamento disponíveis para sua rotina.
          </p>
        </div>
      </div>
    </section>
  );
}
