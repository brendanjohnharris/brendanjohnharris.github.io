# Brendan Harris — Hugo source

This directory is a complete [Hugo](https://gohugo.io) site that renders the same
design you see in `../index.html` (the React prototype).

```
hugo/
├── hugo.toml              site config + nav menu
├── data/
│   ├── colors.yaml        synced from Fathom.jl/test/colors.yaml at build time
│   ├── identity.yaml      name, role, contacts
│   ├── publications.yaml  papers + preprints
│   ├── presentations.yaml talks + posters
│   └── software.yaml      packages
├── content/
│   ├── _index.md          landing
│   ├── publications.md    /publications/
│   ├── presentations.md   /presentations/
│   ├── software.md        /software/
│   └── cv.md              /cv/  (embeds PDF from CurriculumVitae submodule)
├── layouts/
│   ├── _default/baseof.html
│   ├── partials/{sidebar,head,footer}.html
│   ├── index.html
│   ├── publications/single.html
│   ├── presentations/single.html
│   ├── software/single.html
│   └── cv/single.html
├── assets/
│   └── css/
│       ├── tokens.css     Go template — pulls from data/colors.yaml
│       └── site.css       full stylesheet
├── static/
│   └── cv/                CurriculumVitae submodule output (main.pdf)
└── .github/workflows/build.yml
```

## Build

```sh
hugo serve         # local preview at http://localhost:1313
hugo --minify      # produce ./public for deploy
```

## Color sync

`data/colors.yaml` is committed for reproducible local builds, but on CI the
upstream copy from `Fathom.jl` is fetched first so the palette tracks the
latest source of truth:

```yaml
# .github/workflows/build.yml
- run: curl -fsSL https://raw.githubusercontent.com/brendanjohnharris/Fathom.jl/main/test/colors.yaml -o data/colors.yaml
- run: hugo --minify
```

The CSS variables in `assets/css/tokens.css` are generated from this YAML via
`resources.ExecuteAsTemplate`, so adding a new named color just means adding a
key in `colors.yaml` and a `var(--<name>)` reference in `site.css`.

## CV submodule

The `static/cv/` directory should be a git submodule pointing at the
`CurriculumVitae` repo, with `main.pdf` produced by its build. To wire up:

```sh
git submodule add https://github.com/brendanjohnharris/CurriculumVitae static/cv
```
