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
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <section id="galeria" className="section gallery" data-scroll-scene>
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>O UNIVERSO MD NATION</Eyebrow>
            <SectionTitle>
              TREINO.
              <br />
              <em>DISCIPLINA.</em>
              <br />
              EVOLUÇÃO.
            </SectionTitle>
          </div>
          <div className="heading-aside">
            <span className="gallery-edition">VOLUME 01 / THE DETAILS</span>
            <p>
              A força mora nos detalhes.
              <br />A evolução, no que se repete.
            </p>
            <span className="tiny-label">
              EDITORIAL CONCEITUAL · IMAGENS GERADAS POR IA
            </span>
          </div>
        </div>
        <div className="gallery-grid">
          {media.gallery.map(({ src, title, caption }, i) => (
            <button
              key={src}
              className={`gallery-item gallery-item-${i + 1} reveal`}
              onClick={() => setSelected(src)}
              title={`Ampliar imagem ilustrativa: ${title}`}
            >
              <Image
                src={src}
                alt={caption}
                fill
                sizes="(max-width:680px) 90vw, (max-width:1024px) 50vw, 55vw"
              />
              <span>
                <small>0{i + 1} / MD NATION</small>
                {title}
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
            CENÁRIOS ILUSTRATIVOS. O CONTEÚDO REAL ESTÁ NO PERFIL DO MATHEUS.
          </span>
          <a
            className="text-link"
            href={client.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={17} /> @THEUSDIAS_TREINADOR{" "}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      {selected && (
        <Modal title="Galeria ilustrativa" onClose={() => setSelected(null)}>
          <div className="lightbox-image">
            <Image
              src={selected}
              alt="Fotografia conceitual de equipamentos de treinamento, gerada por IA."
              fill
              sizes="90vw"
            />
          </div>
          <p className="modal-caption">
            Composição editorial gerada por IA. Não representa o local de
            atendimento.
          </p>
        </Modal>
      )}
    </section>
  );
}
