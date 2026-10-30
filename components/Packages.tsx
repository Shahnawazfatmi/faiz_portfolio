"use client";

import { SITE } from "@/lib/site";
import { ArrowIcon, CheckIcon } from "./Icons";
import { Reveal } from "./motion";

export const SELECT_PACKAGE = "vvr:select-package";

export default function Packages() {
  const choose = (id: string) => {
    window.dispatchEvent(new CustomEvent(SELECT_PACKAGE, { detail: id }));
    document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="packages">
      {SITE.packages.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.08} style={{ height: "100%" }}>
          <article className={`card glass spot pkg${p.featured ? " featured" : ""}`}>
            {p.featured && <span className="pkg-badge">Best value</span>}
            <h3>{p.name}</h3>
            <p className="pkg-tag">{p.tagline}</p>
            <div className="pkg-price">{p.price}</div>
            <div className="pkg-note">{p.priceNote}</div>
            <ul>{p.features.map((f) => <li key={f}><CheckIcon /><span>{f}</span></li>)}</ul>
            <button className={`btn btn-block ${p.featured ? "btn-primary" : "btn-ghost"}`} onClick={() => choose(p.id)}>
              Choose package <ArrowIcon />
            </button>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
