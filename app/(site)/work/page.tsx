import type { Metadata } from "next";
import CaseExplorer from "@/components/CaseStudies";
import Simulator from "@/components/Simulator";
import { CtaBand, PageHeader } from "@/components/Sections";
import { Counter, Reveal } from "@/components/motion";
import { JsonLd, breadcrumb, pageUrl } from "@/components/JsonLd";
import { SITE, full } from "@/lib/site";

const title = "Work & Brand Results — Case Studies";
const description =
  "Brand collaborations by Arif Hassan (Viral Vlog Rounderz): 1.4M views for Pets and Care, 120+ laptops sold for Patna Central Laptop Hub and 35+ test drives for Royal Wheels. Plan your campaign with the reach simulator.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/" },
  // Page-level openGraph replaces the root one, so the share image is repeated here.
  openGraph: { title, description, url: "/work/", images: ["/og.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

const caseList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Brand collaboration case studies by Arif Hassan",
  itemListElement: SITE.caseStudies.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: `${c.client} × Viral Vlog Rounderz`,
      description: `${c.summary} Result: ${c.result} ${c.resultLabel}. ${full(c.views)} views on ${c.platform}.`,
      creator: { "@id": pageUrl("/#person") },
      locationCreated: c.location,
      interactionStatistic: { "@type": "InteractionCounter", interactionType: "https://schema.org/WatchAction", userInteractionCount: c.views },
    },
  })),
};

export default function WorkPage() {
  const totalViews = SITE.caseStudies.reduce((a, c) => a + c.views, 0);
  return (
    <>
      <PageHeader
        crumb="Work & Results"
        title={<>Real collaborations. <span className="grad-text">Measurable results.</span></>}
        intro="These local businesses partnered with Viral Vlog Rounderz, and each one turned views into footfall, sales or test drives. Choose a category to filter the work, then estimate your own campaign reach."
      >
        <div className="head-stats">
          <div><b><Counter to={totalViews} format="compact" suffix="+" /></b><span>views across featured collabs</span></div>
          <div><b>4</b><span>content verticals</span></div>
          <div><b>3</b><span>platforms per campaign</span></div>
        </div>
      </PageHeader>

      <section className="section" style={{ paddingTop: 70 }} aria-labelledby="niches-title">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">01 · Niche explorer</span>
            <h2 id="niches-title">Four verticals. <span className="grad-text">One trusted voice.</span></h2>
            <p>Choose a vertical to filter the case studies below.</p>
          </Reveal>
          <CaseExplorer />
        </div>
      </section>

      <section className="section" aria-labelledby="approach-title">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">02 · The approach</span>
            <h2 id="approach-title">Why the videos <span className="grad-text">convert.</span></h2>
          </Reveal>
          <div className="approach">
            {[
              ["01", "Price on screen", "Viewers see the real price, the condition and the shop location, so they arrive ready to buy instead of just browsing."],
              ["02", "Live, on-ground proof", "Inspections, test rides and walkthroughs are filmed in the store itself. There's no studio and no script-reading."],
              ["03", "A local audience that acts", "82% of viewers are 18–34 and most are in Bihar, UP and Delhi NCR. They're within reach of the stores they watch."],
            ].map(([n, t, d], i) => (
              <Reveal key={n} as="article" className="card glass spot" delay={i * 0.08}>
                <span className="num">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="simulator" aria-labelledby="sim-title">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">03 · Campaign reach simulator</span>
            <h2 id="sim-title">Build your campaign. <span className="grad-text">See the reach.</span></h2>
            <p>Choose deliverables to see a conservative view estimate based on past uploads. You can then send the plan straight to Arif.</p>
          </Reveal>
          <Simulator />
        </div>
      </section>

      <CtaBand
        title={<>Want results like these <span className="grad-text">for your brand?</span></>}
        text="Send a short brief and get a concept and shoot plan back."
        primary={{ href: "/collaborate/#inquiry", label: "Start a collaboration" }}
        secondary={{ href: "/media-kit/", label: "Download Media Kit", download: true }}
      />
      <JsonLd data={breadcrumb("Work & Results", "/work/")} />
      <JsonLd data={caseList} />
    </>
  );
}
