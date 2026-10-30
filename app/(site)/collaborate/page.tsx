import type { Metadata } from "next";
import Image from "next/image";
import Packages from "@/components/Packages";
import LeadForm from "@/components/LeadForm";
import Faq from "@/components/Faq";
import { CtaBand, PageHeader } from "@/components/Sections";
import { Reveal } from "@/components/motion";
import { ClockIcon, MailIcon, PinIcon, PlatformIcon } from "@/components/Icons";
import VerifiedBadge from "@/components/VerifiedBadge";
import { JsonLd, breadcrumb, pageUrl } from "@/components/JsonLd";
import { SITE, PLAT_BG } from "@/lib/site";

const title = "Rates, Packages & Brand Inquiries";
const description =
  "Collaboration packages and starting rates for Arif Hassan (Viral Vlog Rounderz): dedicated YouTube videos, viral Instagram Reels and the 360° Omnichannel Blitz. Send a brief by WhatsApp or email.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/collaborate/" },
  // Page-level openGraph replaces the root one, so the share image is repeated here.
  openGraph: { title, description, url: "/collaborate/", images: ["/og.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SITE.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Viral Vlog Rounderz collaboration packages",
  url: pageUrl("/collaborate/"),
  itemListElement: SITE.packages.map((p) => ({
    "@type": "Offer",
    name: p.name,
    description: p.features.join("; "),
    priceSpecification: { "@type": "PriceSpecification", minPrice: p.priceValue, priceCurrency: "INR" },
    seller: { "@id": pageUrl("/#person") },
  })),
};

export default function CollaboratePage() {
  return (
    <>
      <PageHeader
        crumb="Rates & Contact"
        title={<>Clear packages. <span className="grad-text">Direct with the creator.</span></>}
        intro="These are standard deliverables with starting rates. Custom bundles, multi-video series and barter deals for local businesses are available on request."
      />

      <section className="section" style={{ paddingTop: 60 }} aria-labelledby="pkg-title">
        <div className="container">
          <h2 id="pkg-title" className="sr-only">Collaboration packages</h2>
          <Packages />
          <Reveal className="pkg-foot">Starting rates are indicative. The final quote depends on scope, shoot location and timeline.</Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">How it works</span>
            <h2 id="process-title">From brief to <span className="grad-text">live in four steps.</span></h2>
          </Reveal>
          <div className="process">
            {[
              ["Brief", "Tell me about your product, offer and goal."],
              ["Concept", "Within 48 hours you get a script angle and shoot plan."],
              ["Shoot & approve", "I shoot on location and you review the cut before it goes live."],
              ["Go live & report", "Reports at 7 and 30 days with native analytics."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08} style={{ height: "100%" }}>
                <div className="step"><span>{i + 1}</span><b>{t}</b><small>{d}</small></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="inquiry" aria-labelledby="inquiry-title">
        <div className="container contact-grid">
          <Reveal className="contact-copy">
            <span className="eyebrow">Brand inquiries</span>
            <h2 id="inquiry-title">Let&apos;s put your brand <span className="grad-text">in front of buyers.</span></h2>
            <p>Fill in the brief and send it on WhatsApp or by email. It reaches Arif directly, with no agency in between.</p>
            <div className="contact-person">
              <Image src="/images/arif-hassan-avatar.webp" alt="Arif Hassan" width={54} height={54} />
              <div>
                <b>{SITE.creator.name} <VerifiedBadge size={16} /></b>
                <small>Creator &amp; founder, {SITE.creator.brand}</small>
              </div>
            </div>
            <ul className="contact-points">
              <li><MailIcon /><a href={`mailto:${SITE.creator.email}`}>{SITE.creator.email}</a></li>
              <li><PinIcon /><span>{SITE.creator.location} · Available Pan-India</span></li>
              <li><ClockIcon /><span>Replies within 24 hours, Mon–Sat</span></li>
            </ul>
            <div className="socials">
              {SITE.platforms.map((p) => (
                <a key={p.id} href={p.url} target="_blank" rel="noopener me" aria-label={p.name} style={{ ["--hc" as string]: PLAT_BG[p.id] }}>
                  <PlatformIcon id={p.id} />
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}><LeadForm /></Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">FAQ</span>
            <h2 id="faq-title">Questions brands <span className="grad-text">usually ask.</span></h2>
          </Reveal>
          <Faq />
        </div>
      </section>

      <CtaBand
        title={<>Need it for <span className="grad-text">your team?</span></>}
        text="Download the 2-page media kit with stats, audience, case studies and rates, ready to share internally."
        primary={{ href: "/media-kit/", label: "Download Media Kit" }}
        secondary={{ href: "/work/", label: "See the work" }}
      />
      <JsonLd data={breadcrumb("Rates & Contact", "/collaborate/")} />
      <JsonLd data={faqSchema} />
      <JsonLd data={offerSchema} />
    </>
  );
}
