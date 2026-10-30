"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { SITE, compact } from "@/lib/site";
import { MailIcon, WhatsAppIcon } from "./Icons";
import { SELECT_PACKAGE } from "./Packages";

const NICHES = ["Budget Tech & Gadgets", "Pre-Owned Automotive", "Wholesale & Retail", "Pet Care & Lifestyle", "Food & Restaurants", "Other"];
const BUDGETS = ["Under ₹15,000", "₹15,000 – ₹40,000", "₹40,000 – ₹1,00,000", "₹1,00,000+", "Barter / Discuss"];
type Status = { kind: "" | "ok" | "err"; text: string };

export default function LeadForm() {
  const form = useRef<HTMLFormElement>(null);
  const [pkgs, setPkgs] = useState<Set<string>>(new Set());
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<Status>({ kind: "", text: "" });

  // Prefill from the reach simulator (?plan=a,b,c) or a package button.
  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan");
    if (plan) {
      const chosen = SITE.deliverables.filter((d) => plan.split(",").includes(d.id));
      if (chosen.length) {
        const low = chosen.reduce((a, d) => a + d.low, 0);
        const high = chosen.reduce((a, d) => a + d.high, 0);
        setMessage(
          `Campaign plan from the reach simulator:\n${chosen.map((d) => `• ${d.label}`).join("\n")}\n` +
            `Estimated views: ${compact(low)}–${compact(high)}\n\nAbout our product/offer: `
        );
        if (chosen.length >= 4) setBudget(BUDGETS[2]);
      }
    }
    const onPick = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const name = SITE.packages.find((p) => p.id === id)?.name;
      if (name) setPkgs((s) => new Set(s).add(name));
    };
    window.addEventListener(SELECT_PACKAGE, onPick);
    return () => window.removeEventListener(SELECT_PACKAGE, onPick);
  }, []);

  const togglePkg = (name: string) =>
    setPkgs((s) => {
      const n = new Set(s);
      n.has(name) ? n.delete(name) : n.add(name);
      return n;
    });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.dataset.via ?? "email";
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    const bad = new Set<string>();
    if ((d.name ?? "").trim().length < 2) bad.add("name");
    if ((d.brand ?? "").trim().length < 2) bad.add("brand");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email ?? "")) bad.add("email");
    if ((d.message ?? "").trim().length < 2) bad.add("message");
    setInvalid(bad);
    if (bad.size) {
      setStatus({ kind: "err", text: "Please fill in the highlighted fields." });
      form.current?.querySelector<HTMLElement>(`[name="${[...bad][0]}"]`)?.focus();
      return;
    }

    const subject = `Brand Collaboration Inquiry — ${d.brand.trim()}`;
    const body = [
      "Hi Arif, I'd like to discuss a collaboration with Viral Vlog Rounderz.",
      "",
      `Name: ${d.name.trim()}`,
      `Brand: ${d.brand.trim()}`,
      `Email: ${d.email.trim()}`,
      d.phone?.trim() ? `Phone: ${d.phone.trim()}` : null,
      `Category: ${d.niche}`,
      `Budget: ${d.budget}`,
      pkgs.size ? `Interested in: ${[...pkgs].join(", ")}` : null,
      "",
      "Brief:",
      d.message.trim(),
    ]
      .filter((l) => l !== null)
      .join("\n");

    navigator.clipboard?.writeText(body).catch(() => {});

    if (via === "whatsapp" && SITE.creator.whatsapp) {
      window.open(`https://wa.me/${SITE.creator.whatsapp}?text=${encodeURIComponent(`*${subject}*\n\n${body}`)}`, "_blank", "noopener");
      setStatus({ kind: "ok", text: "Opening WhatsApp with your brief. Just press send." });
    } else {
      window.location.href = `mailto:${SITE.creator.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({
        kind: "ok",
        text:
          via === "whatsapp"
            ? "WhatsApp isn't set up yet, so your email app is opening instead. Your brief is also copied to the clipboard."
            : `Opening your email app with the brief addressed to ${SITE.creator.email}. It's also copied to your clipboard.`,
      });
    }
  };

  const f = (name: string) => `field${invalid.has(name) ? " invalid" : ""}`;
  const clear = (name: string) => invalid.has(name) && setInvalid((s) => { const n = new Set(s); n.delete(name); return n; });

  return (
    <form ref={form} className="form glass" noValidate onSubmit={submit} aria-label="Brand collaboration inquiry">
      <div className="row2">
        <label className={f("name")}><span>Your name *</span><input name="name" required autoComplete="name" placeholder="Rahul Sharma" onInput={() => clear("name")} /></label>
        <label className={f("brand")}><span>Brand / Business *</span><input name="brand" required autoComplete="organization" placeholder="Patna Gadget Hub" onInput={() => clear("brand")} /></label>
      </div>
      <div className="row2">
        <label className={f("email")}><span>Email *</span><input name="email" type="email" required autoComplete="email" placeholder="you@brand.com" onInput={() => clear("email")} /></label>
        <label className="field"><span>Phone / WhatsApp</span><input name="phone" type="tel" autoComplete="tel" placeholder="+91 98xxx xxxxx" /></label>
      </div>
      <div className="row2">
        <label className="field"><span>Category</span>
          <select name="niche" defaultValue={NICHES[0]}>{NICHES.map((n) => <option key={n}>{n}</option>)}</select>
        </label>
        <label className="field"><span>Budget</span>
          <select name="budget" value={budget} onChange={(e) => setBudget(e.target.value)}>{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select>
        </label>
      </div>
      <fieldset className="field">
        <legend>Interested in</legend>
        <div className="chips">
          {[...SITE.packages.map((p) => p.name), "Custom bundle"].map((name) => (
            <label key={name} className="chk">
              <input type="checkbox" checked={pkgs.has(name)} onChange={() => togglePkg(name)} />
              <span>{name === "Custom bundle" ? "Custom / Not sure" : name}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className={f("message")}><span>Campaign brief *</span>
        <textarea name="message" rows={5} required placeholder="Product, offer, launch date, store location…" value={message} onChange={(e) => { setMessage(e.target.value); clear("message"); }} />
      </label>
      <div className="form-actions">
        <button type="submit" className="btn btn-wa" data-via="whatsapp"><WhatsAppIcon /> Send on WhatsApp</button>
        <button type="submit" className="btn btn-ghost" data-via="email"><MailIcon /> Send by Email</button>
      </div>
      <p className={`form-status ${status.kind}`} role="status">{status.text}</p>
    </form>
  );
}
