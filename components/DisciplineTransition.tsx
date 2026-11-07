/** A scroll-driven editorial bridge. It stays readable without animation JavaScript. */
export default function DisciplineTransition() {
  return (
    <section
      className="discipline-transition"
      data-scroll-scene="discipline"
      aria-labelledby="discipline-title"
    >
      <div className="discipline-inner">
        <p className="discipline-eyebrow">DISCIPLINA EM MOVIMENTO</p>
        <h2 className="discipline-title" id="discipline-title">
          <span className="discipline-outline">DISCIPLINA</span>
          <span className="discipline-fill" aria-hidden="true">
            DISCIPLINA
          </span>
        </h2>
        <div className="discipline-line" aria-hidden="true">
          <span />
        </div>
        <p className="discipline-caption">
          A EVOLUÇÃO É CONSTRUÍDA TODOS OS DIAS.
        </p>
      </div>
    </section>
  );
}
