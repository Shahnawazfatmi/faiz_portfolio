import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Audience from "@/components/Audience";
import { CaseGrid } from "@/components/CaseStudies";
import { About, CtaBand, Marquee, ProofStrip } from "@/components/Sections";
import { Reveal } from "@/components/motion";
import { ArrowIcon } from "@/components/Icons";
import { JsonLd, pageUrl } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const profilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: pageUrl("/"),
  name: `${SITE.creator.name} — Official Website`,
  dateModified: SITE.updatedISO,
  mainEntity: { "@id": pageUrl("/#person") },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ProofStrip />
      <Stats />
      <Audience />
      <About />

      <section className="section" aria-labelledby="results-title">
        <div className="container">
          <Reveal className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", maxWidth: "none" }}>
            <div style={{ maxWidth: 680 }}>
              <span className="eyebrow">03 · Proven results</span>
              <h2 id="results-title">Content that sends <span className="grad-text">people into the store.</span></h2>
              <p>Three local businesses, three measurable outcomes. These are real collaborations with view counts you can check on YouTube.</p>
            </div>
            <Link href="/work/" className="btn btn-ghost">See all work <ArrowIcon /></Link>
          </Reveal>
          <CaseGrid />
        </div>
      </section>

      <CtaBand
        title={<>Ready to reach <span className="grad-text">North India&apos;s buyers?</span></>}
        text="Look through the packages and starting rates, or try the reach simulator to plan your campaign."
        primary={{ href: "/collaborate/", label: "See rates & packages" }}
        secondary={{ href: "/work/#simulator", label: "Try the reach simulator" }}
      />
      <JsonLd data={profilePage} />
    </>
  );
}
