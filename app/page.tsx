"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

const accents = [
  { name: "Signal lime", value: "#c9ff4a" },
  { name: "Hot coral", value: "#ff6b5f" },
  { name: "Sky blue", value: "#6bcbff" },
];

const buildStages = [
  "FILE EDITS",
  "GITHUB PUSHES",
  "LIVE PREVIEWS",
  "PRODUCTION DEPLOYS",
  "VISIBLE RESULTS",
];

const files = [
  {
    path: "app/page.tsx",
    role: "Content + interactions",
    status: "Modified",
  },
  {
    path: "app/globals.css",
    role: "Visual system",
    status: "Modified",
  },
  {
    path: "app/layout.tsx",
    role: "Metadata + sharing",
    status: "Modified",
  },
  {
    path: "public/og.jpg",
    role: "Social preview",
    status: "Added",
  },
];

const initialChanges = [
  {
    id: "002",
    title: "Build loop put in motion",
    note: "A new hero banner carries the workflow from edit to live result.",
    tag: "design",
  },
  {
    id: "001",
    title: "Demo site assembled",
    note: "New interface, responsive states, and interaction tests.",
    tag: "feature",
  },
  {
    id: "000",
    title: "Repository connected",
    note: "Empty test repository prepared for its first site.",
    tag: "setup",
  },
];

