import Link from "next/link";
import { SITE, PLAT_BG } from "@/lib/site";
import { PlatformIcon, MailIcon, PinIcon } from "./Icons";
import VerifiedBadge from "./VerifiedBadge";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="logo">
            <span className="logo-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg></span>
            <span className="logo-text">Viral Vlog <b>Rounderz</b></span>
          </Link>
          <p className="muted">
            The official website of {SITE.creator.name} <VerifiedBadge size={15} />. He is a content creator from {SITE.creator.city},{" "}
            {SITE.creator.region}, covering budget tech, pre-owned vehicles, wholesale markets and pet care.
          </p>
          <div className="socials">
            {SITE.platforms.map((p) => (
              <a key={p.id} href={p.url} target="_blank" rel="noopener me" aria-label={`${p.name}: ${p.handle}`} style={{ ["--hc" as string]: PLAT_BG[p.id] }}>
                <PlatformIcon id={p.id} />
              </a>
            ))}
          </div>
        </div>
        <nav className="footer-col" aria-label="Site">
          <b>Explore</b>
          <Link href="/">Home</Link>
          <Link href="/work/">Work &amp; Results</Link>
          <Link href="/work/#simulator">Reach Simulator</Link>
          <Link href="/collaborate/">Rates &amp; Packages</Link>
          <Link href="/media-kit/">Media Kit (PDF)</Link>
        </nav>
        <div className="footer-col">
          <b>Contact</b>
          <a href={`mailto:${SITE.creator.email}`}><MailIcon /> {SITE.creator.email}</a>
          <span><PinIcon /> {SITE.creator.location}</span>
          <Link href="/collaborate/#inquiry" className="btn btn-ghost btn-sm" style={{ marginTop: 8, width: "fit-content" }}>Send a brief</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {SITE.creator.name} · {SITE.creator.brand}. All rights reserved.</span>
        <span>Stats last updated {SITE.updated}</span>
      </div>
    </footer>
  );
}
