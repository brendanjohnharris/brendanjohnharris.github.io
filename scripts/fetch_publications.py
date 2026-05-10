#!/usr/bin/env python3
"""Fetch publications from ORCID and enrich with Crossref + OpenAlex.

Writes data/publications.yaml. Intended to run in CI.

Code links are pulled automatically from the CV bibliography
(CurriculumVitae/theBibliography.bib): any entry with a `url = {github.com/...}`
flows through to its DOI's `code` field.

Manual overrides live in data/publications_overrides.yaml, keyed by DOI:
  "10.1103/physrevx.14.031021":
    featured: true
    skip: false
    pdf: "https://..."
"""
from __future__ import annotations
import json
import os
import sys
import time
from pathlib import Path
from urllib.parse import quote

import requests
import yaml

ORCID = os.environ.get("ORCID_ID", "0000-0003-3412-4186")
CONTACT = os.environ.get("CONTACT_EMAIL", "brendan.harris@sydney.edu.au")
HEADERS = {"User-Agent": f"brendanjohnharris.github.io (mailto:{CONTACT})"}

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "publications.yaml"
OVERRIDES_FILE = ROOT / "data" / "publications_overrides.yaml"
BIB_FILE = ROOT / "CurriculumVitae" / "theBibliography.bib"


def parse_bib_code_urls(path: Path) -> dict[str, str]:
    """Returns {lowercase_doi: github_url} from the CV .bib file's `url` field."""
    if not path.exists():
        return {}
    import re
    text = path.read_text(errors="ignore")
    out: dict[str, str] = {}
    for entry in re.split(r"(?m)^@", text):
        if not entry.strip():
            continue
        doi_m = re.search(r"doi\s*=\s*\{([^}]+)\}", entry)
        url_m = re.search(r"(?<!eprint)url\s*=\s*\{([^}]+)\}", entry)
        if not (doi_m and url_m):
            continue
        url = url_m.group(1).strip()
        if "github.com" not in url.lower():
            continue
        doi = doi_m.group(1).strip().lower()
        out[doi] = url
    return out


def fetch_orcid_dois(orcid: str) -> list[str]:
    url = f"https://pub.orcid.org/v3.0/{orcid}/works"
    r = requests.get(url, headers={**HEADERS, "Accept": "application/json"}, timeout=30)
    r.raise_for_status()
    data = r.json()
    dois: list[str] = []
    seen: set[str] = set()
    for group in data.get("group", []):
        group_dois = [
            eid.get("external-id-value", "").lower().strip()
            for eid in group.get("external-ids", {}).get("external-id", [])
            if eid.get("external-id-type") == "doi"
        ]
        group_dois = [d for d in group_dois if d]
        if not group_dois:
            continue
        # Prefer the journal DOI over a preprint DOI when both are listed in a group.
        primary = next((d for d in group_dois if not d.startswith("10.1101/")), group_dois[0])
        if primary not in seen:
            seen.add(primary)
            dois.append(primary)
    return dois


def crossref_meta(doi: str) -> dict:
    url = f"https://api.crossref.org/works/{quote(doi, safe='/')}"
    try:
        r = requests.get(url, headers=HEADERS, timeout=30)
        r.raise_for_status()
        return r.json().get("message", {})
    except Exception as e:
        print(f"  crossref failed for {doi}: {e}", file=sys.stderr)
        return {}


def openalex_meta(doi: str) -> dict:
    url = f"https://api.openalex.org/works/doi:{doi}"
    try:
        r = requests.get(url, headers=HEADERS, timeout=30)
        r.raise_for_status()
        return r.json()
    except Exception as e:
        print(f"  openalex failed for {doi}: {e}", file=sys.stderr)
        return {}


