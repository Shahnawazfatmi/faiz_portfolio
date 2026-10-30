"use client";

import Link from "next/link";
import { useEffect } from "react";

const print = () =>
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(() => window.print(), 300));

export default function KitToolbar() {
  useEffect(() => {
    const fit = () => document.documentElement.style.setProperty("--s", String(Math.min(1, (window.innerWidth - 24) / 794)));
    fit();
    window.addEventListener("resize", fit);
    if (new URLSearchParams(window.location.search).get("download") === "1") print();
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div className="k-toolbar">
      <span className="hint">In the print dialog, choose <b>Save as PDF</b>, paper <b>A4</b> and margins <b>None</b>.</span>
      <Link className="k-btn" href="/">← Website</Link>
      <button className="k-btn primary" onClick={print}>Download PDF</button>
    </div>
  );
}
