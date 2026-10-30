import type { Metadata } from "next";
import { SITE, compact, full, PLAT_BG, type PlatformId } from "@/lib/site";
import { MailIcon, NicheIcon, PlatformIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import VerifiedBadge from "@/components/VerifiedBadge";
import KitToolbar from "./KitToolbar";
import "./media-kit.css";

export const metadata: Metadata = {
  title: "Media Kit 2026 (PDF)",
  description: "Download the 2026 media kit of Arif Hassan (Viral Vlog Rounderz): platform reach, audience demographics, case studies and collaboration rates.",
  alternates: { canonical: "/media-kit/" },
};

const PC: Record<PlatformId, string> = { youtube: "#ff0033", instagram: "#e1306c", facebook: "#1877f2" };
const shortUrl = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function Bars({ rows }: { rows: readonly { label: string; value: number }[] }) {
  return (
    <>
      {rows.map((r) => (
        <div className="k-bar-row" key={r.label}>
          <span>{r.label}</span>
          <div className={`k-bar${/other|rest|desktop/i.test(r.label) ? " dim" : ""}`}><i style={{ width: `${r.value}%` }} /></div>
          <b>{r.value}%</b>
        </div>
      ))}
    </>
  );
}

export default function MediaKitPage() {
  const A = SITE.audience;
  const yt = SITE.platforms[0];
  const footer = (n: string) => (
    <footer className="k-foot"><span><b>{SITE.creator.name}</b> · {SITE.creator.brand} · Media Kit {SITE.updated}</span><span>{n} / 02</span></footer>
  );

  return (
    <div className="kit">
      <KitToolbar />
      <div className="k-pages">
        {/* ================= PAGE 1 ================= */}
        <section className="k-page">
          <header className="k-hero">
            <div className="k-brandline">
              <span className="k-logo"><i><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" /></svg></i>Viral Vlog Rounderz</span>
              <span>Media Kit · {SITE.updated}</span>
            </div>
            <div className="k-hero-main">
              <div className="k-avatar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/arif-hassan-avatar.webp" alt="Arif Hassan" />
              </div>
              <div>
                <h1>{SITE.creator.name} <VerifiedBadge size={26} /></h1>
                <div className="k-role">Content Creator · {SITE.creator.brand}</div>
                <div className="k-meta">
                  <span><PinIcon />{SITE.creator.location}</span>
                  <span><PinIcon />Pan-India shoots</span>
                  <span><MailIcon />{SITE.creator.email}</span>
                </div>
              </div>
              <div className="k-hero-kpis">
                <div><b>{compact(SITE.combined.followers)}+</b><small>Combined followers</small></div>
                <div><b>{compact(SITE.combined.views)}+</b><small>Lifetime views</small></div>
              </div>
            </div>
            <p className="k-tagline">Real markets. Real prices. <em>Real buyers.</em> High-intent young audiences across Bihar, UP and Delhi NCR, reached through honest on-ground video.</p>
          </header>

          <div className="k-pad">
            <div className="k-sec">
              <div className="k-title"><span>01</span><h2>Platform reach</h2><small>Public profiles · verifiable</small></div>
              <div className="k-plats">
                {SITE.platforms.map((p) => (
                  <div className="k-plat" key={p.id} style={{ ["--pc" as string]: PC[p.id], ["--pbg" as string]: PLAT_BG[p.id] }}>
                    <div className="k-plat-top"><span className="k-plat-ico"><PlatformIcon id={p.id} /></span><div><b>{p.name}</b><small>{p.handle}</small></div></div>
                    <div className="k-plat-num">{compact(p.value)}<small>{p.metricLabel}</small></div>
                    <div className="k-plat-x">
                      {p.extras.map((x) => (
                        <div key={x.label}><span>{x.label}</span><b>{"text" in x ? x.text : full(x.value) + ("suffix" in x ? x.suffix : "")}</b></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="k-sec k-two">
              <div>
                <div className="k-title"><span>02</span><h2>About the creator</h2></div>
                <p className="k-bio">{SITE.creator.bio}</p>
              </div>
              <div>
                <div className="k-title"><span>03</span><h2>At a glance</h2></div>
                <div className="k-glance">
                  <div><b>{yt.extras[1].value}+</b><small>Videos published</small></div>
                  <div><b>Since 2018</b><small>Creating on YouTube</small></div>
                  <div><b>4 verticals</b><small>Tech · Auto · Markets · Pets</small></div>
                  <div><b>Pan-India</b><small>Based in Patna, Bihar</small></div>
                </div>
              </div>
            </div>

            <div className="k-sec">
              <div className="k-title"><span>04</span><h2>Audience demographics</h2></div>
              <div className="k-aud">
                <div><h3>Age <b>{A.age[0].value}% 18–34</b></h3><Bars rows={A.age} /></div>
                <div>
                  <h3>Gender <b>{A.gender.male}% Male</b></h3>
                  <div className="k-gsplit">
                    <div style={{ width: `${A.gender.male}%`, background: "#7c3aed" }}>Male {A.gender.male}%</div>
                    <div style={{ width: `${A.gender.female}%`, background: "#ec4899", justifyContent: "center" }}>{A.gender.female}%</div>
                  </div>
                  <div className="k-gleg"><span>Strong intent for gadgets, vehicles and wholesale</span><span>Female</span></div>
                </div>
                <div><h3>Geography <b>Tier 2 &amp; 3 North India</b></h3><Bars rows={A.geography} /></div>
                <div><h3>Device <b>{A.devices[0].value}% Mobile</b></h3><Bars rows={A.devices} /></div>
              </div>
              <p className="k-src">✓ Source: {A.source}. Native analytics screenshots are available on request.</p>
            </div>
          </div>
          {footer("01")}
        </section>

        {/* ================= PAGE 2 ================= */}
        <section className="k-page">
          <header className="k-strip">
            <span className="k-logo"><i><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" /></svg></i>Viral Vlog Rounderz</span>
            <span className="r">Content · Results · Rates</span>
          </header>
          <div className="k-pad">
            <div className="k-sec">
              <div className="k-title"><span>05</span><h2>Content pillars</h2></div>
              <div className="k-pillars">
                {SITE.niches.map((n) => (
                  <div className="k-pillar" key={n.id}><i><NicheIcon name={n.icon} /></i><b>{n.title}</b><p>{n.desc}</p></div>
                ))}
              </div>
            </div>
            <div className="k-sec">
              <div className="k-title"><span>06</span><h2>Proven brand results</h2><small>View counts from public YouTube videos</small></div>
              <div className="k-cases">
                {SITE.caseStudies.map((c) => (
                  <div className="k-case" key={c.client}>
                    <div className="k-case-top"><b>{c.client}</b><small>{c.location} · {c.platform}</small></div>
                    <div className="k-case-body">
                      <div className="k-case-views"><b>{full(c.views)}</b><span>views</span></div>
                      <div className="k-case-res"><b>{c.result}</b><span>{c.resultLabel}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="k-sec">
              <div className="k-title"><span>07</span><h2>Collaboration packages</h2></div>
              <div className="k-rates">
                {SITE.packages.map((p) => (
                  <div className={`k-rate${p.featured ? " featured" : ""}`} key={p.id}>
                    {p.featured && <span className="k-badge">Best value</span>}
                    <b className="n">{p.name}</b>
                    <div className="k-price">{p.price}<small>{p.priceNote}</small></div>
                    <ul>{p.features.slice(0, 5).map((f) => <li key={f}>{f}</li>)}</ul>
                  </div>
                ))}
              </div>
              <p className="k-note">These are indicative starting rates. The final quote depends on scope, location and timeline. Custom bundles, multi-video series and barter for local businesses are available.</p>
            </div>
            <div className="k-sec">
              <div className="k-title"><span>08</span><h2>Why brands work with Arif</h2></div>
              <div className="k-why">
                <div><b>Purchase-intent audience</b><small>Viewers are shopping for gadgets, vehicles and wholesale goods.</small></div>
                <div><b>On-ground authenticity</b><small>Real shops, real prices and live inspections. No studio ads.</small></div>
                <div><b>Pan-India on location</b><small>Based in Patna, with shoots in Bihar, Delhi, Kolkata and beyond.</small></div>
                <div><b>Transparent reporting</b><small>Native analytics are shared at 7 and 30 days after going live.</small></div>
              </div>
            </div>
          </div>
          <div className="k-contact">
            <div>
              <h2>Let&apos;s put your brand in front of buyers.</h2>
              <p>Send a short brief with your product, offer and timeline. Replies come within 24 hours.</p>
            </div>
            <div className="k-contact-list">
              <a href={`mailto:${SITE.creator.email}`}><i><MailIcon /></i>{SITE.creator.email}</a>
              {SITE.creator.whatsapp && <a href={`https://wa.me/${SITE.creator.whatsapp}`}><i><WhatsAppIcon /></i>+{SITE.creator.whatsapp}</a>}
              {SITE.platforms.map((p) => (
                <a key={p.id} href={p.url}><i><PlatformIcon id={p.id} /></i>{p.id === "facebook" && /facebook\.com\/?$/.test(p.url) ? "Viral Vlog Rounderz on Facebook" : shortUrl(p.url)}</a>
              ))}
            </div>
          </div>
          {footer("02")}
        </section>
      </div>
    </div>
  );
}
