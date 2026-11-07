"use client";
import Image from "next/image";
import { ArrowDown, Play } from "lucide-react";
import { client, media } from "@/lib/content";
import { ContactButton } from "./Primitives";

/** Source order matches the mobile reading order, before CSS or animation loads. */
export default function Hero({ contact }: { contact: () => void }) {
  return (
    <section
      className={`hero ${client.trainerPhoto ? "hero--real" : ""}`}
      id="inicio"
      data-scroll-scene
    >
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="container hero-content">
        <div className="hero-kicker">
          <span className="live-dot" />
          MATHEUS DIAS
          <span className="kicker-divider" />
          PERSONAL TRAINER & COACH
        </div>
        <div className="hero-title-wrap">
          <span className="hero-edition">01 — A DECISÃO</span>
          <h1>
            <span>SUA EVOLUÇÃO</span>
            <span>COMEÇA COM</span>
            <em>UMA DECISÃO.</em>
          </h1>
        </div>
        <p>
          Treinamento com estratégia, acompanhamento individualizado e foco na
          sua evolução.
        </p>
        <div className="hero-actions">
          <ContactButton onClick={contact}>QUERO COMEÇAR AGORA</ContactButton>
          <a className="hero-method-link" href="#metodo">
            <span className="hero-play">
              <Play size={12} />
            </span>
            <span>
              <span className="hero-method-full">CONHECER O </span>MÉTODO
            </span>
          </a>
        </div>
        <div className="hero-bottom-note">
          <span>DISCIPLINA NO PRESENTE.</span>
          <span>EVOLUÇÃO NO CAMINHO.</span>
        </div>
      </div>
      <div className="hero-visual">
        <Image
          className="hero-image"
          src={client.trainerPhoto ?? media.hero}
          alt={
            client.trainerPhoto
              ? "Matheus Dias na academia, de braços cruzados, com a camiseta original Musculação Faixa Preta."
              : "Academia com iluminação dramática. Imagem conceitual."
          }
          fill
          priority
          fetchPriority="high"
          sizes="(max-width:680px) 100vw, (max-width:850px) 440px, 56vw"
          quality={85}
        />
        <div className="hero-shade" aria-hidden="true" />
        <span className="hero-photo-caption">
          {client.trainerPhoto
            ? "MATHEUS DIAS / MD NATION"
            : "IMAGEM CONCEITUAL · IA"}
        </span>
        <div className="hero-visual-index" aria-hidden="true">
          <span>MD</span>
          <small>
            FOCO NO PROCESSO.
            <br />
            FORÇA NA CONSTÂNCIA.
          </small>
        </div>
      </div>
      <div className="hero-bottom">
        <a className="scroll-cue" href="#sobre">
          <span className="scroll-line" aria-hidden="true" />
          <span>CONTINUE A JORNADA</span>
          <ArrowDown size={15} />
        </a>
        <span>
          BUILT BY DISCIPLINE <i aria-hidden="true">+</i>
        </span>
        <span className="hero-page-number">001 / MD NATION</span>
      </div>
    </section>
  );
}
