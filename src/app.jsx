/* Top-level app: sidebar + hash router */
const useStateA = React.useState;
const useEffectA = React.useEffect;

const PAGES = [
  { id: "home", label: "Index", num: "00", el: "Landing" },
  { id: "publications", label: "Publications", num: "01", el: "Publications" },
  { id: "presentations", label: "Presentations", num: "02", el: "Presentations" },
  { id: "software", label: "Software", num: "03", el: "Software" },
  { id: "cv", label: "Curriculum vitæ", num: "04", el: "CV" }
];

function parseHash() {
  const h = (location.hash || "").replace(/^#\/?/, "").trim();
  return h || "home";
}

const App = () => {
  const [route, setRoute] = useStateA(parseHash());

  useEffectA(() => {
    const onHash = () => { setRoute(parseHash()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // apply colors at runtime from window.FATHOM_COLORS
  useEffectA(() => {
    const c = window.FATHOM_COLORS || {};
    const r = document.documentElement;
    if (c.paper) r.style.setProperty("--paper", c.paper);
    if (c.vellum) r.style.setProperty("--vellum", c.vellum);
    if (c.ink) r.style.setProperty("--ink", c.ink);
    if (c.graphite) r.style.setProperty("--graphite", c.graphite);
    if (c.ash) r.style.setProperty("--ash", c.ash);
    if (c.rule) r.style.setProperty("--rule", c.rule);
    if (c.cobalt) r.style.setProperty("--accent", c.cobalt);
    if (c.oxide) r.style.setProperty("--accent-2", c.oxide);
  }, []);

  const go = (id) => { location.hash = id === "home" ? "" : `/${id}`; };

  const current = PAGES.find(p => p.id === route) || PAGES[0];
  const Page = window.Pages[current.el];
  const id = SITE.identity;

  return (
    <div className="site">
      <aside className="sidebar">
        <div>
          <h2 className="mark"><a href="#" onClick={(e) => { e.preventDefault(); go("home"); }} style={{ border: "none", color: "inherit" }}>Brendan <span className="last">Harris</span></a></h2>
          <div className="role">Postdoctoral Research Associate<br />The University of Sydney</div>
        </div>

        <nav className="nav">
          {PAGES.map(p => (
            <a
              key={p.id}
              href={`#/${p.id === "home" ? "" : p.id}`}
              className={route === p.id ? "active" : ""}
              onClick={(e) => { e.preventDefault(); go(p.id); }}
            >
              <span className="num">{p.num}</span>
              <span>{p.label}</span>
            </a>
          ))}
        </nav>

        <div className="contacts">
          <div className="row"><span className="k">email</span><a href={`mailto:${id.email}`}>{id.email}</a></div>
          <div className="row"><span className="k">github</span><a href={`https://github.com/${id.github}`} target="_blank" rel="noreferrer">@{id.github}</a></div>
          <div className="row"><span className="k">scholar</span><a href="#">{id.scholar}</a></div>
          <div className="row"><span className="k">orcid</span><a href={`https://orcid.org/${id.orcid}`} target="_blank" rel="noreferrer">{id.orcid}</a></div>
          <div className="row"><span className="k">bsky</span><a href="#">{id.bluesky}</a></div>
        </div>
      </aside>

      <main data-screen-label={current.num + " " + current.label}>
        <Page go={go} />
        <footer className="footnote">
          <span>© {new Date().getFullYear()} Brendan Harris</span>
          <span>Set in Source Serif &amp; JetBrains Mono · palette from Fathom.jl/colors.yaml</span>
        </footer>
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
