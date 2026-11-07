"use client";
import { useState, useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import { whatsappUrl } from "@/lib/content";
import { Eyebrow, SectionTitle, ContactButton } from "./Primitives";
const quizQuestions = [
  {
    title: "Qual é o seu próximo objetivo?",
    hint: "O primeiro passo é saber aonde você quer chegar.",
    options: [
      "Hipertrofia",
      "Emagrecimento",
      "Condicionamento físico",
      "Qualidade de vida",
      "Melhorar a rotina de treinamento",
    ],
  },
  {
    title: "Qual é o seu nível de experiência?",
    hint: "Todo ponto de partida merece atenção.",
    options: [
      "Estou começando",
      "Já treino há algum tempo",
      "Tenho experiência e quero evoluir",
    ],
  },
  {
    title: "Como prefere ser acompanhado?",
    hint: "Uma preferência para a conversa. Disponibilidade a confirmar.",
    options: ["Presencial", "Online", "Quero entender as possibilidades"],
  },
  {
    title: "Quantos dias por semana?",
    hint: "Pense em uma frequência que se encaixa na sua rotina.",
    options: ["2 dias", "3 dias", "4 dias", "5 dias ou mais", "Ainda não sei"],
  },
];
export default function GoalsQuiz({
  contact,
}: {
  contact: (message?: string) => void;
}) {
  const [step, setStep] = useState(0),
    [answers, setAnswers] = useState<string[]>([]),
    [name, setName] = useState(""),
    [consent, setConsent] = useState(false),
    [finished, setFinished] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  function advance() {
    setStep(step + 1);
    setTimeout(() => heading.current?.focus({ preventScroll: true }), 0);
  }
  const message = `Olá, Matheus! Meu nome é ${name.trim()}. Conheci a MD Nation e gostaria de conversar sobre acompanhamento.\nObjetivo: ${answers[0]}\nExperiência: ${answers[1]}\nPreferência de atendimento: ${answers[2]}\nFrequência pretendida: ${answers[3]}.`;
  return (
    <section id="objetivos" className="section quiz-section">
      <div className="container quiz-layout">
        <div className="quiz-intro reveal">
          <Eyebrow>SEU PRIMEIRO MOVIMENTO</Eyebrow>
          <SectionTitle>
            O PRÓXIMO
            <br />
            PASSO É<br />
            <em>SEU.</em>
          </SectionTitle>
          <p>
            Conte um pouco sobre seu objetivo.
            <br />
            Vamos começar essa conversa?
          </p>
          <div className="quiz-time">
            <span />
            <small>5 PERGUNTAS · NO SEU RITMO</small>
          </div>
        </div>
        <div
          className="quiz-panel reveal"
          aria-label="Questionário de objetivos"
        >
          <div className="quiz-progress-label">
            <span>SEU PONTO DE PARTIDA</span>
            <span>{finished ? "RESUMO" : `0${step + 1} / 05`}</span>
          </div>
          <div
            className="quiz-progress"
            role="progressbar"
            aria-label="Progresso do questionário"
            aria-valuemin={0}
            aria-valuemax={5}
            aria-valuenow={finished ? 5 : step + 1}
          >
            <span style={{ width: `${finished ? 100 : (step + 1) * 20}%` }} />
          </div>
          {finished ? (
            <>
              <h3
                tabIndex={-1}
                ref={heading}
                className="quiz-step-heading"
                key={finished ? "summary" : step}
              >
                Vamos conversar, {name.trim()}.
              </h3>
              <p>Confira seu resumo antes de compartilhar.</p>
              <dl className="quiz-summary">
                {answers.map((a, i) => (
                  <div key={i}>
                    <dt>
                      {
                        [
                          "Objetivo",
                          "Experiência",
                          "Atendimento preferido",
                          "Frequência",
                        ][i]
                      }
                    </dt>
                    <dd>{a}</dd>
                  </div>
                ))}
              </dl>
              <ContactButton onClick={() => contact(message)}>
                CONVERSAR COM MATHEUS
              </ContactButton>
              <button
                className="back-button"
                onClick={() => {
                  setFinished(false);
                  setStep(0);
                }}
              >
                Revisar respostas
              </button>
              <small className="privacy-inline">
                Você revisa e envia a mensagem.{" "}
                {whatsappUrl()
                  ? "As respostas não são armazenadas no site."
                  : "WhatsApp em configuração: copie seu resumo ou converse pelo Instagram."}
              </small>
            </>
          ) : step < 4 ? (
            <>
              <h3
                tabIndex={-1}
                ref={heading}
                className="quiz-step-heading"
                key={finished ? "summary" : step}
              >
                {quizQuestions[step].title}
              </h3>
              <p>{quizQuestions[step].hint}</p>
              <div
                className="quiz-options"
                role="radiogroup"
                aria-label={quizQuestions[step].title}
              >
                {quizQuestions[step].options.map((option) => (
                  <label
                    key={option}
                    className={
                      answers[step] === option
                        ? "quiz-option active"
                        : "quiz-option"
                    }
                  >
                    <input
                      type="radio"
                      name={`step-${step}`}
                      checked={answers[step] === option}
                      onChange={() =>
                        setAnswers((prev) => {
                          const next = [...prev];
                          next[step] = option;
                          return next;
                        })
                      }
                    />
                    <span>{option}</span>
                    <span className="radio-dot">
                      {answers[step] === option && <Check size={11} />}
                    </span>
                  </label>
                ))}
              </div>
              <div className="quiz-controls">
                <button
                  className="back-button"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 0}
                >
                  Voltar
                </button>
                <button
                  className="button"
                  onClick={advance}
                  disabled={!answers[step]}
                >
                  CONTINUAR <ArrowRight size={18} />
                </button>
              </div>
            </>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (name.trim().length >= 2 && consent) {
                  setFinished(true);
                  setTimeout(
                    () => heading.current?.focus({ preventScroll: true }),
                    0,
                  );
                }
              }}
            >
              <h3
                tabIndex={-1}
                ref={heading}
                className="quiz-step-heading"
                key={finished ? "summary" : step}
              >
                Como podemos te chamar?
              </h3>
              <p>Seu nome e seu objetivo. A conversa começa por aqui.</p>
              <label className="input-label" htmlFor="visitor-name">
                SEU NOME
              </label>
              <input
                id="visitor-name"
                className="name-input"
                autoComplete="given-name"
                minLength={2}
                maxLength={60}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
                aria-describedby="name-hint"
                aria-invalid={name.length > 0 && name.trim().length < 2}
              />
              <p
                id="name-hint"
                className={
                  name.length > 0 && name.trim().length < 2
                    ? "input-error"
                    : "input-hint"
                }
              >
                {name.length > 0 && name.trim().length < 2
                  ? "Informe pelo menos dois caracteres para continuar."
                  : "Como você prefere ser chamado?"}
              </p>
              <label className="consent">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                />
                <span>
                  Concordo em compartilhar meu nome e as respostas com Matheus
                  ao enviar a mensagem no WhatsApp.
                </span>
              </label>
              <div className="quiz-controls">
                <button
                  type="button"
                  className="back-button"
                  onClick={() => setStep(3)}
                >
                  Voltar
                </button>
                <button
                  className="button"
                  type="submit"
                  disabled={name.trim().length < 2 || !consent}
                >
                  VER MEU RESUMO <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
