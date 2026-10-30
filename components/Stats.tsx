import { SITE, PLAT_BG, PLAT_COLOR, compact, full, type Platform } from "@/lib/site";
import { CheckIcon, ExtIcon, PlatformIcon } from "./Icons";
import { Counter, Reveal } from "./motion";

const share = (v: number) => `${((v / SITE.combined.followers) * 100).toFixed(1)}%`;

function PlatformCard({ p, cls, delay }: { p: Platform; cls: string; delay: number }) {
  return (
    <Reveal as="article" className={`card glass spot ${cls}`} delay={delay}>
      <div className="plat-head">
        <div className="plat-id">
          <span className="plat-ico" style={{ background: PLAT_BG[p.id] }}><PlatformIcon id={p.id} /></span>
          <div><h3>{p.name}</h3><small>{p.handle}</small></div>
        </div>
        <a className="plat-link" href={p.url} target="_blank" rel="noopener me" aria-label={`View ${p.name} profile`}>
          <span>View profile</span> <ExtIcon />
        </a>
      </div>
      <div className="plat-num"><Counter to={p.value} format="compact" /><small>{p.metricLabel}</small></div>
      <div className="extras">
        {p.extras.map((x) => (
          <span key={x.label}>
            <b>{"text" in x ? x.text : (x.value >= 1e5 ? compact(x.value) : full(x.value)) + ("suffix" in x ? x.suffix : "")}</b>
            {x.label}
          </span>
        ))}
      </div>
      <div className="plat-bar" title={`${share(p.value)} of combined reach`}>
        <i style={{ ["--w" as string]: share(p.value), ["--pc" as string]: PLAT_COLOR[p.id] }} />
      </div>
    </Reveal>
  );
}

export default function Stats() {
  const [yt, ig, fb] = SITE.platforms;
  return (
    <section className="section" id="stats" aria-labelledby="stats-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">01 · Reach dashboard</span>
          <h2 id="stats-title">One creator. <span className="grad-text">Three platforms.</span></h2>
          <p>Every number links to the public profile it comes from. <span className="muted">Last updated {SITE.updated}.</span></p>
        </Reveal>
        <div className="bento">
          <Reveal as="article" className="card glass spot b-combined">
            <span className="eyebrow" style={{ margin: 0 }}>Combined followers</span>
            <div className="big-num"><Counter to={SITE.combined.followers} format="compact" /><em>+</em></div>
            <p className="big-label">across YouTube, Instagram &amp; Facebook</p>
            <div className="meter">
              {SITE.platforms.map((p) => (
                <span key={p.id} style={{ ["--w" as string]: share(p.value), ["--c" as string]: PLAT_COLOR[p.id] }} />
              ))}
            </div>
            <div className="legend" style={{ marginTop: 12 }}>
              {SITE.platforms.map((p) => (
                <span key={p.id}><i style={{ background: PLAT_COLOR[p.id] }} />{p.name} {compact(p.value)}</span>
              ))}
            </div>
            <div className="split">
              <div><b><Counter to={SITE.combined.views} format="compact" suffix="+" /></b><small>Lifetime views</small></div>
              <div><b><Counter to={929} suffix="+" /></b><small>Videos published</small></div>
            </div>
          </Reveal>
          <PlatformCard p={yt} cls="b-yt" delay={0.06} />
          <PlatformCard p={ig} cls="b-ig" delay={0.12} />
          <PlatformCard p={fb} cls="b-fb" delay={0.18} />
          <Reveal as="article" className="card glass b-trust">
            <div className="trust-row">
              <div><CheckIcon /><span><b>Public, linkable profiles</b><small>Every figure on this page can be checked on the platform itself.</small></span></div>
              <div><CheckIcon /><span><b>Native analytics on request</b><small>You can see YouTube Studio and Instagram Insights before you sign.</small></span></div>
              <div><CheckIcon /><span><b>Direct with the creator</b><small>No agency in between, so you talk to Arif himself.</small></span></div>
              <div><CheckIcon /><span><b>Post-campaign reports</b><small>Views, watch time and clicks are shared at 7 and 30 days.</small></span></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
