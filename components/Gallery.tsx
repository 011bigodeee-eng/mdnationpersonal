"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Instagram, Play, Plus } from "lucide-react";
import { media, client, videos } from "@/lib/content";
import { Eyebrow, SectionTitle } from "./Primitives";
import Modal from "./Modal";

export default function Gallery({
  openVideo,
}: {
  openVideo: (src: string) => void;
}) {
  const [selected, setSelected] = useState<
    (typeof media.gallery)[number] | null
  >(null);
  return (
    <section
      id="galeria"
      className="section gallery gallery--personal"
      data-scroll-scene
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>MATHEUS DIAS / DENTRO E FORA DA ACADEMIA</Eyebrow>
            <SectionTitle>
              TREINO.
              <br />
              <em>DISCIPLINA.</em>
              <br />
              EVOLUÇÃO.
            </SectionTitle>
          </div>
          <div className="heading-aside">
            <span className="gallery-edition">VOLUME 02 / PRESENÇA REAL</span>
            <p>
              A mesma disciplina.
              <br />
              Diferentes formas de viver o movimento.
            </p>
            <span className="tiny-label">
              FOTOGRAFIAS REAIS DE MATHEUS DIAS
            </span>
          </div>
        </div>
        <div className="gallery-grid">
          {media.gallery.map((item, i) => (
            <button
              key={item.src}
              className={`gallery-item gallery-item-${i + 1} gallery-item--${item.kind} reveal`}
              onClick={() => setSelected(item)}
              title={`Ampliar fotografia: ${item.title}`}
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                quality={item.kind === "real" ? 85 : 75}
                sizes="(max-width:680px) 90vw, (max-width:1024px) 50vw, 55vw"
              />
              {item.kind === "real" && (
                <span className="gallery-photo-kind">FOTOGRAFIA REAL</span>
              )}
              <span className="gallery-photo-caption">
                <small>{item.context}</small>
                {item.title}
              </span>
              <span className="gallery-expand">
                <Plus size={18} />
              </span>
            </button>
          ))}
          {videos.map((v) => (
            <button
              key={v.src}
              className="gallery-item"
              onClick={() => openVideo(v.src)}
            >
              <Image src={v.poster} alt="" fill sizes="50vw" />
              <span>{v.title}</span>
              <Play />
            </button>
          ))}
        </div>
        <div className="gallery-footer">
          <span>
            MATHEUS NA ACADEMIA E NO JIU-JÍTSU. O CENÁRIO DE EQUIPAMENTOS É
            ILUSTRATIVO.
          </span>
          <a
            className="text-link"
            href={client.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={17} />
            @THEUSDIAS_TREINADOR <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      {selected && (
        <Modal
          title={
            selected.kind === "real"
              ? "Matheus Dias — fotografias"
              : "Galeria ilustrativa"
          }
          onClose={() => setSelected(null)}
        >
          <div className="lightbox-image">
            <Image
              src={selected.src}
              alt={selected.caption}
              fill
              quality={85}
              sizes="90vw"
            />
          </div>
          <p className="modal-caption">
            {selected.kind === "real"
              ? selected.caption
              : "Cenário de treinamento. Não representa o local de atendimento."}
          </p>
        </Modal>
      )}
    </section>
  );
}
