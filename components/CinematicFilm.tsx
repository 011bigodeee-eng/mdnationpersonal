"use client";
import Image from "next/image";
import { useState } from "react";
import { Play, VolumeX } from "lucide-react";
import { media } from "@/lib/content";

export default function CinematicFilm() {
  const [playing, setPlaying] = useState(false);
  return (
    <section
      className="cinematic-film"
      data-scroll-scene
      aria-label="Manifesto MD Nation: a evolução não acontece por acaso"
    >
      <div className="film-frame">
        <Image
          src={media.film}
          alt="Detalhe da textura de uma barra de treinamento sob luz vermelha. Composição ilustrativa."
          fill
          sizes="100vw"
        />
        {playing && media.featuredVideo && (
          <video
            className="film-video"
            src={media.featuredVideo.src}
            poster={media.film}
            controls
            playsInline
            autoPlay
            muted
            preload="metadata"
          >
            <track
              kind="captions"
              src={media.featuredVideo.captions ?? undefined}
              srcLang="pt-BR"
              label="Português"
            />
          </video>
        )}
        {!playing && (
          <>
            <div className="film-overlay" />
            <div className="film-top">
              <span>MD NATION / BUILT BY DISCIPLINE</span>
              <span>MANIFESTO · 01</span>
            </div>
            <div className="film-copy">
              <span className="eyebrow">O QUE MOVE VOCÊ?</span>
              <h2 id="film-title">
                A EVOLUÇÃO
                <br />
                NÃO ACONTECE
                <br />
                <em>POR ACASO.</em>
              </h2>
            </div>
            <div className="film-bottom">
              <p>
                É no que você repete.
                <br />É no que você constrói.
              </p>
              {media.featuredVideo && (
                <button className="film-play" onClick={() => setPlaying(true)}>
                  <Play size={17} /> ASSISTIR AO FILME <VolumeX size={16} />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
