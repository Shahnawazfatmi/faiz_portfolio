"use client";

import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { SITE, NICHE_TINT, full, youtube, type CaseStudy, type NicheId } from "@/lib/site";
import { EyeIcon, NicheIcon, PlayIcon } from "./Icons";
import { Reveal } from "./motion";

type Filter = "all" | NicheId;
const EASE = [0.22, 1, 0.36, 1] as const;

function CaseCard({ cs }: { cs: CaseStudy }) {
  const [t1, t2] = NICHE_TINT[cs.niche];
  const niche = SITE.niches.find((n) => n.id === cs.niche)!;
  return (
    <a
      className="card glass spot case"
      href={cs.url || youtube.url}
      target="_blank"
      rel="noopener"
      style={{ ["--t1" as string]: t1, ["--t2" as string]: t2, height: "100%" }}
      aria-label={`${cs.client}: ${full(cs.views)} views, ${cs.result} ${cs.resultLabel}`}
    >
      <div className="case-thumb">
        <span className="play" aria-hidden="true"><PlayIcon /></span>
        <span className="views"><EyeIcon />{full(cs.views)} views</span>
        <span className="tag">{niche.short}</span>
      </div>
      <div className="case-body">
        <h3>{cs.client}</h3>
        <div className="case-loc">{cs.location} · {cs.platform}</div>
        <p>{cs.summary}</p>
        <div className="case-result"><b>{cs.result}</b><span>{cs.resultLabel}</span></div>
      </div>
    </a>
  );
}

/** Static grid of all case studies (used on the home page). */
export function CaseGrid() {
  return (
    <div className="cases">
      {SITE.caseStudies.map((cs, i) => (
        <Reveal key={cs.client} delay={i * 0.08}><CaseCard cs={cs} /></Reveal>
      ))}
    </div>
  );
}

/** Niche explorer + animated, filterable case studies (work page). */
export default function CaseExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = SITE.caseStudies.filter((c) => filter === "all" || c.niche === filter);
  const empty = filter !== "all" && !list.length ? SITE.niches.find((n) => n.id === filter)! : null;

  return (
    <>
      <div className="niche-grid">
        {SITE.niches.map((n, i) => {
          const count = SITE.caseStudies.filter((c) => c.niche === n.id).length;
          return (
            <Reveal key={n.id} delay={i * 0.06} style={{ height: "100%" }}>
              <button
                className={`niche spot${filter === n.id ? " active" : ""}`}
                aria-pressed={filter === n.id}
                onClick={() => setFilter(filter === n.id ? "all" : n.id)}
              >
                <span className="count">{count ? `${count} case stud${count > 1 ? "ies" : "y"}` : "Open slot"}</span>
                <span className="card-ico"><NicheIcon name={n.icon} /></span>
                <h3>{n.title}</h3>
                <p>{n.desc}</p>
              </button>
            </Reveal>
          );
        })}
      </div>

      <LayoutGroup>
        <div className="filters" role="tablist" aria-label="Filter case studies">
          {[{ id: "all" as Filter, short: "All work" }, ...SITE.niches].map((n) => (
            <button key={n.id} className="filter" role="tab" aria-selected={filter === n.id} onClick={() => setFilter(n.id as Filter)}>
              {filter === n.id && <motion.span layoutId="filter-fill" className="fill" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span>{n.short}</span>
            </button>
          ))}
        </div>

        <motion.div className="cases" layout aria-live="polite">
          <AnimatePresence mode="popLayout">
            {list.map((cs, i) => (
              <motion.div
                key={cs.client}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE, delay: i * 0.06 } }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
              >
                <CaseCard cs={cs} />
              </motion.div>
            ))}
            {empty && (
              <motion.div
                key={`empty-${empty.id}`}
                className="case-empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <b>Your brand could be the first case study here.</b>
                {empty.title} is one of my core content areas, and this slot is open.{" "}
                <Link href="/collaborate/#inquiry">Pitch a collaboration →</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </>
  );
}
