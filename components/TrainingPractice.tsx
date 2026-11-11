import Image from "next/image";
import { Eyebrow } from "./Primitives";
import "@/app/training-practice.css";

export default function TrainingPractice() {
  return (
    <section id="registros-da-jornada" className="section training-practice" aria-labelledby="practice-title">
      <div className="container">
        <div className="practice-heading reveal">
          <div>
            <Eyebrow>VIVÊNCIA QUE INSPIRA</Eyebrow>
            <h2 id="practice-title" className="display">Registros <em>da Jornada</em></h2>
          </div>
          <p>Cada pessoa tem um ponto de partida. Cada objetivo exige uma estratégia.</p>
        </div>
        <div className="journey-result" aria-labelledby="jackson-title">
          <figure className="practice-photo jackson-photo reveal">
            <div className="practice-image-frame">
              <Image src="/images/practice/trajetoria.webp" width={1170} height={1170} alt="Jackson em dois registros pessoais reunidos na montagem original fornecida pelo cliente." quality={85} sizes="(max-width: 700px) 92vw, 55vw" />
            </div>
            <figcaption>JACKSON / REGISTROS DA JORNADA</figcaption>
          </figure>
          <div className="jackson-copy reveal">
            <Eyebrow>EVOLUÇÃO COM ESTRATÉGIA</Eyebrow>
            <h3 id="jackson-title" className="display">Um dos nossos <em>resultados</em></h3>
            <p>Conheça um dos resultados que fazem parte da nossa jornada.</p>
            <span className="jackson-name">Jackson</span>
          </div>
        </div>
        <figure className="practice-photo journey-complement reveal">
          <div className="practice-image-frame">
            <Image src="/images/practice/tatame.webp" width={1170} height={780} alt="Praticante de quimono branco sentado no tatame, sorrindo. Foto com crédito Assis Fotografia." quality={85} sizes="(max-width: 700px) 92vw, 40vw" />
          </div>
          <figcaption>ALÉM DO EXERCÍCIO</figcaption>
        </figure>
      </div>
    </section>
  );
}