def semantic_scholar_meta(doi: str) -> dict:
    """Returns {} if S2 has no record (some venues aren't indexed)."""
    url = f"https://api.semanticscholar.org/graph/v1/paper/DOI:{doi}"
    params = {"fields": "citationCount,influentialCitationCount"}
    try:
        r = requests.get(url, headers=HEADERS, params=params, timeout=30)
        if r.status_code == 404:
            return {}
        r.raise_for_status()
        if not r.text.strip():
            return {}
        return r.json()
    except Exception as e:
        print(f"  semantic-scholar failed for {doi}: {e}", file=sys.stderr)
        return {}




def format_authors(crossref: dict, openalex: dict) -> str:
    cr_authors = crossref.get("author") or []
    if cr_authors:
        parts = []
        for a in cr_authors:
            given = a.get("given", "").strip()
            family = a.get("family", "").strip()
            if given and family:
                parts.append(f"{given} {family}")
            elif family:
                parts.append(family)
        return ", ".join(parts)
    oa_authors = openalex.get("authorships") or []
    return ", ".join(a.get("author", {}).get("display_name", "") for a in oa_authors).strip(", ")


def format_venue(crossref: dict, openalex: dict) -> str:
    container = crossref.get("container-title") or []
    name = container[0] if container else ""
    volume = crossref.get("volume", "")
    pages = crossref.get("page", "")
    bits = [b for b in [name, f"vol. {volume}" if volume else "", f"pp. {pages}" if pages else ""] if b]
    if bits:
        return ", ".join(bits)
    src = openalex.get("primary_location", {}).get("source") or {}
    return src.get("display_name", "") or ""


def is_preprint(crossref: dict, openalex: dict) -> bool:
    if (crossref.get("type") or "").lower() == "posted-content":
        return True
    return (openalex.get("type") or "").lower() == "preprint"


def main() -> int:
    overrides: dict = {}
    if OVERRIDES_FILE.exists():
        overrides = yaml.safe_load(OVERRIDES_FILE.read_text()) or {}

    bib_code = parse_bib_code_urls(BIB_FILE)
    print(f"bib code links: {len(bib_code)} entries", file=sys.stderr)

    print(f"fetching ORCID works for {ORCID} ...", file=sys.stderr)
    dois = fetch_orcid_dois(ORCID)
    print(f"  {len(dois)} DOIs", file=sys.stderr)

    entries = []
    for doi in dois:
        ov = overrides.get(doi, {}) or {}
        if ov.get("skip"):
            print(f"  skip {doi}", file=sys.stderr)
            continue
        print(f"  enrich {doi}", file=sys.stderr)
        cr = crossref_meta(doi)
        time.sleep(0.2)
        oa = openalex_meta(doi)
        time.sleep(0.2)
        s2 = semantic_scholar_meta(doi)
        time.sleep(0.5)  # S2 public endpoint is rate-limited

        title_list = cr.get("title") or []
        title = (title_list[0] if title_list else oa.get("title") or doi).strip()

        issued = (cr.get("issued") or {}).get("date-parts") or [[None]]
        year = issued[0][0] if issued and issued[0] else oa.get("publication_year")

        entry = {
            "doi": doi,
            "title": title,
            "authors": format_authors(cr, oa),
            "venue": format_venue(cr, oa),
            "year": str(year) if year else "",
            "url": f"https://doi.org/{doi}",
            "tag": "preprint" if is_preprint(cr, oa) else "article",
            "citations": max(int(oa.get("cited_by_count") or 0), int(s2.get("citationCount") or 0)),
            "percentile": (oa.get("cited_by_percentile_year") or {}).get("min"),
            "featured": bool(ov.get("featured", False)),
        }
        if bib_code.get(doi):
            entry["code"] = bib_code[doi]
        if "pdf" in ov:
            entry["pdf"] = ov["pdf"]
        if "image" in ov:
            entry["image"] = ov["image"]
        entries.append(entry)

    entries.sort(key=lambda e: (e["year"] or "0000", e["title"]), reverse=True)

    OUT.write_text(yaml.safe_dump(entries, sort_keys=False, allow_unicode=True))
    print(f"wrote {len(entries)} entries to {OUT}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
