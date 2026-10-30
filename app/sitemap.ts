import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE.updatedISO);
  return [
    { url: `${SITE.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/work/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/collaborate/`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/media-kit/`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}
