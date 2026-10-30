/* ==========================================================================
   Viral Vlog Rounderz — portfolio interactions
   Renders from window.SITE (data.js).
   ========================================================================== */
(() => {
  "use strict";
  const S = window.SITE;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Formatting ---------- */
  const compact = (n) => {
    if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, "") + "M";
    if (n >= 1e5) return Math.round(n / 1e3) + "K";
    if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
    return String(Math.round(n));
  };
  const full = (n) => Math.round(n).toLocaleString("en-US");
  const fmt = (n, format) => (format === "compact" ? compact(n) : full(n));

  /* ---------- Icons ---------- */
  const ICON = {
    youtube: '<svg viewBox="0 0 24 24"><path d="M23 7.2a3 3 0 00-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 001 7.2 31 31 0 00.6 12 31 31 0 001 16.8a3 3 0 002.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 002.1-2.1 31 31 0 00.4-4.8 31 31 0 00-.4-4.8zM9.7 15.1V8.9l5.8 3.1z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.9 1.4 1.4 0 000-2.9z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><path d="M24 12a12 12 0 10-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0024 12z"/></svg>',
    laptop: '<svg class="i" viewBox="0 0 24 24"><rect x="4" y="4.5" width="16" height="11" rx="1.5"/><path d="M2 19.5h20"/></svg>',
    car: '<svg class="i" viewBox="0 0 24 24"><path d="M5 16.5H3.5v-4l2-5h13l2 5v4H19"/><path d="M3.5 12.5h17"/><circle cx="7.5" cy="16.5" r="2"/><circle cx="16.5" cy="16.5" r="2"/><path d="M9.5 16.5h5"/></svg>',
    store: '<svg class="i" viewBox="0 0 24 24"><path d="M3.5 9.5L5 4h14l1.5 5.5M3.5 9.5h17M3.5 9.5a2.8 2.8 0 005.6 0 2.8 2.8 0 005.8 0 2.8 2.8 0 005.6 0M5 12v8h14v-8M10 20v-5h4v5"/></svg>',
    paw: '<svg class="i" viewBox="0 0 24 24"><circle cx="6" cy="10" r="2"/><circle cx="10" cy="5.5" r="2"/><circle cx="14" cy="5.5" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 11.5c-3 0-6 4.5-6 7 0 1.5 1.3 2 2.5 2 1.4 0 2.2-.8 3.5-.8s2.1.8 3.5.8c1.2 0 2.5-.5 2.5-2 0-2.5-3-7-6-7z"/></svg>',
    ext: '<svg class="i ext" viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/></svg>',
    check: '<svg class="i" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    shield: '<svg class="i" viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
    eye: '<svg class="i" viewBox="0 0 24 24"><path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M7 4.5v15l12.5-7.5z"/></svg>',
    arrow: '<svg class="i" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  };
  const PLAT_BG = {
    youtube: "var(--yt)",
    instagram: "linear-gradient(45deg,#f58529,#dd2a7b 50%,#8134af)",
    facebook: "var(--fb)",
  };
  const PLAT_COLOR = { youtube: "var(--yt)", instagram: "var(--ig)", facebook: "var(--fb)" };
  const NICHE_TINT = {
    tech: ["rgba(139,92,246,.55)", "rgba(34,211,238,.4)"],
    auto: ["rgba(239,68,68,.5)", "rgba(251,146,60,.35)"],
    markets: ["rgba(52,211,153,.45)", "rgba(34,211,238,.3)"],
    pets: ["rgba(244,114,182,.5)", "rgba(251,191,36,.35)"],
  };
  const ytChannelUrl = S.platforms.find((p) => p.id === "youtube").url;

  /* ---------- Hero ---------- */
  function renderHero() {
    $("#verifiedRow").innerHTML =
      S.platforms
        .map(
          (p) => `<a class="v-badge" href="${p.url}" target="_blank" rel="noopener" aria-label="${p.name} profile, ${compact(p.value)} ${p.metricLabel.toLowerCase()}">
            <span class="p-ico" style="background:${PLAT_BG[p.id]}">${ICON[p.id]}</span><b>${compact(p.value)}</b> ${p.name} ${ICON.ext}</a>`
        )
        .join("") +
      `<span class="v-badge v-stamp">${ICON.shield} Stats updated ${S.updated}</span>`;

    const img = new Image();
    img.alt = S.creator.name;
    img.onload = () => {
      const av = $("#avatar");
      av.innerHTML = "";
      av.appendChild(img);
    };
    img.src = S.creator.photo;
  }

  /* ---------- Stats bento ---------- */
  function renderStats() {
    $("#statsStamp").textContent = `Last updated ${S.updated}.`;
    const yt = S.platforms[0];
    const platCard = (p, cls, i) => {
      const share = ((p.value / S.combined.followers) * 100).toFixed(1);
      const extras = p.extras
        .map((x) => `<span><b>${x.text ? x.text : (x.value >= 1e5 ? compact(x.value) : full(x.value)) + (x.suffix || "")}</b>${x.label}</span>`)
        .join("");
      return `<article class="card glass spot reveal ${cls}" style="--d:${0.06 * i}s">
        <div class="plat-head">
          <div class="plat-id">
            <span class="plat-ico" style="background:${PLAT_BG[p.id]}">${ICON[p.id]}</span>
            <div><h3>${p.name}</h3><small>${p.handle}</small></div>
          </div>
          <a class="plat-link" href="${p.url}" target="_blank" rel="noopener" aria-label="View ${p.name} profile"><span>View profile</span> ${ICON.ext}</a>
        </div>
        <div class="plat-num"><span data-count="${p.value}" data-format="compact" data-plat="${p.id}">0</span><small>${p.metricLabel}</small><span class="live-tag" data-live="${p.id}" hidden><span class="dot-live"></span>Live</span></div>
        <div class="extras">${extras}</div>
        <div class="plat-bar" title="${share}% of combined reach"><i style="--w:${share}%;--pc:${PLAT_COLOR[p.id]}"></i></div>
      </article>`;
    };

    $("#statsBento").innerHTML = `
      <article class="card glass spot reveal b-combined">
        <span class="eyebrow" style="margin:0">Combined followers</span>
        <div class="big-num" style="margin-top:28px"><span data-count="${S.combined.followers}" data-format="compact">0</span><em>+</em></div>
        <p class="big-label">across YouTube, Instagram &amp; Facebook</p>
        <div class="pc-meter" style="margin-top:22px">${S.platforms
          .map((p) => `<span style="--w:${((p.value / S.combined.followers) * 100).toFixed(1)}%;--c:${PLAT_COLOR[p.id]}"></span>`)
          .join("")}</div>
        <div class="pc-legend">${S.platforms
          .map((p) => `<span><i style="background:${PLAT_COLOR[p.id]}"></i>${p.name} ${compact(p.value)}</span>`)
          .join("")}</div>
        <div class="split" style="margin-top:auto;padding-top:24px">
          <div><b><span data-count="${S.combined.views}" data-format="compact">0</span>+</b><small>Lifetime views</small></div>
          <div><b><span data-count="${yt.extras[1].value}">0</span>+</b><small>Videos published</small></div>
        </div>
      </article>
      ${platCard(S.platforms[0], "b-yt", 1)}
      ${platCard(S.platforms[1], "b-ig", 2)}
      ${platCard(S.platforms[2], "b-fb", 3)}
      <article class="card glass reveal b-trust">
        <div class="trust-row">
          <div>${ICON.check}<span><b>Public, linkable profiles</b><small>Every figure on this page can be checked on the platform itself.</small></span></div>
          <div>${ICON.check}<span><b>Native analytics on request</b><small>You can see YouTube Studio and Instagram Insights before you sign.</small></span></div>
          <div>${ICON.check}<span><b>Direct with the creator</b><small>No agency in between, so you talk to Arif himself.</small></span></div>
          <div>${ICON.check}<span><b>Post-campaign reports</b><small>Views, watch time and clicks shared at 7 and 30 days.</small></span></div>
        </div>
      </article>`;
  }

  // Optional live YouTube numbers (requires S.youtubeApiKey).
  async function loadLiveYouTube() {
    if (!S.youtubeApiKey) return;
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${S.youtubeChannelId}&key=${S.youtubeApiKey}`
      );
      const stats = (await res.json()).items?.[0]?.statistics;
      if (!stats) return;
      const subs = Number(stats.subscriberCount);
      const el = $('[data-plat="youtube"]');
      if (el && subs) {
        el.dataset.count = subs;
        animateCount(el);
        $('[data-live="youtube"]').hidden = false;
      }
    } catch (_) {
      /* keep static figures */
    }
  }

  /* ---------- Audience ---------- */
  function renderAudience() {
    $("#audSource").textContent = S.audience.source;
    $$("[data-bars]").forEach((wrap) => {
      const rows = S.audience[wrap.dataset.bars];
      wrap.innerHTML = rows
        .map((r, i) => {
          const dim = /other|rest|desktop/i.test(r.label) ? " dim" : "";
          return `<div class="bar-row">
            <div class="bar-top"><span>${r.label}</span><b>${r.value}%</b></div>
            <div class="bar${dim}" role="progressbar" aria-valuenow="${r.value}" aria-valuemin="0" aria-valuemax="100" aria-label="${r.label}">
              <i style="--w:${r.value}%;--bd:${0.12 * i}s"></i></div>
          </div>`;
        })
        .join("");
    });
  }

  /* ---------- Niches & case studies ---------- */
  let activeFilter = "all";

  function renderNiches() {
    $("#nicheGrid").innerHTML = S.niches
      .map((n, i) => {
        const c = S.caseStudies.filter((cs) => cs.niche === n.id).length;
        return `<button class="niche reveal spot" style="--d:${0.06 * i}s" data-niche="${n.id}" aria-pressed="false">
          <span class="count">${c ? `${c} case stud${c > 1 ? "ies" : "y"}` : "Open slot"}</span>
          <span class="card-ico">${ICON[n.icon]}</span>
          <h3>${n.title}</h3><p>${n.desc}</p></button>`;
      })
      .join("");

    $("#filters").innerHTML = [{ id: "all", short: "All work" }, ...S.niches]
      .map((n) => `<button class="filter" role="tab" data-filter="${n.id}" aria-selected="${n.id === "all"}">${n.short}</button>`)
      .join("");

    $("#nicheGrid").addEventListener("click", (e) => {
      const b = e.target.closest("[data-niche]");
      if (!b) return;
      setFilter(activeFilter === b.dataset.niche ? "all" : b.dataset.niche);
    });
    $("#filters").addEventListener("click", (e) => {
      const b = e.target.closest("[data-filter]");
      if (b) setFilter(b.dataset.filter);
    });
    drawCases(false);
  }

  function setFilter(id) {
    if (id === activeFilter) return;
    activeFilter = id;
    $$(".filter").forEach((b) => b.setAttribute("aria-selected", b.dataset.filter === id));
    $$(".niche").forEach((b) => {
      const on = b.dataset.niche === id;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on);
    });
    $$(".case, .case-empty", $("#cases")).forEach((c) => c.classList.add("hide"));
    setTimeout(() => drawCases(true), reduceMotion ? 0 : 280);
  }

  function caseCard(cs) {
    const [t1, t2] = NICHE_TINT[cs.niche];
    const niche = S.niches.find((n) => n.id === cs.niche);
    const href = cs.url || ytChannelUrl;
    return `<a class="card glass spot case hide" href="${href}" target="_blank" rel="noopener" style="--t1:${t1};--t2:${t2}">
      <div class="case-thumb">
        <span class="play" aria-hidden="true">${ICON.play}</span>
        <span class="views">${ICON.eye}${full(cs.views)} views</span>
        <span class="tag">${niche.short}</span>
      </div>
      <div class="case-body">
        <h3>${cs.client}</h3>
        <div class="case-loc">${cs.location} · ${cs.platform}</div>
        <p>${cs.summary}</p>
        <div class="case-result"><b>${cs.result}</b><span>${cs.resultLabel}</span></div>
      </div>
    </a>`;
  }

  function drawCases(animate) {
    const list = S.caseStudies.filter((c) => activeFilter === "all" || c.niche === activeFilter);
    const wrap = $("#cases");
    if (!list.length) {
      const n = S.niches.find((x) => x.id === activeFilter);
      wrap.innerHTML = `<div class="case-empty hide"><b>Your brand could be the first case study here.</b>
        ${n.title} is one of my core content areas, and this slot is open.
        <a href="#contact" data-prefill-niche="${n.title}">Pitch a collaboration →</a></div>`;
    } else {
      wrap.innerHTML = list.map(caseCard).join("");
    }
    const items = $$(".case, .case-empty", wrap);
    const show = () =>
      items.forEach((el, i) => {
        el.style.transitionDelay = `${i * 70}ms`;
        el.classList.remove("hide");
        setTimeout(() => (el.style.transitionDelay = ""), 600 + i * 70);
      });
    if (animate) requestAnimationFrame(() => requestAnimationFrame(show));
    else casesShow = show;
  }
  let casesShow = null; // first paint waits until the section scrolls into view

  /* ---------- Simulator ---------- */
  const simState = new Set(S.deliverables.filter((d) => d.checked).map((d) => d.id));
  let simShown = 0;

  function renderSimulator() {
    const groups = ["youtube", "instagram", "facebook"];
    $("#simList").innerHTML = groups
      .map((g) => {
        const p = S.platforms.find((x) => x.id === g);
        const opts = S.deliverables
          .filter((d) => d.platform === g)
          .map(
            (d) => `<label class="opt ${simState.has(d.id) ? "on" : ""}" data-id="${d.id}">
              <input type="checkbox" ${simState.has(d.id) ? "checked" : ""} />
              <span class="box"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
              <span class="opt-label">${d.label}</span>
              <span class="opt-range">${compact(d.low)}–${compact(d.high)} views</span>
            </label>`
          )
          .join("");
        return `<div class="sim-group"><i style="background:${PLAT_COLOR[g]}"></i>${p.name}</div>${opts}`;
      })
      .join("");

    $("#simList").addEventListener("change", (e) => {
      const opt = e.target.closest(".opt");
      if (!opt) return;
      const id = opt.dataset.id;
      e.target.checked ? simState.add(id) : simState.delete(id);
      opt.classList.toggle("on", e.target.checked);
      updateSim();
    });

    $("#simCta").addEventListener("click", () => {
      const chosen = S.deliverables.filter((d) => simState.has(d.id));
      if (!chosen.length) return toast("Select at least one deliverable first.");
      const { low, high } = simTotals();
      const msg = $("#leadForm [name=message]");
      const plan =
        `Campaign plan from the reach simulator:\n` +
        chosen.map((d) => `• ${d.label}`).join("\n") +
        `\nEstimated views: ${compact(low)}–${compact(high)}\n\n`;
      if (!msg.value.trim() || msg.dataset.auto === "1") {
        msg.value = plan + "About our product/offer: ";
        msg.dataset.auto = "1";
      }
      const budget = $("#leadForm [name=budget]");
      if (chosen.length >= 4) budget.value = "₹40,000 – ₹1,00,000";
      $("#contact").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      setTimeout(() => msg.focus({ preventScroll: true }), 700);
    });
    updateSim(true);
  }

  function simTotals() {
    return S.deliverables
      .filter((d) => simState.has(d.id))
      .reduce((a, d) => ({ low: a.low + d.low, high: a.high + d.high }), { low: 0, high: 0 });
  }

  function updateSim(initial) {
    const chosen = S.deliverables.filter((d) => simState.has(d.id));
    const { low, high } = simTotals();
    const mid = Math.round((low + high) / 2);
    const maxMid = S.deliverables.reduce((a, d) => a + (d.low + d.high) / 2, 0);
    const plats = new Set(chosen.map((d) => d.platform));
    const followers = S.platforms.filter((p) => plats.has(p.id)).reduce((a, p) => a + p.value, 0);

    $("#simLow").textContent = compact(low);
    $("#simHigh").textContent = compact(high);
    $("#simCount").textContent = chosen.length;
    $("#simPlat").textContent = plats.size;
    $("#simReach").textContent = compact(followers);
    $("#simMeter").style.width = `${(mid / maxMid) * 100}%`;

    const out = $("#simMid");
    tween(simShown, mid, initial ? 0 : 650, (v) => (out.textContent = compact(v)));
    simShown = mid;
    if (!initial && !reduceMotion) {
      const big = out.parentElement;
      big.classList.remove("bump");
      void big.offsetWidth;
      big.classList.add("bump");
    }
  }

  /* ---------- Packages ---------- */
  function renderPackages() {
    $("#packagesGrid").innerHTML = S.packages
      .map(
        (p, i) => `<article class="card glass spot reveal pkg ${p.featured ? "featured" : ""}" style="--d:${0.08 * i}s">
          ${p.featured ? '<span class="pkg-badge">Best value</span>' : ""}
          <h3>${p.name}</h3>
          <p class="pkg-tag">${p.tagline}</p>
          <div class="pkg-price">${p.price || "Custom"}</div>
          <div class="pkg-note">${p.price ? p.priceNote : "quote on request"}</div>
          <ul>${p.features.map((f) => `<li>${ICON.check}<span>${f}</span></li>`).join("")}</ul>
          <a href="#contact" class="btn ${p.featured ? "btn-primary" : "btn-ghost"} btn-block" data-pkg="${p.id}">Choose package ${ICON.arrow}</a>
        </article>`
      )
      .join("");

    $("#pkgChips").innerHTML =
      S.packages
        .map((p) => `<label class="chip"><input type="checkbox" name="pkg" value="${p.name}" data-pkg="${p.id}" /><span>${p.name}</span></label>`)
        .join("") + `<label class="chip"><input type="checkbox" name="pkg" value="Custom bundle" /><span>Custom / Not sure</span></label>`;

    $("#packagesGrid").addEventListener("click", (e) => {
      const b = e.target.closest("[data-pkg]");
      if (!b) return;
      const chip = $(`#pkgChips input[data-pkg="${b.dataset.pkg}"]`);
      if (chip) chip.checked = true;
    });
  }

  /* ---------- Lead form ---------- */
  function initForm() {
    const form = $("#leadForm");
    const status = $("#formStatus");
    const email = S.creator.email;
    const link = $("#emailLink");
    link.href = `mailto:${email}`;
    link.textContent = email;

    $("#socials").innerHTML = S.platforms
      .map((p) => `<a href="${p.url}" target="_blank" rel="noopener" aria-label="${p.name}" style="--hc:${PLAT_BG[p.id]}">${ICON[p.id]}</a>`)
      .join("");

    form.addEventListener("input", (e) => {
      e.target.closest(".field")?.classList.remove("invalid");
      if (e.target.name === "message") e.target.dataset.auto = "0";
    });

    document.addEventListener("click", (e) => {
      const a = e.target.closest("[data-prefill-niche]");
      if (!a) return;
      const sel = form.niche;
      const match = [...sel.options].find((o) => a.dataset.prefillNiche.toLowerCase().includes(o.text.split(" ")[0].toLowerCase()));
      if (match) sel.value = match.value;
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const via = e.submitter?.dataset.via || "email";
      const d = Object.fromEntries(new FormData(form));
      const pkgs = $$("input[name=pkg]:checked", form).map((i) => i.value);

      let bad = null;
      ["name", "brand", "email", "message"].forEach((k) => {
        const ok = k === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d[k] || "") : (d[k] || "").trim().length > 1;
        if (!ok) {
          form[k].closest(".field").classList.add("invalid");
          bad = bad || form[k];
        }
      });
      if (bad) {
        status.className = "form-status err";
        status.textContent = "Please fill in the highlighted fields.";
        bad.focus();
        return;
      }

      const subject = `Brand Collaboration Inquiry — ${d.brand.trim()}`;
      const lines = [
        `Hi Arif, I'd like to discuss a collaboration with Viral Vlog Rounderz.`,
        ``,
        `Name: ${d.name.trim()}`,
        `Brand: ${d.brand.trim()}`,
        `Email: ${d.email.trim()}`,
        d.phone?.trim() ? `Phone: ${d.phone.trim()}` : null,
        `Category: ${d.niche}`,
        `Budget: ${d.budget}`,
        pkgs.length ? `Interested in: ${pkgs.join(", ")}` : null,
        ``,
        `Brief:`,
        d.message.trim(),
      ].filter((l) => l !== null);
      const body = lines.join("\n");

      navigator.clipboard?.writeText(body).catch(() => {});

      if (via === "whatsapp" && S.creator.whatsapp) {
        const wa = `*${subject}*\n\n` + body;
        window.open(`https://wa.me/${S.creator.whatsapp}?text=${encodeURIComponent(wa)}`, "_blank", "noopener");
        status.className = "form-status ok";
        status.textContent = "Opening WhatsApp with your brief. Just press send.";
      } else {
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        status.className = "form-status ok";
        status.textContent =
          via === "whatsapp"
            ? `WhatsApp isn't set up yet, so your email app is opening instead. Your brief is also copied to the clipboard.`
            : `Opening your email app with the brief addressed to ${email}. It's also copied to your clipboard.`;
      }
    });
  }

  /* ---------- Counters ---------- */
  function tween(from, to, dur, step) {
    if (reduceMotion || dur === 0) return step(to);
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 4);
      step(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  function animateCount(el) {
    const to = Number(el.dataset.count);
    const sfx = el.dataset.suffix || "";
    tween(0, to, 1800, (v) => (el.textContent = fmt(v, el.dataset.format) + sfx));
  }

  /* ---------- Observers ---------- */
  function initObservers() {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("in");
          io.unobserve(en.target);
        }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    $$(".reveal").forEach((el) => io.observe(el));

    const co = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          animateCount(en.target);
          co.unobserve(en.target);
        }),
      { threshold: 0.6 }
    );
    $$("[data-count]").forEach((el) => co.observe(el));

    const caseIo = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting) && casesShow) {
        casesShow();
        casesShow = null;
        caseIo.disconnect();
      }
    }, { threshold: 0.1 });
    caseIo.observe($("#cases"));

    // Active nav link
    const links = $$(".nav-links a[href^='#']");
    const so = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${en.target.id}`));
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    $$("section[id]").forEach((s) => so.observe(s));
  }

  /* ---------- Nav, progress, pointer effects ---------- */
  function initChrome() {
    const nav = $("#nav");
    const bar = $("#progressBar");
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 20);
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const menu = $("#menuBtn");
    const links = $("#navLinks");
    menu.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      menu.setAttribute("aria-expanded", open);
    });
    links.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      }
    });

    if (!finePointer || reduceMotion) return;

    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest?.(".spot");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });

    const visual = $(".hero-visual");
    const pc = $("#profileCard");
    visual.addEventListener("pointermove", (e) => {
      const r = visual.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      pc.style.setProperty("--ry", `${x * 10}deg`);
      pc.style.setProperty("--rx", `${-y * 10}deg`);
    });
    visual.addEventListener("pointerleave", () => {
      pc.style.setProperty("--ry", "0deg");
      pc.style.setProperty("--rx", "0deg");
    });

    $$(".magnetic").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.setProperty("--bx", `${(e.clientX - r.left - r.width / 2) * 0.18}px`);
        b.style.setProperty("--by", `${(e.clientY - r.top - r.height / 2) * 0.3}px`);
      });
      b.addEventListener("pointerleave", () => {
        b.style.setProperty("--bx", "0px");
        b.style.setProperty("--by", "0px");
      });
    });
  }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  /* ---------- Boot ---------- */
  renderHero();
  renderStats();
  renderAudience();
  renderNiches();
  renderSimulator();
  renderPackages();
  initForm();
  $("#year").textContent = new Date().getFullYear();
  $("#footStamp").textContent = S.updated;
  initObservers();
  initChrome();
  loadLiveYouTube();
})();
