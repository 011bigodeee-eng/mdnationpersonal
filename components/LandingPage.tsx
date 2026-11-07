"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Menu,
  X,
  Dumbbell,
  Monitor,
  ClipboardList,
  Target,
  Activity,
  TrendingUp,
  Check,
  ChevronDown,
  Instagram,
  Play,
  Plus,
  LockKeyhole,
  ScanLine,
} from "lucide-react";
import {
  client,
  whatsappUrl,
  services,
  method,
  faqs,
  results,
  testimonials,
  videos,
} from "@/lib/content";

const nav = [
  ["Sobre", "sobre"],
  ["Acompanhamento", "acompanhamento"],
  ["Método", "metodo"],
  ["Resultados", "resultados"],
];
function Wordmark() {
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
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}
function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="display">{children}</h2>;
}

function CinematicIntro() {
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem("md-intro"));
    } catch {}
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!seen && !reduced) {
      ref.current?.removeAttribute("open");
      ref.current?.showModal();
    }
    const t = setTimeout(
      () => {
        try {
          sessionStorage.setItem("md-intro", "1");
        } catch {}
        ref.current?.close();
        setVisible(false);
      },
      seen || reduced ? 0 : 2100,
    );
    return () => clearTimeout(t);
  }, []);
  function dismiss() {
    try {
      sessionStorage.setItem("md-intro", "1");
    } catch {}
    ref.current?.close();
    setVisible(false);
  }
  return visible ? (
    <dialog
      ref={ref}
      open
      className="intro"
      aria-label="Abertura MD Nation"
      onCancel={dismiss}
    >
      <div className="intro-glow" />
      <Wordmark />
      <p>DISCIPLINA CONSTRÓI EVOLUÇÃO.</p>
      <button onClick={dismiss}>
        Pular introdução <ArrowRight size={15} />
      </button>
    </dialog>
  ) : null;
}
function Navbar({ contact }: { contact: () => void }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function escape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="header">
      <div className="nav-shell">
        <a
          href="#inicio"
          className="brand-link"
          title="MD Nation — voltar ao início"
          onClick={() => setOpen(false)}
        >
          <Wordmark />
        </a>
        <nav
          aria-label="Navegação principal"
          id="main-nav"
          className={open ? "navigation open" : "navigation"}
        >
          {nav.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <button
            className="nav-contact"
            onClick={() => {
              setOpen(false);
              contact();
            }}
          >
            Vamos conversar <ArrowUpRight size={16} />
          </button>
        </nav>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
function ContactButton({
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
function Hero({ contact }: { contact: () => void }) {
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    if (
      !window.matchMedia(
        "(min-width: 851px) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        hero.current?.style.setProperty(
          "--hero-offset",
          `${Math.min(window.scrollY, 850) * 0.065}px`,
        );
        frame = 0;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={hero} className="hero" id="inicio">
      <Image
        className="hero-image"
        src="/images/gym.webp"
        alt="Barra e anilhas em academia escura com iluminação vermelha. Imagem ilustrativa gerada por IA."
        fill
        priority
        sizes="100vw"
      />
      <div className="hero-shade" />
      <div className="hero-grid" />
      <div className="container hero-content">
        <div className="hero-kicker">
          <span className="live-dot" /> MATHEUS DIAS{" "}
          <span className="kicker-divider" /> PERSONAL TRAINER & COACH
        </div>
        <h1>
          SUA EVOLUÇÃO
          <br />
          COMEÇA COM
          <br />
          <em>UMA DECISÃO.</em>
        </h1>
        <p>
          Treinamento com estratégia, acompanhamento
          <br className="desktop-break" /> individualizado e foco na sua
          evolução.
        </p>
        <div className="hero-actions">
          <ContactButton onClick={contact}>QUERO COMEÇAR AGORA</ContactButton>
          <a className="button button-ghost" href="#metodo">
            <Play size={15} /> CONHECER O MÉTODO
          </a>
        </div>
        <div className="hero-bottom-note">
          <span>SEU OBJETIVO. SUA JORNADA.</span>
          <span>UMA NOVA VERSÃO DE VOCÊ.</span>
        </div>
      </div>
      <div className="hero-index">
        01 <span>/ MD NATION</span>
      </div>
      <a className="scroll-cue" href="#sobre">
        <span>EXPLORE A SUA EVOLUÇÃO</span>
        <ArrowDown size={17} />
      </a>
      <span className="image-credit">CENÁRIO ILUSTRATIVO · IA</span>
    </section>
  );
}
function AboutTrainer() {
  return (
    <section id="sobre" className="section about">
      <div className="container about-grid">
        <div className="about-art reveal">
          <Image
            src={client.trainerPhoto ?? "/images/strength.webp"}
            alt={
              client.trainerPhoto
                ? "Matheus Dias"
                : "Equipamento de treinamento. Imagem ilustrativa, não representa o treinador."
            }
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
          />
          <div className="art-cross">+</div>
          <div className="photo-label">
            {client.trainerPhoto
              ? "MATHEUS DIAS / MD NATION"
              : "FORÇA SE CONSTRÓI. TODOS OS DIAS."}
            <small>
              {client.trainerPhoto
                ? "PERSONAL TRAINER & COACH"
                : "IMAGEM ILUSTRATIVA · FOTO DO TREINADOR EM BREVE"}
            </small>
          </div>
          <span className="frame-label">EST. A CADA NOVO COMEÇO</span>
        </div>
        <div className="about-copy reveal">
          <Eyebrow>POR TRÁS DA MD NATION</Eyebrow>
          <SectionTitle>
            CONHEÇA
            <br />
            MATHEUS <em>DIAS.</em>
          </SectionTitle>
          <p className="lead">
            Mais do que treinar, evoluir exige estratégia, disciplina e
            acompanhamento.
          </p>
          <p>
            {client.trainerBio ??
              "Conheça o profissional por trás da MD Nation. Um espaço para conectar seus objetivos a uma jornada de treinamento com intenção, constância e atenção a cada etapa."}
          </p>
          <div className="principles">
            {[
              [Target, "ESTRATÉGIA", "Um caminho com direção."],
              [Dumbbell, "DISCIPLINA", "Consistência em cada passo."],
              [TrendingUp, "EVOLUÇÃO", "Respeito ao seu processo."],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Target;
              return (
                <div key={String(title)}>
                  <I size={21} />
                  <span>
                    <strong>{String(title)}</strong>
                    <small>{String(text)}</small>
                  </span>
                </div>
              );
            })}
          </div>
          {client.professionalRegistration && (
            <p>Registro profissional: {client.professionalRegistration}</p>
          )}
          <p className="preview-note">
            PRÉVIA EDITORIAL · Biografia, formação e registro profissional
            aguardam validação.
          </p>
          <a
            className="text-link"
            href={client.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            CONHEÇA O PERFIL DO MATHEUS <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
function Services({ contact }: { contact: (message?: string) => void }) {
  return (
    <section id="acompanhamento" className="section services">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <Eyebrow>UM CAMINHO PARA O SEU OBJETIVO</Eyebrow>
            <SectionTitle>
              COMO POSSO
              <br />
              TE <em>AJUDAR?</em>
            </SectionTitle>
          </div>
          <div className="heading-aside">
            <p>
              Cada jornada começa de um jeito.
              <br />
              Descubra as possibilidades.
            </p>
            <span className="demo-tag">
              MODALIDADES DEMONSTRATIVAS · A CONFIRMAR
            </span>
          </div>
        </div>
        <div className="services-grid">
          {services.map((s, i) => {
            const Icon = [Dumbbell, Monitor, ClipboardList][i];
            return (
              <article className="service-card reveal" key={s.title}>
                <div className="service-photo">
                  <Image
                    src={s.image}
                    alt={`Composição de equipamentos para ${s.title}. Imagem ilustrativa.`}
                    fill
                    sizes="(max-width: 680px) 100vw, 33vw"
                  />
                  <span className="service-number">0{i + 1}</span>
                  <Icon size={25} />
                </div>
                <div className="service-copy">
                  <span className="tiny-label">{s.tag}</span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <button
                    className="service-link"
                    onClick={() =>
                      contact(
                        `Olá, Matheus! Vi a prévia da MD Nation e gostaria de confirmar a disponibilidade de ${s.title.toLowerCase()} e saber mais.`,
                      )
                    }
                  >
                    SOLICITAR INFORMAÇÕES <ArrowUpRight size={20} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function Method() {
  const icons = [ScanLine, ClipboardList, Dumbbell, TrendingUp];
  return (
    <section id="metodo" className="section method">
      <div className="container">
        <div className="center-heading reveal">
          <Eyebrow>INTENÇÃO EM CADA ETAPA</Eyebrow>
          <SectionTitle>
            O MÉTODO <em>MD NATION.</em>
          </SectionTitle>
          <p>Uma jornada estruturada para transformar objetivos em evolução.</p>
          <span className="tiny-label">
            JORNADA DEMONSTRATIVA · FORMATO A VALIDAR
          </span>
        </div>
        <div className="method-grid">
          {method.map((step, i) => {
            const Icon = icons[i];
            return (
              <article className="method-step reveal" key={step.title}>
                <div className="step-top">
                  <div className="step-icon">
                    <Icon size={28} />
                  </div>
                  <span>0{i + 1}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            );
          })}
        </div>
        <div className="method-footer">
          <span>SEM ATALHOS.</span>
          <span>COM DIREÇÃO.</span>
          <span>NO SEU RITMO.</span>
        </div>
      </div>
    </section>
  );
}
function ImageComparison({
  before,
  after,
  name,
}: {
  before: string;
  after: string;
  name: string;
}) {
  const [value, setValue] = useState(50);
  return (
    <div className="comparison">
      <Image src={after} alt={`${name}, depois`} fill sizes="50vw" />
      <div
        className="comparison-before"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      >
        <Image src={before} alt={`${name}, antes`} fill sizes="50vw" />
      </div>
      <div className="comparison-line" style={{ left: `${value}%` }} />
      <span className="comparison-label">ANTES</span>
      <span className="comparison-label after">DEPOIS</span>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label={`Comparar antes e depois de ${name}`}
      />
    </div>
  );
}
function Results() {
  return (
    <section id="resultados" className="section results">
      <div className="container results-grid">
        <div className="reveal">
          <Eyebrow>HISTÓRIAS DE EVOLUÇÃO</Eyebrow>
          <SectionTitle>
            VAI ALÉM
            <br />
            DA <em>ESTÉTICA.</em>
          </SectionTitle>
          <p>
            Seu processo merece ser contado com verdade.
            <br />
            Cada história tem seu próprio tempo.
          </p>
          <span className="demo-tag">
            ESPAÇO RESERVADO PARA RESULTADOS AUTORIZADOS
          </span>
        </div>
        <div className="result-placeholder reveal">
          {results.length ? (
            results.map((r) => (
              <div key={r.name}>
                <ImageComparison {...r} />
                <h3>{r.name}</h3>
                <p>{r.description}</p>
              </div>
            ))
          ) : (
            <>
              <div className="placeholder-grid">
                <div>
                  <span>01</span>
                  <Plus size={32} />
                  <small>ANTES</small>
                </div>
                <div>
                  <span>02</span>
                  <Plus size={32} />
                  <small>DEPOIS</small>
                </div>
              </div>
              <div className="placeholder-caption">
                <LockKeyhole size={17} />
                <p>
                  Resultados reais. Histórias autorizadas.
                  <small>
                    Nenhuma transformação fictícia. Em breve, com a autorização
                    de cada aluno.
                  </small>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
function TrainingExperience() {
  const [day, setDay] = useState(0);
  return (
    <section className="section experience">
      <div className="container experience-grid">
        <div className="phone-scene reveal">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="phone">
            <div className="phone-camera" />
            <div className="phone-top">
              <Wordmark />
              <span>PRÉVIA</span>
            </div>
            <p className="tiny-label">UM PASSO DE CADA VEZ</p>
            <h3>
              Seu próximo
              <br />
              <em>movimento.</em>
            </h3>
            <div className="phone-days">
              {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
                <button
                  key={i}
                  className={day === i ? "selected" : ""}
                  onClick={() => setDay(i)}
                  title={`Ver dia ${i + 1} da semana demonstrativa`}
                  aria-pressed={day === i}
                >
                  {d}
                  <small>{12 + i}</small>
                </button>
              ))}
            </div>
            <div className="phone-workout">
              <span>PLANEJAMENTO CONCEITUAL</span>
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
            <span className="phone-disclaimer">INTERFACE DEMONSTRATIVA</span>
          </div>
          <span className="scene-note">
            DESIGN CONCEITUAL / NÃO É UM APLICATIVO DISPONÍVEL
          </span>
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
            simples. Explore o conceito ao lado.
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
            Conceito visual demonstrativo. Ferramentas, recursos e canais de
            acompanhamento dependem de confirmação do treinador. Não representa
            um aplicativo próprio.
          </p>
        </div>
      </div>
    </section>
  );
}
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
function GoalsQuiz({ contact }: { contact: (message?: string) => void }) {
  const [step, setStep] = useState(0),
    [answers, setAnswers] = useState<string[]>([]),
    [name, setName] = useState(""),
    [consent, setConsent] = useState(false),
    [finished, setFinished] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  function advance() {
    setStep(step + 1);
    setTimeout(() => heading.current?.focus(), 0);
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
        <div className="quiz-panel reveal">
          <div className="quiz-progress-label">
            <span>SEU PONTO DE PARTIDA</span>
            <span>{finished ? "RESUMO" : `0${step + 1} / 05`}</span>
          </div>
          <div className="quiz-progress">
            <span style={{ width: `${finished ? 100 : (step + 1) * 20}%` }} />
          </div>
          {finished ? (
            <>
              <h3 tabIndex={-1} ref={heading}>
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
                O envio só acontece por sua ação no WhatsApp. Este formulário
                não envia nem armazena suas respostas em um servidor.
              </small>
            </>
          ) : step < 4 ? (
            <>
              <h3 tabIndex={-1} ref={heading}>
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
                  setTimeout(() => heading.current?.focus(), 0);
                }
              }}
            >
              <h3 tabIndex={-1} ref={heading}>
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
              />
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
function Testimonials() {
  const [index, setIndex] = useState(0);
  return (
    <section className="section testimonials">
      <div className="container testimonial-layout">
        <div>
          <Eyebrow>VOZES DA JORNADA</Eyebrow>
          <SectionTitle>
            O QUE OS
            <br />
            ALUNOS <em>DIZEM.</em>
          </SectionTitle>
        </div>
        <div className="testimonial-space">
          {testimonials.length ? (
            <>
              <blockquote>
                “{testimonials[index].text}”
                <cite>{testimonials[index].name}</cite>
              </blockquote>
              <div className="carousel-controls">
                <button
                  aria-label="Depoimento anterior"
                  onClick={() =>
                    setIndex(
                      (index - 1 + testimonials.length) % testimonials.length,
                    )
                  }
                >
                  ←
                </button>
                <button
                  aria-label="Próximo depoimento"
                  onClick={() => setIndex((index + 1) % testimonials.length)}
                >
                  →
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="quote-symbol">“</span>
              <p>
                Histórias de verdade
                <br />
                merecem vozes de verdade.
              </p>
              <small>
                ESPAÇO PREPARADO PARA DEPOIMENTOS REAIS E AUTORIZADOS.
              </small>
              <span className="demo-tag">CONTEÚDO AINDA NÃO DISPONÍVEL</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
function Gallery({ openVideo }: { openVideo: (src: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <section id="galeria" className="section gallery">
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>A ESSÊNCIA DO MOVIMENTO</Eyebrow>
            <SectionTitle>
              TREINO. DISCIPLINA.
              <br />
              <em>EVOLUÇÃO.</em>
            </SectionTitle>
          </div>
          <p className="heading-aside">
            Um olhar sobre o universo MD Nation.
            <br />
            <span className="tiny-label">
              GALERIA CONCEITUAL · IMAGENS GERADAS POR IA
            </span>
          </p>
        </div>
        <div className="gallery-grid">
          {[
            ["/images/gym.webp", "O AMBIENTE", "01"],
            ["/images/strength.webp", "A CONSTÂNCIA", "02"],
            ["/images/detail.webp", "A INTENÇÃO", "03"],
          ].map(([src, title, n]) => (
            <button
              key={src}
              className="gallery-item reveal"
              onClick={() => setSelected(src)}
              title={`Ampliar imagem ilustrativa: ${title}`}
            >
              <Image
                src={src}
                alt={`Equipamentos de academia: ${title}. Imagem ilustrativa gerada por IA.`}
                fill
                sizes="(max-width:680px) 100vw, 50vw"
              />
              <span>
                <small>{n} / MD NATION</small>
                {title}
              </span>
              <Plus size={20} />
            </button>
          ))}
          {videos.map((v) => (
            <button
              key={v.src}
              className="gallery-item"
              onClick={() => openVideo(v.src)}
            >
              <Image src={v.poster} alt={v.title} fill sizes="50vw" />
              <Play />
              <span>{v.title}</span>
            </button>
          ))}
        </div>
        <div className="gallery-footer">
          <span>SEM PERSONAGENS FICTÍCIOS. ESPAÇO PARA CONTEÚDOS REAIS.</span>
          <a
            className="text-link"
            href={client.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={16} /> @THEUSDIAS_TREINADOR{" "}
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      {selected && (
        <Modal title="Galeria ilustrativa" onClose={() => setSelected(null)}>
          <div className="lightbox-image">
            <Image
              src={selected}
              alt="Composição de equipamentos de academia. Imagem ilustrativa gerada por IA."
              fill
              sizes="90vw"
            />
          </div>
          <p className="modal-caption">
            Imagem conceitual gerada por IA. Não representa o local de
            atendimento.
          </p>
        </Modal>
      )}
    </section>
  );
}
function FAQ() {
  return (
    <section className="section faq" id="duvidas">
      <div className="container faq-grid">
        <div>
          <Eyebrow>CLAREZA PARA COMEÇAR</Eyebrow>
          <SectionTitle>
            ANTES DO
            <br />
            PRIMEIRO <em>PASSO.</em>
          </SectionTitle>
          <p>
            Algumas respostas para ajudar
            <br />a iniciar sua jornada.
          </p>
          <span className="demo-tag">INFORMAÇÕES COMERCIAIS A CONFIRMAR</span>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a], i) => (
            <details key={q}>
              <summary>
                <span className="faq-number">0{i + 1}</span>
                <span>{q}</span>
                <ChevronDown size={18} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
function FinalCTA({ contact }: { contact: () => void }) {
  return (
    <section id="contato" className="final-cta">
      <Image src="/images/gym.webp" alt="" fill sizes="100vw" />
      <div className="cta-shade" />
      <div className="container">
        <Eyebrow>SUA JORNADA COMEÇA AQUI</Eyebrow>
        <h2>
          PRONTO PARA
          <br />
          <em>EVOLUIR?</em>
        </h2>
        <p>
          Dê o primeiro passo e descubra como um acompanhamento
          <br className="desktop-break" /> personalizado pode ajudar na sua
          jornada.
        </p>
        <ContactButton onClick={contact}>
          QUERO INICIAR MEU ACOMPANHAMENTO
        </ContactButton>
        <span className="cta-footnote">
          UMA DECISÃO HOJE. UM NOVO CAMINHO À FRENTE.
        </span>
      </div>
    </section>
  );
}
function Footer({ privacy }: { privacy: () => void }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <a
            href="#inicio"
            title="MD Nation — voltar ao início"
          >
            <Wordmark />
          </a>
          <p>ESTRATÉGIA. DISCIPLINA. EVOLUÇÃO.</p>
          <a
            className="instagram-button"
            href={client.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Matheus Dias"
          >
            <Instagram size={20} />
            <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="footer-nav">
          <span>MATHEUS DIAS · PERSONAL TRAINER & COACH</span>
          <nav aria-label="Navegação do rodapé">
            <a href="#sobre">Sobre</a>
            <a href="#metodo">Método</a>
            <a href="#objetivos">Seu objetivo</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} MD Nation. Todos os direitos
            reservados.
          </span>
          <button onClick={privacy}>Privacidade</button>
          <span>PRÉVIA COMERCIAL · DADOS SUJEITOS À VALIDAÇÃO</span>
        </div>
      </div>
    </footer>
  );
}
function Modal({
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
export default function LandingPage() {
  const [modal, setModal] = useState<"contact" | "privacy" | null>(null),
    [video, setVideo] = useState<string | null>(null),
    [message, setMessage] = useState(client.message),
    [copied, setCopied] = useState(false),
    [copyError, setCopyError] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);
  function contact(customMessage?: string) {
    const text = customMessage ?? client.message;
    const url = whatsappUrl(text);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    setMessage(text);
    setCopied(false);
    setCopyError(false);
    setModal("contact");
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <CinematicIntro />
      <Navbar contact={() => contact()} />
      <main id="main">
        <Hero contact={() => contact()} />
        <div className="brand-strip">
          <span>MD NATION</span>
          <i>+</i>
          <span>FEITO DE DISCIPLINA</span>
          <i>+</i>
          <span>MOVIDO POR EVOLUÇÃO</span>
          <i>+</i>
          <span>SEU PRÓXIMO NÍVEL</span>
          <i>+</i>
        </div>
        <AboutTrainer />
        <Services contact={contact} />
        <Method />
        <Results />
        <TrainingExperience />
        <GoalsQuiz contact={contact} />
        <Testimonials />
        <Gallery openVideo={setVideo} />
        <FAQ />
        <FinalCTA contact={() => contact()} />
      </main>
      <Footer privacy={() => setModal("privacy")} />
      {modal === "contact" && (
        <Modal
          title="Seu próximo passo está aqui."
          onClose={() => setModal(null)}
        >
          <span className="demo-tag">
            PRÉVIA · WHATSAPP AINDA NÃO CONFIGURADO
          </span>
          <p>
            O contato comercial será ativado após a confirmação do número do
            Matheus. Sua mensagem já está pronta. Você pode copiá-la ou visitar
            o perfil no Instagram.
          </p>
          <textarea
            aria-label="Mensagem preparada para Matheus"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
          />
          <div className="modal-actions">
            <button
              className="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(message);
                  setCopied(true);
                  setCopyError(false);
                } catch {
                  setCopyError(true);
                }
              }}
            >
              {copied ? "MENSAGEM COPIADA" : "COPIAR MENSAGEM"}{" "}
              {copied ? <Check size={18} /> : <ClipboardList size={18} />}
            </button>
            <a
              className="text-link"
              href={client.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              VISITAR INSTAGRAM <ArrowUpRight size={18} />
            </a>
          </div>
          <p role="status" className="privacy-inline">
            {copyError
              ? "Selecione o texto acima e copie manualmente."
              : copied
                ? "Mensagem copiada. Nenhuma informação foi enviada."
                : "Nenhuma informação foi enviada."}
          </p>
        </Modal>
      )}
      {modal === "privacy" && (
        <Modal title="Sua privacidade." onClose={() => setModal(null)}>
          <p>
            Esta prévia não possui cadastro, rastreamento analítico ou envio de
            formulário a um servidor. As respostas do questionário permanecem na
            memória desta página e são apagadas ao recarregá-la.
          </p>
          <p>
            Somente ao escolher conversar pelo WhatsApp, com o contato
            configurado, seu nome e suas respostas serão incluídos em uma
            mensagem. Você revisa e envia a mensagem no próprio WhatsApp. Links
            para Instagram e WhatsApp levam a serviços externos, sujeitos às
            políticas de seus operadores.
          </p>
          <p>
            Apenas uma marcação na sessão do navegador evita repetir a abertura.
            Não solicitamos dados médicos. Uma política definitiva deverá ser
            validada pelo responsável antes da publicação comercial.
          </p>
        </Modal>
      )}
      {video && (
        <Modal title="Conteúdo de treinamento" onClose={() => setVideo(null)}>
          <video controls playsInline src={video} className="gallery-video">
            <track kind="captions" />
            Seu navegador não suporta este vídeo.
          </video>
        </Modal>
      )}
    </>
  );
}
