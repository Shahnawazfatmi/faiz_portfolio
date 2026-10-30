/* ==========================================================================
   SITE DATA — single source of truth for every page and the media kit.
   Update numbers, prices and links here, then run `npm run build`.
   ========================================================================== */

export type PlatformId = "youtube" | "instagram" | "facebook";
export type NicheId = "tech" | "auto" | "markets" | "pets";

export const SITE = {
  // TODO: replace with the real domain before deploying (used for canonical URLs, sitemap & social cards).
  url: "https://www.viralvlogrounderz.com",
  updated: "October 2026",
  updatedISO: "2026-10-30",

  creator: {
    name: "Arif Hassan",
    firstName: "Arif",
    age: 24,
    brand: "Viral Vlog Rounderz",
    location: "Patna, Bihar, India",
    city: "Patna",
    region: "Bihar",
    availability: "Available for Pan-India shoots",
    email: "arifh8912@gmail.com",
    // WhatsApp number in international format, digits only (e.g. "919876543210").
    whatsapp: "",
    bio:
      "Arif Hassan is a Patna-based creator who has been filming India's street markets, second-hand gadget shops, " +
      "used-car lots and pet bazaars since 2018. Every video shows real prices, real shops and real inspections, " +
      "which is why his audience shows up at the store after they watch.",
  },

  combined: { followers: 375400, views: 14000000 },

  platforms: [
    {
      id: "youtube" as PlatformId,
      name: "YouTube",
      handle: "@ViralVlogRounderz",
      url: "https://www.youtube.com/@ViralVlogRounderz",
      metricLabel: "Subscribers",
      value: 134000,
      extras: [
        { label: "Lifetime views", value: 13961262 },
        { label: "Videos published", value: 929, suffix: "+" },
        { label: "Creating since", text: "Jul 2018" },
      ],
    },
    {
      id: "instagram" as PlatformId,
      name: "Instagram",
      handle: "@viral_vlog_rounderz_official",
      url: "https://www.instagram.com/viral_vlog_rounderz_official/",
      metricLabel: "Followers",
      value: 133000,
      extras: [
        { label: "Posts", value: 638 },
        { label: "Format", text: "Reels · BTS · Teasers" },
      ],
    },
    {
      id: "facebook" as PlatformId,
      name: "Facebook",
      handle: "Viral Vlog Rounderz",
      // TODO: replace with the exact Facebook page URL.
      url: "https://www.facebook.com",
      metricLabel: "Page likes",
      value: 108400,
      extras: [
        { label: "Category", text: "Video Creator" },
        { label: "Format", text: "Vlogs · Market tours" },
      ],
    },
  ],

  youtubeChannelId: "UC3Utq3yK3IxEWfOieaz96pg",

  audience: {
    source: "Creator's YouTube Studio & Instagram Insights",
    age: [
      { label: "18–34 years", value: 82 },
      { label: "All other ages", value: 18 },
    ],
    gender: { male: 82, female: 18 },
    geography: [
      { label: "Bihar", value: 46 },
      { label: "Uttar Pradesh", value: 24 },
      { label: "Delhi NCR", value: 14 },
      { label: "Rest of India", value: 16 },
    ],
    devices: [
      { label: "Mobile", value: 92 },
      { label: "Desktop, TV & tablet", value: 8 },
    ],
  },

  niches: [
    { id: "tech" as NicheId, title: "Budget Tech & Refurbished Gadgets", short: "Tech", icon: "laptop",
      desc: "Second-hand MacBooks, ThinkPads, smartphones and DSLRs, with honest price checks." },
    { id: "auto" as NicheId, title: "Pre-Owned Automotive", short: "Auto", icon: "car",
      desc: "Used cars and bikes with live inspections, test rides and on-camera negotiation." },
    { id: "markets" as NicheId, title: "Wholesale & Street Markets", short: "Markets", icon: "store",
      desc: "Flea markets, wholesale textile and discount retail across Patna, Delhi and Kolkata." },
    { id: "pets" as NicheId, title: "Pet Care & Lifestyle", short: "Pets & Lifestyle", icon: "paw",
      desc: "Pet markets for dogs, cats and birds, plus local food reviews and daily vlogs." },
  ],

  caseStudies: [
    {
      niche: "pets" as NicheId,
      client: "Pets and Care",
      location: "Anisabad, Patna",
      platform: "YouTube",
      views: 1406877,
      result: "800+",
      resultLabel: "customer visits & inquiries across Bihar",
      summary:
        "A full walkthrough of the store, covering breeds, pricing and care advice, so viewers knew what to expect before they visited.",
      url: "", // paste the video link to make the card open the video
    },
    {
      niche: "tech" as NicheId,
      client: "Patna Central Laptop Hub",
      location: "Patna",
      platform: "YouTube",
      views: 480000,
      result: "120+",
      resultLabel: "refurbished laptops sold within 10 days",
      summary:
        "A refurbished laptop showcase with on-screen prices and a live condition check on every model, so viewers came in already knowing what to buy.",
      url: "",
    },
    {
      niche: "auto" as NicheId,
      client: "Royal Wheels Used Cars",
      location: "Patna",
      platform: "YouTube",
      views: 360000,
      result: "35+",
      resultLabel: "qualified test drives in a single weekend",
      summary:
        "A lot tour with live inspections, ownership history and price talk. Viewers walked in ready for a test drive.",
      url: "",
    },
  ],

  // Indicative starting rates. Confirm before publishing.
  packages: [
    {
      id: "yt",
      name: "Dedicated YouTube Video",
      tagline: "Your brand is the whole story",
      price: "₹20,000",
      priceValue: 20000,
      priceNote: "starting rate",
      featured: false,
      features: [
        "8–15 min dedicated vlog shot on location",
        "Script, shoot & edit by Arif's team",
        "Pinned comment + description link",
        "Community post on launch day",
        "Performance report at 7 & 30 days",
      ],
    },
    {
      id: "blitz",
      name: "360° Omnichannel Blitz",
      tagline: "Every platform, one launch week",
      price: "₹40,000",
      priceValue: 40000,
      priceNote: "starting rate",
      featured: true,
      features: [
        "Dedicated YouTube video",
        "2 Instagram Reels (collab post)",
        "Facebook video cross-post",
        "Story set with link sticker",
        "YouTube Short cut-down",
        "Consolidated reach report",
      ],
    },
    {
      id: "reel",
      name: "Viral Reel",
      tagline: "Fast, punchy, built to share",
      price: "₹10,000",
      priceValue: 10000,
      priceNote: "starting rate",
      featured: false,
      features: [
        "30–60 sec vertical reel",
        "Instagram collab post with your brand",
        "Cross-posted to Facebook",
        "3-frame story set",
        "Insights screenshot after 7 days",
      ],
    },
  ],

  // Reach simulator: conservative per-deliverable view ranges from past uploads.
  deliverables: [
    { id: "yt_dedicated", platform: "youtube" as PlatformId, label: "Dedicated YouTube video", low: 50000, high: 150000, checked: true },
    { id: "yt_integration", platform: "youtube" as PlatformId, label: "YouTube integration (60–90 sec)", low: 30000, high: 80000 },
    { id: "yt_short", platform: "youtube" as PlatformId, label: "YouTube Short", low: 20000, high: 100000 },
    { id: "ig_reel", platform: "instagram" as PlatformId, label: "Instagram Reel (collab)", low: 30000, high: 120000, checked: true },
    { id: "ig_story", platform: "instagram" as PlatformId, label: "Instagram story set (3 frames)", low: 8000, high: 15000 },
    { id: "fb_video", platform: "facebook" as PlatformId, label: "Facebook video", low: 20000, high: 60000 },
    { id: "fb_post", platform: "facebook" as PlatformId, label: "Facebook post / reel share", low: 5000, high: 12000 },
  ],

  faq: [
    {
      q: "Which brands are the best fit for Viral Vlog Rounderz?",
      a: "Brands and businesses selling gadgets, refurbished electronics, pre-owned vehicles, wholesale or discount retail, pet products and local food. The audience is 82% aged 18–34 and mostly based in Bihar, Uttar Pradesh and Delhi NCR.",
    },
    {
      q: "Do you shoot outside Patna?",
      a: "Yes. Arif is based in Patna, Bihar and is available for shoots across India. Travel costs for shoots outside Bihar are quoted separately.",
    },
    {
      q: "Can I see the analytics before booking?",
      a: "Yes. Screenshots from YouTube Studio and Instagram Insights, or a live screen-share of the dashboards, are available to any brand in active discussion.",
    },
    {
      q: "How quickly does a collaboration go live?",
      a: "A typical single-video collaboration goes from brief to publish in 7–14 days, depending on the shoot location and how quickly the final cut is approved.",
    },
    {
      q: "Do you accept barter collaborations?",
      a: "Barter or hybrid deals are considered for local businesses on a case-by-case basis. Mention it in your brief.",
    },
    {
      q: "What do I get after the video goes live?",
      a: "A performance report at 7 and 30 days with native platform analytics: views, watch time, audience retention and link clicks where available.",
    },
  ],
} as const;