export default function Home() {
  const [accent, setAccent] = useState(accents[0].value);
  const [runCount, setRunCount] = useState(3);
  const [lastResult, setLastResult] = useState("All checks passing");

  const runPatch = () => {
    setRunCount((count) => count + 1);
    setLastResult("Fresh patch accepted");
  };

  return (
    <main
      className="site-shell"
      style={{ "--signal": accent } as CSSProperties}
    >
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Patchbay home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>Patchbay</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#playground">Playground</a>
          <a href="#files">Files</a>
          <a href="#changelog">Changelog</a>
        </nav>
        <a
          className="repo-link"
          href="https://github.com/jatkins-IA/test"
          target="_blank"
          rel="noreferrer"
        >
          <span className="status-dot" />
          jatkins-IA/test <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section
        className="hero-banner"
        data-testid="hero-banner"
        aria-label="Live build loop: file edits, GitHub pushes, live previews, production deploys, and visible results"
      >
        <div className="hero-banner-status">
          <span className="status-dot" aria-hidden="true" />
          <span>Live build loop</span>
        </div>
        <div className="hero-banner-viewport" aria-hidden="true">
          <div className="hero-banner-track">
            {[0, 1].map((copy) => (
              <div className="hero-banner-set" key={copy}>
                {buildStages.map((stage) => (
                  <span className="hero-banner-item" key={`${copy}-${stage}`}>
                    <span>{stage}</span>
                    <b>✦</b>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hero section-frame" id="top">
        <div
          className="hero-preview-stamp"
          data-testid="hero-preview-stamp"
          aria-label="Now testing, patch 003"
        >
          <span>Now testing</span>
          <strong>PATCH / 003</strong>
        </div>
        <div className="hero-copy">
          <div className="eyebrow">
            <span>GitHub-backed demo</span>
            <span className="eyebrow-line" />
            <span>Build 003</span>
          </div>
          <h1>
            Make changes.
            <br />
            <span>See them land.</span>
          </h1>
          <p className="hero-deck">
            A live test surface for editing files, pushing updates, and watching
            a site evolve—one clean patch at a time.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#playground">
              Test the playground <span aria-hidden="true">→</span>
            </a>
            <a className="button button-ghost" href="#changelog">
              View the change log
            </a>
          </div>
          <div className="hero-meta" aria-label="Project status">
            <div>
              <strong>04</strong>
              <span>Files touched</span>
            </div>
            <div>
              <strong>01</strong>
              <span>Live route</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Ready to remix</span>
            </div>
          </div>
        </div>

        <div className="patchboard-wrap" aria-label="Deployment signal panel">
          <div className="patchboard">
            <div className="panel-topline">
              <span>Live signal</span>
              <span className="live-label">
                <span className="status-dot" /> synced
              </span>
            </div>
            <div className="signal-route" aria-hidden="true">
              <span className="port port-a" />
              <span className="cable cable-a" />
              <span className="port port-b" />
              <span className="cable cable-b" />
              <span className="port port-c" />
            </div>
            <div className="signal-readout">
              <span className="readout-kicker">Last update</span>
              <strong>Just now</strong>
              <p>main → production</p>
            </div>
            <div className="meter" aria-hidden="true">
              {Array.from({ length: 16 }, (_, index) => (
                <span
                  className={index < 12 ? "meter-on" : ""}
                  key={index}
                />
              ))}
            </div>
            <div className="panel-stamp">PATCH / 003</div>
          </div>
          <div className="orbit-label orbit-label-top">file edit</div>
          <div className="orbit-label orbit-label-bottom">site update</div>
        </div>
      </section>

      <section className="playground section-frame" id="playground">
        <div className="section-heading">
          <div>
            <span className="section-number">01</span>
            <p className="kicker">Interaction playground</p>
          </div>
          <h2>Change a signal.<br />Run a patch.</h2>
          <p>
            These controls are intentionally simple: they give every future
            edit a visible place to show up.
          </p>
        </div>

        <div className="playground-grid">
          <div className="control-console">
            <div className="console-header">
              <span>Accent signal</span>
              <span>Choose one</span>
            </div>
            <div className="accent-controls" role="group" aria-label="Accent color">
              {accents.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => setAccent(option.value)}
                  aria-pressed={accent === option.value}
                  data-testid={`accent-${option.name.toLowerCase().replace(" ", "-")}`}
                >
                  <span
                    className="swatch"
                    style={{ backgroundColor: option.value }}
                  />
                  <span>{option.name}</span>
                  <span className="radio" aria-hidden="true" />
                </button>
              ))}
            </div>
            <button
              className="button button-primary run-button"
              type="button"
              onClick={runPatch}
              data-testid="run-patch"
            >
              Run patch #{String(runCount + 1).padStart(2, "0")}
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="result-card" aria-live="polite">
            <div className="result-windowbar">
              <span />
              <span />
              <span />
              <b>preview.local</b>
            </div>
            <div className="result-canvas">
              <span className="result-pill">Demo component</span>
              <h3>Your edit has a pulse.</h3>
              <p>
                Swap the signal, run the patch, and this surface responds
                instantly.
              </p>
              <div className="result-status">
                <span className="result-icon">✓</span>
                <span>
                  <strong>{lastResult}</strong>
                  <small>Run {String(runCount).padStart(2, "0")} · UI response verified</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="files-section section-frame" id="files">
        <div className="section-heading compact">
          <div>
            <span className="section-number">02</span>
            <p className="kicker">File surface</p>
          </div>
          <h2>Small files.<br />Clear purpose.</h2>
          <p>
            The first version keeps the structure lean, so the next round of
            tests stays easy to understand.
          </p>
        </div>

        <div className="file-grid">
          {files.map((file, index) => (
            <article className="file-card" key={file.path}>
              <div className="file-index">0{index + 1}</div>
              <div className="file-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <code>{file.path}</code>
              <p>{file.role}</p>
              <span className={`file-status ${file.status.toLowerCase()}`}>
                {file.status}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="changelog section-frame" id="changelog">
        <div className="section-heading compact">
          <div>
            <span className="section-number">03</span>
            <p className="kicker">Change log</p>
          </div>
          <h2>A visible trail<br />of every move.</h2>
          <p>
            Future updates can add entries here, making each GitHub test easy
            to spot on the live site.
          </p>
        </div>

        <div className="change-list">
          {initialChanges.map((change) => (
            <article className="change-row" key={change.id}>
              <span className="change-id">#{change.id}</span>
              <div>
                <h3>{change.title}</h3>
                <p>{change.note}</p>
              </div>
              <span className="change-tag">{change.tag}</span>
              <span className="change-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="next-patch section-frame">
        <div>
          <p className="kicker">Ready for the next test?</p>
          <h2>Pick a file.<br />Make a move.</h2>
        </div>
        <p>
          Change the headline, add a section, swap the palette, or wire up a
          new interaction. This demo is built to be changed.
        </p>
        <a
          className="button button-dark"
          href="https://github.com/jatkins-IA/test"
          target="_blank"
          rel="noreferrer"
        >
          Open the repository <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="footer section-frame">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>Patchbay</span>
        </a>
        <p>Built as a live test surface for Codex + Sites.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
