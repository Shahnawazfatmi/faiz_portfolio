import { SITE } from "@/lib/site";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

const u = (path = "/") => new URL(path, SITE.url).toString();

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": u("/#person"),
  name: SITE.creator.name,
  alternateName: SITE.creator.brand,
  jobTitle: "Content Creator",
  description: SITE.creator.bio,
  image: u("/images/arif-hassan-on-location.webp"),
  url: u("/"),
  email: `mailto:${SITE.creator.email}`,
  homeLocation: {
    "@type": "Place",
    address: { "@type": "PostalAddress", addressLocality: SITE.creator.city, addressRegion: SITE.creator.region, addressCountry: "IN" },
  },
  knowsAbout: SITE.niches.map((n) => n.title),
  sameAs: SITE.platforms.map((p) => p.url).filter((url) => !/facebook\.com\/?$/.test(url)),
  interactionStatistic: SITE.platforms.map((p) => ({
    "@type": "InteractionCounter",
    interactionType: "https://schema.org/FollowAction",
    userInteractionCount: p.value,
    description: `${p.name} ${p.metricLabel.toLowerCase()}`,
  })),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": u("/#website"),
  name: `${SITE.creator.name} · ${SITE.creator.brand}`,
  url: u("/"),
  inLanguage: "en-IN",
  publisher: { "@id": u("/#person") },
};

export const breadcrumb = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: u("/") },
    { "@type": "ListItem", position: 2, name, item: u(path) },
  ],
});

export const pageUrl = u;