export type Platform = (typeof SITE.platforms)[number];
export type CaseStudy = (typeof SITE.caseStudies)[number];
export type Deliverable = (typeof SITE.deliverables)[number];

/* ---------- Helpers ---------- */
export const compact = (n: number) => {
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, "") + "M";
  if (n >= 1e5) return Math.round(n / 1e3) + "K";
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return String(Math.round(n));
};
export const full = (n: number) => Math.round(n).toLocaleString("en-US");

export const PLAT_BG: Record<PlatformId, string> = {
  youtube: "#ff3d3d",
  instagram: "linear-gradient(45deg,#f58529,#dd2a7b 50%,#8134af)",
  facebook: "#3b82f6",
};
export const PLAT_COLOR: Record<PlatformId, string> = {
  youtube: "var(--yt)",
  instagram: "var(--ig)",
  facebook: "var(--fb)",
};
export const NICHE_TINT: Record<NicheId, [string, string]> = {
  tech: ["rgba(139,92,246,.55)", "rgba(34,211,238,.4)"],
  auto: ["rgba(239,68,68,.5)", "rgba(251,146,60,.35)"],
  markets: ["rgba(52,211,153,.45)", "rgba(34,211,238,.3)"],
  pets: ["rgba(244,114,182,.5)", "rgba(251,191,36,.35)"],
};

export const youtube = SITE.platforms[0];
