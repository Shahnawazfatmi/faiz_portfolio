/* ==========================================================================
   SITE DATA — single source of truth for index.html AND media-kit.html.
   Update numbers, prices and links here; both pages re-render from it.
   ========================================================================== */
window.SITE = {
  updated: "October 2026",

  creator: {
    name: "Arif Hassan",
    firstName: "Arif",
    age: 24,
    brand: "Viral Vlog Rounderz",
    location: "Patna, Bihar, India",
    availability: "Available for Pan-India shoots",
    email: "arifh8912@gmail.com",
    // WhatsApp number in international format, digits only (e.g. "919876543210").
    // Leave empty to open WhatsApp's contact picker with the brief pre-filled.
    whatsapp: "",
    // Drop a square photo at this path; initials are shown until it exists.
    photo: "assets/arif.jpg",
    bio:
      "Arif Hassan is a Patna-based creator who has been filming India's street markets, " +
      "second-hand gadget shops, used-car lots and pet bazaars since 2018. Every video shows " +
      "real prices, real shops and real inspections, which is why his audience shows up at " +
      "the store after they watch.",
  },

  // Optional: a YouTube Data API v3 key turns the YouTube card into a live counter.
  youtubeApiKey: "",
  youtubeChannelId: "UC3Utq3yK3IxEWfOieaz96pg",

  combined: { followers: 375400, views: 14000000 },

  platforms: [
    {
      id: "youtube",
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
      id: "instagram",
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
      id: "facebook",
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
    {
      id: "tech",
      title: "Budget Tech & Refurbished Gadgets",
      short: "Tech",
      icon: "laptop",
      desc: "Second-hand MacBooks, ThinkPads, smartphones and DSLRs, with honest price checks.",
    },
    {
      id: "auto",
      title: "Pre-Owned Automotive",
      short: "Auto",
      icon: "car",
      desc: "Used cars and bikes with live inspections, test rides and on-camera negotiation.",
    },
    {
      id: "markets",
      title: "Wholesale & Street Markets",
      short: "Markets",
      icon: "store",
      desc: "Flea markets, wholesale textile and discount retail across Patna, Delhi and Kolkata.",
    },
    {
      id: "pets",
      title: "Pet Care & Lifestyle",
      short: "Pets & Lifestyle",
      icon: "paw",
      desc: "Pet markets for dogs, cats and birds, plus local food reviews and daily vlogs.",
    },
  ],

  caseStudies: [
    {
      niche: "pets",
      client: "Pets and Care",
      location: "Anisabad, Patna",
      platform: "YouTube",
      views: 1406877,
      result: "800+",
      resultLabel: "customer visits & inquiries across Bihar",
      summary:
        "A full walkthrough of the store, covering breeds, pricing and care advice, so viewers knew what to expect before they visited.",
      url: "", // paste the video link to make the card clickable
    },
    {
      niche: "tech",
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
      niche: "auto",
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
    { id: "yt_dedicated", platform: "youtube", label: "Dedicated YouTube video", low: 50000, high: 150000, checked: true },
    { id: "yt_integration", platform: "youtube", label: "YouTube integration (60–90 sec)", low: 30000, high: 80000 },
    { id: "yt_short", platform: "youtube", label: "YouTube Short", low: 20000, high: 100000 },
    { id: "ig_reel", platform: "instagram", label: "Instagram Reel (collab)", low: 30000, high: 120000, checked: true },
    { id: "ig_story", platform: "instagram", label: "Instagram story set (3 frames)", low: 8000, high: 15000 },
    { id: "fb_video", platform: "facebook", label: "Facebook video", low: 20000, high: 60000 },
    { id: "fb_post", platform: "facebook", label: "Facebook post / reel share", low: 5000, high: 12000 },
  ],
};
