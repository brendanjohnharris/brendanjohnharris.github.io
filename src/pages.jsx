/* Page components for Brendan's site */
const useStateP = React.useState;

// Helper: bold the author's own name in author lists
function renderAuthors(s) {
  const me = "Brendan Harris";
  const parts = s.split(me);
  return parts.flatMap((p, i) => i < parts.length - 1 ? [p, <b key={i}>{me}</b>] : [p]);
}

/* ─── Landing ─────────────────────────────────────────── */
const Landing = ({ go }) => {
  const id = SITE.identity;
  const featured = SITE.publications.filter(p => p.featured).slice(0, 3);
  return (
    <div className="landing">
      <section className="hero">
        <div className="sub">Postdoctoral research · Complex Systems Group · Sydney</div>
        <h1>{id.name.split(" ")[0]} <em>{id.name.split(" ").slice(1).join(" ")}</em></h1>
        <p className="blurb">{id.blurb}</p>
      </section>

      <section className="interests">
        {id.interests.map((it, i) => (
          <div className="interest" key={i}>
            <h3>{it.h}</h3>
            <p>{it.b}</p>
          </div>
        ))}
      </section>

      <section className="featured">
        <div className="lbl">Selected work</div>
        {featured.map((p, i) => (
          <div className="row" key={i}>
            <div className="y">{p.year}</div>
            <div>
              <a className="t" href={`#/publications`} onClick={(e) => { e.preventDefault(); go("publications"); }}>{p.title}</a>
              <div className="meta">{p.venue}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

/* ─── Publications ────────────────────────────────────── */
const Publications = () => {
  // group year transitions for visual rhythm
  return (
    <div>
      <div className="page-head">
        <h1>Publications &amp; preprints</h1>
        <div className="meta">{SITE.publications.length} entries · ORCID {SITE.identity.orcid}</div>
      </div>
      <div className="pub-list">
        {SITE.publications.map((p, i) => (
          <article className="pub" key={i}>
            <div className="y">{p.year}</div>
            <div className="body">
              <h3 className="title"><a href="#">{p.title}</a></h3>
              <div className="authors">{renderAuthors(p.authors)}</div>
              <div className="venue">{p.venue}</div>
              <div className="tags">
                {p.tag === "preprint" && <span className="tag preprint">preprint</span>}
                {p.tag === "article" && <span className="tag">article</span>}
                {p.featured && <span className="tag featured">featured</span>}
                {p.code && <span className="tag code">code</span>}
              </div>
            </div>
            <div className="num">{String(SITE.publications.length - i).padStart(2, "0")}</div>
          </article>
        ))}
      </div>
    </div>
  );
};

/* ─── Presentations ──────────────────────────────────── */
const FakeSlide = ({ title, venue }) => (
  <div className="fake-slide">
    <div className="st">Slide 1 / 24</div>
    <div className="sh">{title}</div>
    <div className="sf">B. Harris · {venue}</div>
  </div>
);

const Presentations = () => {
  const [open, setOpen] = useStateP(null);
  return (
    <div>
      <div className="page-head">
        <h1>Presentations</h1>
        <div className="meta">{SITE.presentations.length} talks &amp; posters · click to embed</div>
      </div>
      <div className="talks">
        {SITE.presentations.map((t, i) => (
          <React.Fragment key={i}>
            <article
              className={`talk ${open === i ? "expanded" : ""}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="d">{t.date}</div>
              <div className="body">
                <h3 className="t">{t.title}</h3>
                <div className="v">
                  <span className="kind">{t.kind}</span>
                  {t.venue}
                </div>
                {t.note && <div className="note">{t.note}</div>}
              </div>
              <div className="open">{open === i ? "[ close ]" : `[ ${t.embed} ]`}</div>
            </article>
            {open === i && (
              <div className="embed-frame">
                <div className="stage">
                  <FakeSlide title={t.title} venue={t.venue} />
                </div>
                <div className="meta">
                  <span>{t.embed === "slidev" ? "slidev iframe — hosted url" : "pdf — embedded"}</span>
                  <a href="#" onClick={(e) => e.preventDefault()}>open in new tab ↗</a>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

/* ─── Software ───────────────────────────────────────── */
const Software = () => (
  <div>
    <div className="page-head">
      <h1>Software</h1>
      <div className="meta">{SITE.software.length} packages · primarily Julia</div>
    </div>
    <div className="soft-grid">
      {SITE.software.map((s, i) => (
        <a className="soft-card" href={s.url} target="_blank" rel="noopener noreferrer" key={i}>
          <div className="arrow">↗</div>
          <div className="glyph"><Glyph kind={s.glyph} /></div>
          <div className="name">{s.name}</div>
          <div className="blurb">{s.blurb}</div>
          <div className="foot">
            <span className="role">{s.role}</span>
            <span>{s.lang}</span>
          </div>
        </a>
      ))}
    </div>
  </div>
);

/* ─── CV ─────────────────────────────────────────────── */
const CV = () => (
  <div>
    <div className="page-head">
      <h1>Curriculum vitæ</h1>
      <div className="meta">last build: 2026 · LaTeX</div>
    </div>
    <div className="cv-wrap">
      <div className="cv-bar">
        <a href="uploads/main.pdf" target="_blank" rel="noopener noreferrer">↓ download pdf</a>
        <a href="#" onClick={(e) => e.preventDefault()}>print view</a>
        <span className="src">source: CurriculumVitae submodule · github/brendanjohnharris</span>
      </div>
      <div className="cv-frame">
        <iframe src="uploads/main.pdf#view=FitH&toolbar=0" title="CV" />
      </div>
    </div>
  </div>
);

window.Pages = { Landing, Publications, Presentations, Software, CV };
