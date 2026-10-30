"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { SITE, PLAT_BG, PLAT_COLOR, compact } from "@/lib/site";
import { ArrowIcon, DownloadIcon, ExtIcon, PlatformIcon, ShieldIcon, PlayIcon } from "./Icons";
import { Counter, Magnetic, SplitWords } from "./motion";
import VerifiedBadge from "./VerifiedBadge";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const art = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 90]);
  const portalY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 40]);
  const chipsY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -50]);

  // Pointer tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });

  const fadeUp = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: EASE, delay: d } };
  const pop = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, scale: 0.85, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, transition: { duration: 0.8, ease: EASE, delay: d } };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <motion.div className="pill" {...fadeUp(0)}>
            <span className="dot-live" /> Taking brand collaborations for Q4 2026 &amp; 2027
          </motion.div>
          <h1 id="hero-title">
            <motion.span className="h1-kicker" {...fadeUp(0.05)}>
              <b>{SITE.creator.name}</b> <VerifiedBadge size={18} /> · {SITE.creator.brand}
            </motion.span>{" "}
            {/* Explicit spaces between block lines so the heading's text reads correctly to crawlers. */}
            <SplitWords className="line" text="Real markets." delay={0.1} />{" "}
            <SplitWords className="line" text="Real prices." delay={0.25} />{" "}
            {/* Gradient goes on each word: background-clip:text doesn't reach transformed children. */}
            <SplitWords className="line" wordClassName="grad-text" text="Real buyers." delay={0.4} />
          </h1>
          <motion.p className="lead" {...fadeUp(0.55)}>
            I&apos;m <strong>Arif Hassan</strong>, a creator from <strong>Patna, Bihar</strong>. I take{" "}
            <strong>375K+ followers</strong> inside the shops, showrooms and markets they actually buy from, from
            refurbished laptops to used cars. My videos have <strong>14M+ views</strong> so far.
          </motion.p>
          <motion.div className="hero-ctas" {...fadeUp(0.65)}>
            <Magnetic>
              <Link href="/collaborate/#inquiry" className="btn btn-primary">Work With Me <ArrowIcon /></Link>
            </Magnetic>
            <Magnetic>
              <Link href="/media-kit/" className="btn btn-ghost"><DownloadIcon /> Download Media Kit</Link>
            </Magnetic>
          </motion.div>
          <motion.div className="verified-row" {...fadeUp(0.75)}>
            {SITE.platforms.map((p) => (
              <a key={p.id} className="v-badge" href={p.url} target="_blank" rel="noopener me" aria-label={`${p.name}: ${compact(p.value)} ${p.metricLabel.toLowerCase()}`}>
                <span className="p-ico" style={{ background: PLAT_BG[p.id] }}><PlatformIcon id={p.id} /></span>
                <b>{compact(p.value)}</b> {p.name} <ExtIcon className="i ext" />
              </a>
            ))}
            <span className="v-badge v-stamp"><ShieldIcon /> Updated {SITE.updated}</span>
          </motion.div>
        </div>

        <div
          className="hero-art"
          ref={art}
          onPointerMove={(e) => {
            if (reduce || e.pointerType !== "mouse" || !art.current) return;
            const r = art.current.getBoundingClientRect();
            px.set((e.clientX - r.left) / r.width - 0.5);
            py.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onPointerLeave={() => { px.set(0); py.set(0); }}
        >
          <motion.div style={{ rotateX: rx, rotateY: ry, position: "absolute", inset: 0 }}>
            <motion.div className="portal" style={{ y: portalY }} {...pop(0.2)}>
              <div className="orbit"><i /></div>
            </motion.div>
            <motion.div
              className="hero-photo"
              style={{ y: photoY }}
              {...(reduce ? {} : { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.1, ease: EASE, delay: 0.3 } })}
            >
              <Image
                src="/images/arif-hassan-cutout.webp"
                alt="Arif Hassan, creator of Viral Vlog Rounderz"
                width={491}
                height={1000}
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 226px, 316px"
              />
            </motion.div>

            <motion.div style={{ y: chipsY, position: "absolute", inset: 0, zIndex: 3 }}>
              <motion.div className="chip chip-name" {...pop(0.8)}>
                <Image src="/images/arif-hassan-avatar.webp" alt="" width={40} height={40} />
                <div>
                  <b>Arif Hassan <VerifiedBadge size={16} /></b>
                  <small>@ViralVlogRounderz</small>
                </div>
              </motion.div>

              <motion.div className="chip chip-reach in" {...pop(0.95)}>
                <span className="lbl">Combined reach</span>
                <span className="num"><Counter to={SITE.combined.followers} format="compact" /><em>+</em></span>
                <div className="meter">
                  {SITE.platforms.map((p) => (
                    <span key={p.id} style={{ ["--w" as string]: `${((p.value / SITE.combined.followers) * 100).toFixed(1)}%`, ["--c" as string]: PLAT_COLOR[p.id] }} />
                  ))}
                </div>
              </motion.div>

              <motion.div className="chip chip-views" {...pop(1.1)}>
                <span className="chip-ico"><PlayIcon width={13} height={13} fill="currentColor" /></span>
                <div><b>1.4M views</b><small>on one local-store collab</small></div>
              </motion.div>

              <motion.div className="chip chip-sold" {...pop(1.25)}>
                <span className="chip-ico g">↑</span>
                <div><b>120+ laptops sold</b><small>in 10 days for one partner</small></div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
