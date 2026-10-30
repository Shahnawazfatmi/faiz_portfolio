import { SITE } from "@/lib/site";
import { GenderIcon, PhoneIcon, PinIcon, ShieldIcon, UsersIcon } from "./Icons";
import { Counter, Reveal } from "./motion";

function Bars({ rows }: { rows: readonly { label: string; value: number }[] }) {
  return (
    <div className="bars">
      {rows.map((r, i) => (
        <div className="bar-row" key={r.label}>
          <div className="bar-top"><span>{r.label}</span><b>{r.value}%</b></div>
          <div
            className={`bar${/other|rest|desktop/i.test(r.label) ? " dim" : ""}`}
            role="progressbar" aria-valuenow={r.value} aria-valuemin={0} aria-valuemax={100} aria-label={r.label}
          >
            <i style={{ ["--w" as string]: `${r.value}%`, ["--bd" as string]: `${0.12 * i}s` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Audience() {
  const A = SITE.audience;
  const north = A.geography.slice(0, 3).reduce((a, g) => a + g.value, 0);
  return (
    <section className="section" id="audience" aria-labelledby="aud-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">02 · Audience</span>
          <h2 id="aud-title">Young, mobile-first, <span className="grad-text">ready to buy.</span></h2>
          <p>Mostly young men in Tier 2 and Tier 3 North India, watching on their phones and shopping for gadgets, vehicles and wholesale goods.</p>
        </Reveal>
        <div className="aud-grid">
          <Reveal as="article" className="card glass spot">
            <header className="card-head"><span className="card-ico"><UsersIcon /></span><h3>Age</h3></header>
            <div className="aud-hero"><b><Counter to={A.age[0].value} suffix="%" /></b><span>aged 18–34</span></div>
            <Bars rows={A.age} />
          </Reveal>
          <Reveal as="article" className="card glass spot" delay={0.06}>
            <header className="card-head"><span className="card-ico"><GenderIcon /></span><h3>Gender</h3></header>
            <div className="gender">
              <div className="donut" style={{ ["--p" as string]: A.gender.male }}>
                <div><b><Counter to={A.gender.male} suffix="%" /></b><small>Male</small></div>
              </div>
              <ul className="g-legend">
                <li><i style={{ background: "var(--violet)" }} />Male <b>{A.gender.male}%</b></li>
                <li><i style={{ background: "var(--pink)" }} />Female <b>{A.gender.female}%</b></li>
              </ul>
            </div>
            <p className="card-note">This audience buys gadgets, vehicles and wholesale goods.</p>
          </Reveal>
          <Reveal as="article" className="card glass spot" delay={0.12}>
            <header className="card-head"><span className="card-ico"><PinIcon /></span><h3>Geography</h3></header>
            <div className="aud-hero"><b><Counter to={north} suffix="%" /></b><span>from Bihar, UP &amp; Delhi NCR</span></div>
            <Bars rows={A.geography} />
            <p className="card-note">A strong fit for regional businesses and for brands growing across Tier 2 and Tier 3 North India.</p>
          </Reveal>
          <Reveal as="article" className="card glass spot" delay={0.18}>
            <header className="card-head"><span className="card-ico"><PhoneIcon /></span><h3>Device</h3></header>
            <div className="aud-hero"><b><Counter to={A.devices[0].value} suffix="%" /></b><span>watch on mobile</span></div>
            <Bars rows={A.devices} />
          </Reveal>
        </div>
        <Reveal className="source-note">
          <ShieldIcon />
          <span>Source: {A.source}. I&apos;m happy to share analytics screenshots or a screen-share of my dashboards with any brand I&apos;m talking to.</span>
        </Reveal>
      </div>
    </section>
  );
}
