import Image from "next/image";
import Link from "next/link";
import { SITE, compact, full } from "@/lib/site";
import { ArrowIcon, DownloadIcon, PinIcon } from "./Icons";
import { Counter, Magnetic, Reveal } from "./motion";
import VerifiedBadge from "./VerifiedBadge";

export function Marquee() {
  const items = ["Refurbished Laptops", "Used Cars & Bikes", "Wholesale Markets", "Pet Bazaars", "Smartphones", "DSLR Cameras", "Street Food", "Textile Hubs", "Patna · Delhi · Kolkata"];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}

export function ProofStrip() {
  return (
    <Reveal className="proof container">
      <div className="proof-item"><b><Counter to={1406877} format="compact" /></b><span>views on the top brand collab</span></div>
      <div className="proof-item"><b><Counter to={800} suffix="+" /></b><span>store visits driven for Pets and Care</span></div>
      <div className="proof-item"><b><Counter to={35} suffix="+" /></b><span>test drives booked in one weekend</span></div>
      <div className="proof-item"><b><Counter to={8} /></b><span>years publishing on YouTube</span></div>
    </Reveal>
  );
}

export function About() {
  const yt = SITE.platforms[0];
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about">
        <Reveal className="about-photo" y={40}>
          <div className="glow" aria-hidden="true" />
          <div className="frame">
            <Image
              src="/images/arif-hassan-on-location.webp"
              alt="Arif Hassan on location at a store in Patna, Bihar"
              width={720}
              height={1215}
              sizes="(max-width: 1000px) 440px, 520px"
              loading="lazy"
            />
          </div>
          <div className="caption">
            <div>
              <b>{SITE.creator.name} <VerifiedBadge size={18} /></b>
              <small><PinIcon className="i" style={{ width: 13, height: 13, verticalAlign: -2 }} /> On location · Patna, Bihar</small>
            </div>
          </div>
        </Reveal>
        <Reveal className="about-copy" delay={0.1}>
          <span className="eyebrow">About the creator</span>
          <h2 id="about-title">The creator who takes you <span className="grad-text">inside the market.</span></h2>
          <p>{SITE.creator.bio}</p>
          <p style={{ marginTop: 14 }}>
            Brands work with Arif because his viewers trust his honesty: he checks the condition, asks the price and shows the product working on camera.
          </p>
          <ul className="timeline">
            <li><em>Jul 2018</em><b>Launched {yt.handle}</b><span>Started filming Patna&apos;s markets and second-hand shops.</span></li>
            <li><em>{full(yt.extras[1].value)}+ videos</em><b>A consistent publishing record</b><span>Tech, auto, wholesale and pet-market vlogs across {SITE.platforms.length} platforms.</span></li>
            <li><em>{compact(1406877)} views</em><b>Biggest brand collab: Pets and Care</b><span>The video drove 800+ customer visits and inquiries across Bihar.</span></li>
            <li><em>{SITE.updated}</em><b>{compact(SITE.combined.followers)}+ combined followers</b><span>{compact(SITE.combined.views)}+ lifetime views, with 82% of the audience aged 18–34.</span></li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function PageHeader({ crumb, title, intro, children }: { crumb: string; title: React.ReactNode; intro: string; children?: React.ReactNode }) {
  return (
    <section className="page-head">
      <div className="container">
        <Reveal>
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">{crumb}</span></nav>
          <h1>{title}</h1>
          <p>{intro}</p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBand({ title, text, primary, secondary }: {
  title: React.ReactNode;
  text: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string; download?: boolean };
}) {
  return (
    <div className="container">
      <Reveal className="cta-band">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="actions">
          <Magnetic><Link href={primary.href} className="btn btn-primary">{primary.label} <ArrowIcon /></Link></Magnetic>
          {secondary && (
            <Magnetic>
              <Link href={secondary.href} className="btn btn-ghost">{secondary.download && <DownloadIcon />}{secondary.label}</Link>
            </Magnetic>
          )}
        </div>
      </Reveal>
    </div>
  );
}
