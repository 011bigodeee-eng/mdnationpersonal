import Image from "next/image";
import { Eyebrow } from "./Primitives";
import "@/app/training-practice.css";

const photographs = [
  { name: "acao", width: 1170, height: 1755, label: "01 / EM MOVIMENTO", alt: "Prática de jiu-jítsu: participante de quimono branco em pé e participante de quimono azul no chão. Foto com crédito Assis Fotografia." },
  { name: "foco", width: 1170, height: 1755, label: "02 / FOCO NOS DETALHES", alt: "Retrato fechado de praticante de jiu-jítsu com quimono branco. Foto com crédito Assis Fotografia." },
  { name: "trajetoria", width: 1170, height: 1170, label: "03 / REGISTROS DA JORNADA", alt: "Montagem original com dois registros pessoais, um em evento e outro em frente ao espelho." },
  { name: "tatame", width: 1170, height: 780, label: "04 / ALÉM DO EXERCÍCIO", alt: "Praticante de quimono branco sentado no tatame, sorrindo. Foto com crédito Assis Fotografia." },
];

export default function TrainingPractice() {
  return (
    <section id="treinamento-na-pratica" className="section training-practice" aria-labelledby="practice-title">
      <div className="container">
        <div className="practice-heading reveal">
          <div>
            <Eyebrow>VIVÊNCIA QUE INSPIRA</Eyebrow>
            <h2 id="practice-title" className="display">Treinamento <em>na Prática</em></h2>
          </div>
          <p>Cada pessoa tem um ponto de partida. Cada objetivo exige uma estratégia.</p>
        </div>
        <div className="practice-editorial">
          {photographs.map((photo, index) => (
            <figure key={photo.name} className={`practice-photo practice-photo--${photo.name} reveal`}>
              <div className="practice-image-frame">
                <Image src={`/images/practice/${photo.name}.webp`} width={photo.width} height={photo.height} alt={photo.alt} quality={85} sizes={index === 0 ? "(max-width: 700px) 92vw, 45vw" : photo.name === "tatame" ? "(max-width: 700px) 92vw, 45vw" : "(max-width: 700px) 92vw, 25vw"} />
              </div>
              <figcaption>{photo.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
