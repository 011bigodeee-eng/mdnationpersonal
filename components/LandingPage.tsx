"use client";

import Image from "next/image";
import { trapDialogFocus } from "@/lib/accessibility";
import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Dumbbell,
  Monitor,
  ClipboardList,
  Target,
  TrendingUp,
  Check,
  Instagram,
  Plus,
  ScanLine,
} from "lucide-react";
import {
  client,
  media,
  whatsappUrl,
  services,
  method,
  faqs,
  results,
  testimonials,
} from "@/lib/content";

import CinematicFilm from "./CinematicFilm";
import Hero from "./Hero";
import DisciplineTransition from "./DisciplineTransition";
import dynamic from "next/dynamic";
import { Wordmark, Eyebrow, SectionTitle, ContactButton } from "./Primitives";
import Modal from "./Modal";
const GoalsQuiz = dynamic(() => import("./GoalsQuiz"));
const Gallery = dynamic(() => import("./Gallery"));
const TrainingExperience = dynamic(() => import("./TrainingExperience"));
import { useCinematicMotion } from "./hooks/useCinematicMotion";

const nav = [
  ["Sobre", "sobre"],
  ["Acompanhamento", "acompanhamento"],
  ["Método", "metodo"],
  ["Resultados", "resultados"],
];
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
    // The opening begins with the initial HTML, not after React hydration.
    const started = Number(
      document.documentElement.dataset.mdIntroStarted ?? performance.now(),
    );
    const remaining = Math.max(0, 1650 - (performance.now() - started));
    const t = setTimeout(
      () => {
        try {
          sessionStorage.setItem("md-intro", "1");
        } catch {}
        ref.current?.close();
        document.documentElement.dataset.mdIntro = "skip";
        setVisible(false);
      },
      seen || reduced ? 0 : remaining,
    );
    return () => clearTimeout(t);
  }, []);
  function dismiss() {
    try {
      sessionStorage.setItem("md-intro", "1");
    } catch {}
    ref.current?.close();
    document.documentElement.dataset.mdIntro = "skip";
    setVisible(false);
  }
  return visible ? (
    <dialog
      ref={ref}
      open
      className="intro"
      aria-label="Abertura MD Nation"
      onKeyDown={(e) => trapDialogFocus(e, e.currentTarget)}
      onCancel={dismiss}
    >
      <div className="intro-glow" />
      <div className="intro-line" />
      <span className="intro-edition">MD NATION / BRAND EXPERIENCE</span>
      <Wordmark />
      <p>BUILT BY DISCIPLINE.</p>
    </dialog>
  ) : null;
}
function Navbar({ contact }: { contact: () => void }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!open) return;
    const d = dialog.current;
    const opener = toggle.current;
    const previous = document.body.style.overflow;
    d?.showModal();
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 851px)");
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", resize);
    return () => {
      d?.close();
      document.body.style.overflow = previous;
      desktop.removeEventListener("change", resize);
      opener?.focus();
    };
  }, [open]);
  const links = (
    <>
      {nav.map(([label, id], i) => (
        <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
          <span className="nav-number">0{i + 1}</span>
          {label}
          <ArrowUpRight size={19} />
        </a>
      ))}
    </>
  );
  return (
    <header className="header">
      <div className="nav-shell">
        <a
          href="#inicio"
          className="brand-link"
          title="MD Nation — voltar ao início"
        >
          <Wordmark />
        </a>
        <nav className="navigation" aria-label="Navegação principal">
          {links}
          <button className="nav-contact" onClick={contact}>
            Vamos conversar <ArrowUpRight size={16} />
          </button>
        </nav>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(true)}
        >
          <span>MENU</span>
          <Menu size={22} />
        </button>
      </div>
      <dialog
        ref={dialog}
        className="mobile-menu"
        aria-label="Menu de navegação"
        onKeyDown={(e) => trapDialogFocus(e, e.currentTarget)}
        onCancel={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
      >
        <div className="mobile-menu-top">
          <Wordmark />
          <button
            aria-label="Fechar menu"
            aria-expanded={open}
            onClick={() => setOpen(false)}
          >
            <X size={25} />
          </button>
        </div>
        <span className="tiny-label">SEU PRÓXIMO MOVIMENTO</span>
        <nav id="main-nav" aria-label="Navegação mobile">
          {links}
          <a href="#objetivos" onClick={() => setOpen(false)}>
            <span className="nav-number">05</span>Seu objetivo
            <ArrowUpRight size={19} />
          </a>
        </nav>
        <button
          className="button"
          onClick={() => {
            setOpen(false);
            contact();
          }}
        >
          QUERO COMEÇAR AGORA <ArrowUpRight size={19} />
        </button>
        <a
          className="mobile-social"
          href={client.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram size={17} />
          @theusdias_treinador
        </a>
        <p>BUILT BY DISCIPLINE.</p>
      </dialog>
    </header>
  );
}
function AboutTrainer() {
  return (
    <section id="sobre" className="section about">
      <div className="container">
        <div className="editorial-header">
          <span>01 / O PROFISSIONAL</span>
          <span>MATHEUS DIAS · MD NATION</span>
        </div>
        <div className="about-grid">
          <div className="about-copy reveal">
            <Eyebrow>POR TRÁS DO MOVIMENTO</Eyebrow>
            <SectionTitle>
              CONHEÇA
              <br />
              MATHEUS <em>DIAS.</em>
            </SectionTitle>
            <p className="lead">
              A disciplina tem muitas formas.
              <br />A sua jornada é única.
            </p>
            <p>
              {client.trainerBio ??
                "Personal trainer e coach, Matheus Dias é o profissional por trás da MD Nation. Entre a academia e a vivência esportiva, sua presença dá rosto a uma jornada de treinamento com estratégia, disciplina e atenção ao processo."}
            </p>
            <div className="principles">
              {[
                {
                  Icon: Target,
                  title: "Estratégia",
                  text: "Um caminho com direção.",
                },
                {
                  Icon: Dumbbell,
                  title: "Disciplina",
                  text: "Consistência em cada passo.",
                },
                {
                  Icon: TrendingUp,
                  title: "Evolução",
                  text: "Respeito ao seu processo.",
                },
              ].map(({ Icon, title, text }, i) => (
                <div key={title}>
                  <span className="principle-number">0{i + 1}</span>
                  <Icon size={21} />
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </div>
              ))}
            </div>
            {client.professionalRegistration && (
              <p className="registration">
                Registro profissional: {client.professionalRegistration}
              </p>
            )}
            <a
              className="text-link"
              href={client.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              CONHEÇA O MATHEUS NO INSTAGRAM <ArrowUpRight size={18} />
            </a>
          </div>
          <div
            className={`about-composition reveal ${client.trainerAboutPhoto ? "about-composition--real" : ""}`}
            data-tilt
          >
            <div className="about-art">
              <Image
                src={client.trainerAboutPhoto ?? media.about}
                alt={
                  client.trainerAboutPhoto
                    ? "Matheus Dias de quimono branco durante a prática de jiu-jítsu. Fotografia real fornecida pelo cliente."
                    : "Texturas de cordas em um ambiente de treinamento."
                }
                fill
                sizes="(max-width:680px) 100vw, 45vw"
                quality={85}
              />
              <span className="art-cross">+</span>
              <span className="about-vertical">
                VIVÊNCIA ESPORTIVA / JIU-JÍTSU.
              </span>
            </div>
            <div className="about-statement">
              <span>MD / MINDSET</span>
              <p>
                DISCIPLINA QUE
                <br />
                <em>ACOMPANHA O MOVIMENTO.</em>
              </p>
              <small>
                {client.trainerAboutPhoto
                  ? "MATHEUS DIAS · FOTOGRAFIA REAL"
                  : "MD NATION"}
              </small>
            </div>
            <span className="about-caption">
              {client.trainerBio
                ? "UMA JORNADA COM DIREÇÃO."
                : "FORMAÇÃO E REGISTRO PROFISSIONAL A CONFIRMAR"}
            </span>
          </div>
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
            <Eyebrow>ENCONTRE O SEU CAMINHO</Eyebrow>
            <SectionTitle>
              NÃO EXISTE
              <br />
              <em>UMA ÚNICA FORMA.</em>
            </SectionTitle>
          </div>
          <div className="heading-aside">
            <p>
              O seu objetivo é único.
              <br />A conversa começa por ele.
            </p>
            <span className="demo-tag">
              MODALIDADES ILUSTRATIVAS · CONSULTE DISPONIBILIDADE
            </span>
          </div>
        </div>
        <div className="services-grid">
          {services.map((service, i) => {
            const Icon =
              service.icon === "dumbbell"
                ? Dumbbell
                : service.icon === "monitor"
                  ? Monitor
                  : ClipboardList;
            return (
              <article
                className={`service-card service-card-${i + 1} reveal`}
                key={service.title}
                data-tilt
              >
                <div className="service-photo">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width:680px) 100vw, (max-width:1024px) 50vw, 40vw"
                  />
                  <span className="service-number">0{i + 1}</span>
                  <span className="service-card-label">{service.tag}</span>
                </div>
                <div className="service-copy">
                  <Icon size={22} />
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <button
                    className="service-link"
                    onClick={() =>
                      contact(
                        `Olá, Matheus! Conheci a MD Nation e gostaria de confirmar a disponibilidade de ${service.title.toLowerCase()} e saber mais.`,
                      )
                    }
                  >
                    SOLICITAR INFORMAÇÕES <ArrowUpRight size={22} />
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
function Method({ contact }: { contact: () => void }) {
  const icons = [ScanLine, ClipboardList, Dumbbell, TrendingUp];
  return (
    <section id="metodo" className="section method" data-scroll-scene>
      <div className="container">
        <div className="method-heading reveal">
          <div>
            <Eyebrow>O MÉTODO MD NATION</Eyebrow>
            <SectionTitle>
              EVOLUIR É<br />
              <em>UM PROCESSO.</em>
            </SectionTitle>
          </div>
          <div>
            <p>
              Uma jornada estruturada para transformar objetivos em evolução. Um
              passo de cada vez.
            </p>
            <span className="tiny-label">
              PROPOSTA DE JORNADA · FORMATO A CONFIRMAR
            </span>
          </div>
        </div>
        <div className="method-grid">
          {method.map((step, i) => {
            const Icon = icons[i];
            return (
              <article className="method-step reveal" key={step.title}>
                <div className="step-top">
                  <span>0{i + 1}</span>
                  <div className="step-icon">
                    <Icon size={25} />
                  </div>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            );
          })}
        </div>
        <div className="method-footer">
          <p>O melhor ponto de partida é o seu.</p>
          <button className="text-link" onClick={contact}>
            QUERO COMEÇAR AGORA <ArrowUpRight size={19} />
          </button>
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
    <section
      id="resultados"
      className={`section results ${results.length ? "has-results" : ""}`}
    >
      <div className="container results-grid">
        <div className="results-copy reveal">
          <Eyebrow>
            {results.length
              ? "HISTÓRIAS DE EVOLUÇÃO"
              : "EVOLUÇÃO É MAIS DO QUE UMA IMAGEM"}
          </Eyebrow>
          <SectionTitle>
            VAI ALÉM
            <br />
            DA <em>ESTÉTICA.</em>
          </SectionTitle>
          <p className="lead">
            Nem tudo o que muda
            <br />
            cabe em uma fotografia.
          </p>
          <p>
            Construir uma rotina, compreender o processo e encontrar constância
            também fazem parte de evoluir. Cada trajetória tem seu próprio
            ritmo.
          </p>
          {!results.length && (
            <div className="evolution-points">
              <span>
                <Check size={16} /> Mais atenção ao processo
              </span>
              <span>
                <Check size={16} /> Consistência na rotina
              </span>
              <span>
                <Check size={16} /> Objetivos com direção
              </span>
            </div>
          )}
          <a className="text-link" href="#objetivos">
            QUAL É O SEU PRÓXIMO PASSO? <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="results-visual reveal">
          {results.length ? (
            results.map((r) => (
              <article key={r.name}>
                <ImageComparison {...r} />
                <h3>{r.name}</h3>
                <p>{r.description}</p>
              </article>
            ))
          ) : (
            <>
              <Image
                src={media.evolution}
                alt="Tênis de treinamento e corda sobre o piso."
                fill
                sizes="(max-width:850px) 100vw, 50vw"
              />
              <span className="results-image-label">01 / CONSISTÊNCIA</span>
              <div className="evolution-caption">
                <span>
                  A SUA MELHOR
                  <br />
                  VERSÃO ESTÁ
                  <br />
                  <em>EM CONSTRUÇÃO.</em>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
function Testimonials() {
  const [index, setIndex] = useState(0);
  if (!testimonials.length)
    return (
      <section className="discipline-note" aria-label="O valor da constância">
        <div className="container">
          <span>MD / BUILT BY DISCIPLINE</span>
          <p>
            O QUE VOCÊ FAZ COM CONSTÂNCIA
            <br />
            <em>CONSTRÓI QUEM VOCÊ SE TORNA.</em>
          </p>
          <a href="#objetivos" aria-label="Descobrir meu próximo objetivo">
            <ArrowUpRight size={32} />
          </a>
        </div>
      </section>
    );
  return (
    <section className="section testimonials">
      <div className="container testimonial-layout">
        <div>
          <Eyebrow>HISTÓRIAS REAIS</Eyebrow>
          <SectionTitle>
            QUEM VIVE,
            <br />
            <em>CONTA.</em>
          </SectionTitle>
        </div>
        <div className="testimonial-space">
          <span className="quote-symbol">“</span>
          <blockquote>
            {testimonials[index].text}
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
              <ArrowRight style={{ transform: "rotate(180deg)" }} />
            </button>
            <span>
              {index + 1} / {testimonials.length}
            </span>
            <button
              aria-label="Próximo depoimento"
              onClick={() => setIndex((index + 1) % testimonials.length)}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
function FAQ() {
  return (
    <section className="section faq" id="duvidas">
      <div className="container faq-grid">
        <div>
          <Eyebrow>CLAREZA ANTES DE COMEÇAR</Eyebrow>
          <SectionTitle>
            BOAS PERGUNTAS.
            <br />
            <em>NOVOS COMEÇOS.</em>
          </SectionTitle>
          <p>
            Tire as primeiras dúvidas.
            <br />O próximo passo é uma conversa.
          </p>
          <a
            href={client.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            FALAR PELO INSTAGRAM <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a], i) => (
            <details key={q}>
              <summary>
                <span className="faq-number">0{i + 1}</span>
                <span>{q}</span>
                <Plus size={18} />
              </summary>
              <div className="faq-answer">
                <p>{a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
function FinalCTA({ contact }: { contact: () => void }) {
  return (
    <section id="contato" className="final-cta" data-scroll-scene>
      <Image
        src={media.cta}
        alt="Corredor de academia com iluminação vermelha."
        fill
        sizes="100vw"
      />
      <div className="cta-shade" />
      <div className="container">
        <div className="cta-top">
          <span>O SEU PRÓXIMO CAPÍTULO.</span>
          <span>COMEÇA COM VOCÊ.</span>
        </div>
        <Eyebrow>MENOS ADIAR. MAIS COMEÇAR.</Eyebrow>
        <h2>
          PRONTO PARA
          <br />
          <em>EVOLUIR?</em>
        </h2>
        <div className="cta-bottom">
          <p>
            Dê o primeiro passo e descubra como um acompanhamento personalizado
            pode ajudar na sua jornada.
          </p>
          <ContactButton onClick={contact}>
            QUERO INICIAR MEU ACOMPANHAMENTO
          </ContactButton>
        </div>
      </div>
    </section>
  );
}
function Footer({ privacy }: { privacy: () => void }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <a href="#inicio" title="MD Nation — voltar ao início">
            <Wordmark />
          </a>
          <p>MATHEUS DIAS. ESTRATÉGIA. DISCIPLINA. EVOLUÇÃO.</p>
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
            {whatsappUrl() && (
              <a
                href={whatsappUrl()!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Matheus Dias"
              >
                WhatsApp
              </a>
            )}
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
export default function LandingPage() {
  const [modal, setModal] = useState<"contact" | "privacy" | null>(null),
    [video, setVideo] = useState<string | null>(null),
    [message, setMessage] = useState(client.message),
    [copied, setCopied] = useState(false),
    [copyError, setCopyError] = useState(false);
  useCinematicMotion();
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
        <DisciplineTransition />
        <AboutTrainer />
        <Services contact={contact} />
        <Method contact={() => contact()} />
        <Results />
        <TrainingExperience />
        <CinematicFilm />
        <GoalsQuiz contact={contact} />
        <Testimonials />
        <Gallery openVideo={setVideo} />
        <FAQ />
        <FinalCTA contact={() => contact()} />
      </main>
      <Footer privacy={() => setModal("privacy")} />
      {whatsappUrl() && (
        <a
          className="floating-contact"
          aria-label="Vamos conversar com Matheus pelo WhatsApp"
          href={whatsappUrl()!}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={21} />
          <span>Vamos conversar</span>
          <ArrowUpRight size={16} />
        </a>
      )}
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
