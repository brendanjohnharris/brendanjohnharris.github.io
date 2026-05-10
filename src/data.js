// Site content. Edit here.
window.SITE = {
  identity: {
    name: "Brendan Harris",
    role: "Postdoctoral Research Associate",
    affiliation: "Complex Systems Group, School of Physics, The University of Sydney",
    location: "Sydney, Australia",
    email: "brendan.harris@sydney.edu.au",
    orcid: "0000-0003-3412-4186",
    github: "brendanjohnharris",
    scholar: "Brendan Harris",
    bluesky: "@brendanjohnharris",
    blurb: "I study the dynamical mechanisms of computation and communication in the brain — especially in visual cortex — using new analytic tools, dynamical systems theory, large-scale data, and biophysical neural-circuit models.",
    interests: [
      { h: "Circuit- and systems-level neuroscience", b: "Spiking neural circuits; mean-field models; hierarchical processing; oscillations and traveling waves; visual system." },
      { h: "Statistical physics and neural dynamics", b: "Time-series analysis; stochastic processes; criticality; cross-scale dynamics; dimensionality reduction; open software." }
    ]
  },

  publications: [
    { year: "2026", status: "in preparation", title: "Anomalous dynamics in the working regime of the visual cortex",
      authors: "Brendan Harris and Pulin Gong", venue: "In preparation", tag: "preprint" },
    { year: "2025", status: "published", title: "Nested spatiotemporal theta–gamma waves organize hierarchical processing across the mouse visual cortex",
      authors: "Brendan Harris and Pulin Gong", venue: "Nature Communications, vol. 17", tag: "article", code: true, featured: true },
    { year: "2025", status: "published", title: "Canonical time-series features for characterizing biologically informative dynamical patterns in fMRI",
      authors: "Imran Alam, Brendan Harris, Patrick Cahill, Oliver Cliff, Marija Markicevic, Valerio Zerbi, and Ben D. Fulcher",
      venue: "Aperture Neuro, vol. 5", tag: "article", code: true },
    { year: "2024", status: "published", title: "Tracking the Distance to Criticality in Systems with Unknown Noise",
      authors: "Brendan Harris, Leonardo L. Gollo, and Ben D. Fulcher",
      venue: "Physical Review X, vol. 14, pp. 031021", tag: "article", code: true, featured: true },
    { year: "2024", status: "published", title: "Distributed and dynamical communication: a mechanism for flexible cortico-cortical interactions and its functional roles in visual attention",
      authors: "Shencong Ni, Brendan Harris, and Pulin Gong",
      venue: "Communications Biology, vol. 7, pp. 550", tag: "article" },
    { year: "2021", status: "published", title: "Approximate Modal Cut-Off Wavelengths and the V-Parameter for M-type Optical Fibers and Its Novel Applications",
      authors: "Deepak Jain, Mark A. George, Brendan Harris, and Simon Fleming",
      venue: "Journal of Lightwave Technology, vol. 39, pp. 4478–4488", tag: "article" }
  ],

  presentations: [
    { date: "Apr 2026", venue: "Maths in the Brain", kind: "Talk", title: "Anomalous dynamics in the working regime of the visual cortex", note: "Prize: Best ECR talk", embed: "pdf" },
    { date: "Jun 2025", venue: "OHBM 2025, Brisbane", kind: "Poster", title: "Nested spatiotemporal dynamics organize hierarchical processing in the mouse visual cortex", note: "#2072", embed: "pdf" },
    { date: "Jun 2025", venue: "EPC/APCV 2025, UNSW", kind: "Talk", title: "Spatiotemporal theta–gamma waves organize hierarchical processing in the mouse visual cortex", embed: "slidev" },
    { date: "May 2025", venue: "CNIR / IBS, Republic of Korea", kind: "Invited talk", title: "Nested spatiotemporal θ–γ waves organize hierarchical visual processing", embed: "slidev" },
    { date: "Mar 2025", venue: "COSYNE 2025, Montreal", kind: "Poster", title: "Tracking the distance to criticality across the mouse visual hierarchy", note: "#1–117", embed: "pdf" },
    { date: "Feb 2025", venue: "NeuroEng 2025, Melbourne", kind: "Talk", title: "Nested spatiotemporal theta–gamma waves organize hierarchical visual processing", embed: "slidev" },
    { date: "Oct 2023", venue: "MIP:Lab, Geneva", kind: "Invited talk", title: "Burst-based inter-areal neural communication", embed: "slidev" },
    { date: "Jul 2023", venue: "Cognitive Neuroscience Hub, Melbourne", kind: "Invited talk", title: "Burst-based inter-areal neural communication", embed: "slidev" },
    { date: "Jan 2023", venue: "C3-2023, Heron Island", kind: "Workshop talk", title: "Burst-based inter-areal neural communication", embed: "pdf" },
    { date: "Oct 2022", venue: "Yale Medical School", kind: "Invited talk", title: "Feature-based analysis of neural time series", embed: "slidev" },
    { date: "Jul 2022", venue: "CNS*2022, Melbourne", kind: "Poster", title: "Summarizing non-stationarity in spatio-temporal neural data", embed: "pdf" }
  ],

  software: [
    { name: "Fathom.jl", role: "Author", lang: "Julia",
      blurb: "A framework for parametric analysis of dynamical systems — sweeping, simulating, and characterizing trajectories of stochastic and deterministic models.",
      url: "https://github.com/brendanjohnharris/Fathom.jl",
      glyph: "fathom" },
    { name: "TimeseriesTools.jl", role: "Author", lang: "Julia",
      blurb: "Type system and utilities for working with time series of arbitrary dimensionality, units, and metadata in Julia.",
      url: "https://github.com/brendanjohnharris/TimeseriesTools.jl",
      glyph: "timeseries" },
    { name: "Catch22.jl", role: "Maintainer", lang: "Julia",
      blurb: "Julia port of the canonical 22 time-series features from the catch22 set, for fast feature-based analysis.",
      url: "https://github.com/brendanjohnharris/Catch22.jl",
      glyph: "catch22" },
    { name: "AllenNeuropixelsBase.jl", role: "Author", lang: "Julia",
      blurb: "A Julia interface to the Allen Institute's Neuropixels Visual Coding dataset — load LFP, spikes, and stimulus tables in idiomatic Julia.",
      url: "https://github.com/brendanjohnharris/AllenNeuropixelsBase.jl",
      glyph: "allen" },
    { name: "DimensionalData.jl extensions", role: "Contributor", lang: "Julia",
      blurb: "Contributions and helpers around DimensionalData for spatiotemporal neural data analysis.",
      url: "https://github.com/brendanjohnharris",
      glyph: "dim" },
    { name: "criticalslowingdown", role: "Author", lang: "MATLAB / Julia",
      blurb: "Reference code for tracking the distance to criticality in systems with unknown noise (Phys. Rev. X 14, 031021).",
      url: "https://github.com/brendanjohnharris/criticalslowingdown",
      glyph: "critical" }
  ],

  education: [
    { y: "2022", t: "Physics PhD (Submitted)", d: "Cross-scale dynamics in the working regime of the visual cortex", inst: "The University of Sydney" },
    { y: "2021", t: "Physics Honours, Class I & University Medal", d: "Inferring parametric variation across non-stationary time series", inst: "The University of Sydney" },
    { y: "2018–2020", t: "B.Sc. / B.Adv.Studies (Dalyell Scholar)", d: "Majored in Physics and Neuroscience", inst: "The University of Sydney" }
  ]
};
