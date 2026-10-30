"use client";

import { useRouter } from "next/navigation";
import { animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SITE, PLAT_COLOR, compact, type PlatformId } from "@/lib/site";
import { ArrowIcon } from "./Icons";
import { Reveal } from "./motion";

const GROUPS: PlatformId[] = ["youtube", "instagram", "facebook"];
const maxMid = SITE.deliverables.reduce((a, d) => a + (d.low + d.high) / 2, 0);

export default function Simulator() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [picked, setPicked] = useState<Set<string>>(
    () => new Set(SITE.deliverables.filter((d) => "checked" in d && d.checked).map((d) => d.id))
  );

  const { chosen, low, high, mid, plats, followers } = useMemo(() => {
    const chosen = SITE.deliverables.filter((d) => picked.has(d.id));
    const low = chosen.reduce((a, d) => a + d.low, 0);
    const high = chosen.reduce((a, d) => a + d.high, 0);
    const plats = new Set(chosen.map((d) => d.platform));
    const followers = SITE.platforms.filter((p) => plats.has(p.id)).reduce((a, p) => a + p.value, 0);
    return { chosen, low, high, mid: Math.round((low + high) / 2), plats, followers };
  }, [picked]);

  // Tween the headline number
  const out = useRef<HTMLSpanElement>(null);
  const shown = useRef(mid);
  const [initialText] = useState(() => compact(mid));
  useEffect(() => {
    if (!out.current) return;
    if (reduce) {
      out.current.textContent = compact(mid);
      shown.current = mid;
      return;
    }
    const c = animate(shown.current, mid, {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        shown.current = v;
        if (out.current) out.current.textContent = compact(v);
      },
    });
    return () => c.stop();
  }, [mid, reduce]);

  const toggle = (id: string) =>
    setPicked((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const request = () => {
    if (!chosen.length) return;
    router.push(`/collaborate/?plan=${chosen.map((d) => d.id).join(",")}#inquiry`);
  };

  return (
    <Reveal className="sim glass">
      <div className="sim-list">
        {GROUPS.map((g) => (
          <div key={g} style={{ display: "contents" }}>
            <div className="sim-group"><i style={{ background: PLAT_COLOR[g] }} />{SITE.platforms.find((p) => p.id === g)!.name}</div>
            {SITE.deliverables.filter((d) => d.platform === g).map((d) => (
              <label key={d.id} className={`opt${picked.has(d.id) ? " on" : ""}`}>
                <input type="checkbox" checked={picked.has(d.id)} onChange={() => toggle(d.id)} />
                <span className="box"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
                <span className="opt-label">{d.label}</span>
                <span className="opt-range">{compact(d.low)}–{compact(d.high)} views</span>
              </label>
            ))}
          </div>
        ))}
      </div>
      <aside className="sim-out" aria-live="polite">
        <div className="sim-label">Estimated campaign views</div>
        {/* React renders the first value only; the tween owns the text afterwards. */}
        <div className="sim-big"><span ref={out}>{initialText}</span></div>
        <div className="sim-range">Range <b>{compact(low)}</b> – <b>{compact(high)}</b></div>
        <div className="sim-meter">
          <motion.span animate={{ width: `${(mid / maxMid) * 100}%` }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
        </div>
        <div className="sim-kpis">
          <div><b>{chosen.length}</b><small>Deliverables</small></div>
          <div><b>{plats.size}</b><small>Platforms</small></div>
          <div><b>{compact(followers)}</b><small>Followers covered</small></div>
        </div>
        <button className="btn btn-primary btn-block" onClick={request} disabled={!chosen.length} style={{ opacity: chosen.length ? 1 : 0.5 }}>
          Request this plan <ArrowIcon />
        </button>
        <p className="sim-disclaimer">
          These estimates come from historical averages and are not a guarantee. Results depend on the product, the offer and when the video goes live.
        </p>
      </aside>
    </Reveal>
  );
}
