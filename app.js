/**
 * AUTO CARE MOTORS — Interactive UI, Then/Now Slider & Pop-Up Modals
 */

document.addEventListener("DOMContentLoaded", () => {
  initLiveStatus();
  initNavigation();
  initProjectsShowcase();
  initModals();
  initScrollReveal();
  initEnhancements();
  initProductShelf();
  initKitCards();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* 1. Live Monday–Saturday Open / Sunday Closed Indicator (Lilongwe time) */
function initLiveStatus() {
  const dot = document.getElementById("status-dot");
  const text = document.getElementById("live-status-text");
  if (!dot || !text) return;
  let day;
  try {
    day = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Blantyre" })).getDay();
  } catch {
    day = new Date().getDay();
  }
  const closed = day === 0;
  dot.classList.toggle("is-closed", closed);
  text.textContent = closed ? "Closed today (Sunday). Reopens Monday" : "Open today (Monday – Saturday)";
}

/* 2. Mobile Navigation Toggle */
function initNavigation() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;
  const close = () => {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a, button").forEach((item) => item.addEventListener("click", close));
  document.addEventListener("click", (e) => {
    if (!links.contains(e.target) && !toggle.contains(e.target)) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* 3. Updatable Then & Now Showcase + Interactive Comparison Slider */
function initProjectsShowcase() {
  if (typeof WORKSHOP_PROJECTS === "undefined" || !WORKSHOP_PROJECTS.length) return;

  const listContainer = document.getElementById("project-tabs");
  const switcherContainer = document.getElementById("viewer-vehicle-switcher");
  const badgeEl = document.getElementById("project-badge");
  const titleEl = document.getElementById("project-title");
  const summaryEl = document.getElementById("project-summary");
  const thenImg = document.getElementById("ba-then-img");
  const nowImg = document.getElementById("ba-now-img");
  const thenLabel = document.getElementById("ba-then-label");
  const nowLabel = document.getElementById("ba-now-label");
  const stagesGrid = document.getElementById("stages-grid");
  const thenCard = document.getElementById("view-then-card");
  const nowCard = document.getElementById("view-now-card");

  let activeProject = WORKSHOP_PROJECTS[0];

  function selectVehicle(project, shouldScrollPanel = false) {
    activeProject = project;
    const _s = document.getElementById("ba-slider");
    if (_s) {
      _s.classList.add("is-swapping");
      _s.style.setProperty("--pos", "50%");
      const _r = _s.querySelector(".ba-range");
      if (_r) _r.value = 50;
      setTimeout(() => _s.classList.remove("is-swapping"), 220);
    }
    if (badgeEl) badgeEl.textContent = project.badge;
    if (titleEl) titleEl.textContent = project.vehicle;
    if (summaryEl) summaryEl.textContent = project.summary;

    if (thenImg) {
      thenImg.src = project.thenImage;
      thenImg.alt = `${project.vehicle} — Then: ${project.thenLabel}`;
    }
    if (nowImg) {
      nowImg.src = project.nowImage;
      nowImg.alt = `${project.vehicle} — Now: ${project.nowLabel}`;
    }
    if (thenLabel) thenLabel.textContent = project.thenLabel;
    if (nowLabel) nowLabel.textContent = project.nowLabel;

    if (thenCard) {
      thenCard.onclick = () =>
        openLightbox({
          img: project.thenImage,
          badge: `${project.vehicle} • THEN`,
          title: project.thenLabel,
          desc: project.summary,
          servicePreset: "Panel Beating & Painting"
        });
    }

    if (nowCard) {
      nowCard.onclick = () =>
        openLightbox({
          img: project.nowImage,
          badge: `${project.vehicle} • NOW`,
          title: project.nowLabel,
          desc: project.summary,
          servicePreset: "Panel Beating & Painting"
        });
    }

    document.querySelectorAll("[data-project-id]").forEach((btn) => {
      const isSelected = btn.getAttribute("data-project-id") === project.id;
      btn.classList.toggle("active", isSelected);
      if (btn.getAttribute("role") === "tab") {
        btn.setAttribute("aria-selected", String(isSelected));
      }
    });

    if (stagesGrid) {
      stagesGrid.innerHTML = "";
      project.stages.forEach((stage, stageIdx) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "stage-card";
        card.innerHTML = `
          <img src="${stage.img}" alt="${stage.title}" class="photo-enhanced" loading="lazy" />
          <div class="stage-card-body">
            <strong>${stage.title}</strong>
            <span>${stage.desc}</span>
          </div>
        `;
        card.addEventListener("click", () => {
          openLightbox({
            gallery: project.stages.map((s) => ({
              img: s.img,
              badge: `${project.vehicle} • STAGE`,
              title: s.title,
              desc: s.desc,
              servicePreset: "Panel Beating & Painting"
            })),
            index: stageIdx
          });
        });
        stagesGrid.appendChild(card);
      });
    }

    if (shouldScrollPanel) {
      document.getElementById("car-viewer-panel")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  if (listContainer) {
    listContainer.innerHTML = "";
    WORKSHOP_PROJECTS.forEach((proj, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "vehicle-list-btn";
      btn.setAttribute("data-project-id", proj.id);
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", index === 0 ? "true" : "false");
      btn.innerHTML = `
        <span class="vehicle-btn-index">0${index + 1}</span>
        <span class="vehicle-btn-text">
          <strong>${proj.vehicle}</strong>
          <small>${proj.stages.length} photos • Click to view showcase</small>
        </span>
      `;
      btn.addEventListener("click", () => selectVehicle(proj, false));
      listContainer.appendChild(btn);
    });
  }

  if (switcherContainer) {
    switcherContainer.innerHTML = "";
    WORKSHOP_PROJECTS.forEach((proj) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "viewer-switch-chip";
      chip.setAttribute("data-project-id", proj.id);
      chip.textContent = proj.vehicle;
      chip.addEventListener("click", () => selectVehicle(proj, true));
      switcherContainer.appendChild(chip);
    });
  }

  selectVehicle(activeProject, false);
}

/* 4. Pop-Up Modals (Lightbox, Service Details & Quote Form) */
const SERVICE_DETAILS = {
  panel: {
    badge: "BODYSHOP & PAINTWORK",
    title: "Panel Beating & Painting",
    intro:
      "We restore dented, scuffed, or weathered panels with thorough surface preparation before applying any paint.",
    items: [
      "Dent removal, panel straightening & gap alignment",
      "Sanding, filler leveling & rust/bare-metal treatment",
      "Careful masking of glass, trims & wheels prior to spraying",
      "Spot and panel painting for scratches, scuffs and faded paint",
      "Full-body resprays, bumper refinishing & gloss-black rim restoration"
    ],
    note: "Bring your vehicle to our Lilongwe workshop Monday–Saturday for an in-person bodywork assessment.",
    preset: "Panel Beating & Painting"
  },
  engine: {
    badge: "MECHANICAL & DIAGNOSTICS",
    title: "Engine Services & Maintenance",
    intro:
      "Practical engine maintenance and fault troubleshooting to keep your vehicle reliable on Lilongwe roads.",
    items: [
      "Routine: Engine oil and filter changes",
      "Routine: Engine checks and fault diagnosis",
      "Routine: Cooling-system checks and overheating repairs",
      "Routine: Spark plug replacement and basic tune-ups",
      "Routine: Engine leak checks and minor repairs",
      "Major (Confirm Availability): Timing-belt replacement, fuel-system repairs & engine overhauls"
    ],
    note: "Please contact us to confirm availability and scheduling before bringing a vehicle in for timing-belt replacement, fuel-system repairs, or full engine overhauls.",
    preset: "Engine Service / Diagnostics"
  },
  electrical: {
    badge: "AUTO ELECTRICAL",
    title: "Auto Electrical Repairs",
    intro: "Fault finding and repair of your vehicle's electrical system so it starts, charges and lights up reliably.",
    items: [
      "Battery testing, charging checks & replacement",
      "Alternator and starter motor checks & replacement",
      "Wiring faults, fuses, relays & connectors",
      "Headlamp, indicator & lighting repairs",
      "Warning-light and electrical fault diagnosis"
    ],
    note: "Tell us the symptoms when you book, such as slow cranking, a flat battery or flickering lights, so we can prepare.",
    preset: "Auto Electrical Repairs"
  },
  welding: {
    badge: "WELDING & FABRICATION",
    title: "Welding & Fabrication",
    intro: "Strong, neat weld repairs for body, underbody and metal parts.",
    items: [
      "Panel and body weld repairs",
      "Rust cut-out and patch repairs",
      "Chassis, underbody and bracket repairs",
      "Exhaust and mounting repairs",
      "Custom metal fabrication for vehicle parts"
    ],
    note: "Send a photo of the damaged area on WhatsApp for a quicker estimate.",
    preset: "Welding & Fabrication"
  },
  towing: {
    badge: "RECOVERY & TRANSPORT",
    title: "Towing & Long-Distance Recovery",
    intro: "Towing within Lilongwe and recovery from further away when a vehicle cannot be driven safely.",
    items: [
      "Breakdown and non-runner towing",
      "Transport for collision, dent and panel-beating repairs",
      "Out-of-town and long-distance recovery",
      "Direct transfer to the mechanical, bodyshop, electrical or wash bay"
    ],
    note: "Share where the vehicle is, where it needs to go, its model and condition via Request Towing or WhatsApp. We confirm the details and price before moving it.",
    preset: "Vehicle Towing & Recovery"
  }
};

let lastFocus = null;
let lbGallery = [];
let lbIndex = 0;

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  lastFocus = document.activeElement;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const target = modal.querySelector(".quote-form:not([hidden]) input") || modal.querySelector(".modal-close");
  setTimeout(() => target && target.focus({ preventScroll: true }), 60);
}

function closeAllModals() {
  document.querySelectorAll(".modal-backdrop.is-open").forEach((m) => {
    m.classList.remove("is-open");
    m.setAttribute("aria-hidden", "true");
  });
  document.body.style.overflow = "";
  if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  lastFocus = null;
}

function showLightbox() {
  const item = lbGallery[lbIndex];
  if (!item) return;
  const img = document.getElementById("lb-img");
  img.style.opacity = 0;
  img.onload = () => (img.style.opacity = 1);
  img.src = item.img;
  img.alt = item.title;
  document.getElementById("lb-badge").textContent = item.badge;
  document.getElementById("lb-title").textContent = lbGallery.length > 1 ? `${item.title}  (${lbIndex + 1}/${lbGallery.length})` : item.title;
  document.getElementById("lb-desc").textContent = item.desc;
  document.getElementById("lb-prev").hidden = lbGallery.length < 2;
  document.getElementById("lb-next").hidden = lbGallery.length < 2;
  document.getElementById("lb-quote-btn").onclick = () => {
    closeAllModals();
    openQuoteModal(item.servicePreset || "Panel Beating & Painting");
  };
}

function stepLightbox(dir) {
  if (lbGallery.length < 2) return;
  lbIndex = (lbIndex + dir + lbGallery.length) % lbGallery.length;
  showLightbox();
}

function openLightbox(opts) {
  if (opts.gallery) {
    lbGallery = opts.gallery;
    lbIndex = opts.index || 0;
  } else {
    lbGallery = [opts];
    lbIndex = 0;
  }
  showLightbox();
  openModal("lightbox-modal");
}

function openQuoteModal(presetService) {
  const form = document.getElementById("quote-form");
  const successBox = document.getElementById("quote-success");
  const select = document.getElementById("qm-service-select");

  const _err = document.getElementById("qm-error");
  if (_err) _err.hidden = true;
  if (form) form.hidden = false;
  if (successBox) successBox.hidden = true;
  if (select && presetService) {
    const match = Array.from(select.options).find((opt) =>
      opt.value.toLowerCase().includes(presetService.toLowerCase())
    );
    if (match) select.value = match.value;
    select.dispatchEvent(new Event("change"));
  }

  openModal("quote-modal");
}

function initModals() {
  // Close triggers
  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", closeAllModals);
  });

  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeAllModals();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });

  // Quote triggers
  document.querySelectorAll("[data-open-quote]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openQuoteModal(btn.dataset.openQuote);
    });
  });

  // Service detail triggers
  document.querySelectorAll("[data-service-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const data = SERVICE_DETAILS[btn.dataset.serviceModal];
      if (!data) return;

      document.getElementById("sm-badge").textContent = data.badge;
      document.getElementById("sm-title").textContent = data.title;
      document.getElementById("sm-intro").textContent = data.intro;
      document.getElementById("sm-note").textContent = data.note;

      const listEl = document.getElementById("sm-list");
      listEl.innerHTML = data.items.map((item) => `<li>${item}</li>`).join("");

      document.getElementById("sm-quote-btn").onclick = () => {
        closeAllModals();
        openQuoteModal(data.preset);
      };

      openModal("service-modal");
    });
  });

  // Car Wash Bay Lightbox Trigger
  const carwashTrigger = document.getElementById("open-carwash-lightbox");
  if (carwashTrigger) {
    const triggerWash = () =>
      openLightbox({
        img: "images/carwash.jpg",
        badge: "COVERED CAR WASH BAYS",
        title: "Auto Care Motors Shaded Wash Canopies",
        desc: "Multi-bay shaded wash station keeping vehicles out of direct sun during hand washing, wheel cleaning, and post-paint rollout detailing.",
        servicePreset: "Car Wash & Detailing"
      });

    carwashTrigger.addEventListener("click", triggerWash);
    carwashTrigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerWash();
      }
    });
  }

  initQuoteForm();
}

/* 5. Scroll Reveal (below-the-fold content fades in; stays visible if JS or observer is unavailable) */
function initScrollReveal() {
  const items = Array.from(document.querySelectorAll(".reveal"));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  document.querySelectorAll(".services-grid, .engine-floor-grid, .team-grid").forEach((grid) => {
    Array.from(grid.children).forEach((el, i) => {
      if (!el.classList.contains("reveal")) return;
      el.style.transitionDelay = i * 80 + "ms";
      el.addEventListener("transitionend", () => (el.style.transitionDelay = ""), { once: true });
    });
  });
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("reveal-pending");
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );
  items.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      el.classList.add("is-visible");
    } else {
      el.classList.add("reveal-pending");
      observer.observe(el);
    }
  });
}



  const ENGINE_GALLERY_ITEMS = [
    {
      img: "images/services-suv-engine-bay-check.jpg",
      badge: "ENGINES & MECHANICS • BAY CHECK",
      title: "Under-Hood Engine Bay Inspection",
      desc: "Mechanic inspecting components directly inside the open engine bay under the shaded canopy.",
      servicePreset: "Engine Service / Diagnostics"
    },
    {
      img: "images/services-suv-underbody-service.jpg",
      badge: "ENGINES & MECHANICS • UNDERBODY & HOOD",
      title: "Lower Front & Engine Bay Work",
      desc: "Mechanic working beneath the front end on a creeper mat while upper engine bay inspection continues above.",
      servicePreset: "Engine Service / Diagnostics"
    },
    {
      img: "images/services-suv-engine-and-underbody.jpg",
      badge: "ENGINES & MECHANICS • DIAGNOSTICS & ACCESS",
      title: "Coordinated Upper & Underbody Service",
      desc: "Combined upper engine check and under-bumper access with the lower splash guard removed.",
      servicePreset: "Engine Service / Diagnostics"
    },
    {
      img: "images/services-suv-bay-engine-inspect.jpg",
      badge: "ENGINES & MECHANICS • SHADED BAY",
      title: "Covered Canopy Engine Maintenance",
      desc: "Side-bay view of ongoing engine maintenance and underbody work under the covered workshop roof.",
      servicePreset: "Engine Service / Diagnostics"
    }
  ];

  document.querySelectorAll("[data-engine-lightbox]").forEach((card) => {
    card.addEventListener("click", () => {
      const idx = Number(card.getAttribute("data-engine-lightbox"));
      const item = ENGINE_GALLERY_ITEMS[idx];
      if (item && typeof openLightbox === "function") {
        openLightbox({ gallery: ENGINE_GALLERY_ITEMS, index: idx });
      }
    });
  });


/* 6. Quote / booking form (single form, validated, WhatsApp-ready) */
function initQuoteForm() {
  const form = document.getElementById("quote-form");
  if (!form) return;
  const success = document.getElementById("quote-success");
  const summaryText = document.getElementById("quote-summary-text");
  const copyBtn = document.getElementById("copy-quote-btn");
  const waLink = document.getElementById("send-whatsapp-link");
  const dateEl = document.getElementById("qm-date");
  const sel = document.getElementById("qm-service-select");
  const tow = document.getElementById("qm-tow-wrap");
  const syncTow = () => { tow.hidden = sel.value !== "Vehicle Towing & Recovery"; };
  sel.addEventListener("change", syncTow);
  syncTow();
  const err = document.getElementById("qm-error");
  const pad = (n) => String(n).padStart(2, "0");
  const showErr = (msg, field) => {
    err.textContent = msg;
    err.hidden = false;
    if (field) field.focus();
  };
  const t = new Date();
  dateEl.min = `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;

  try {
    const saved = JSON.parse(localStorage.getItem("acm-customer") || "{}");
    ["customerName", "customerPhone", "vehicleModel"].forEach((k) => {
      if (saved[k]) form.elements[k].value = saved[k];
    });
  } catch {}

  dateEl.addEventListener("change", () => {
    if (!dateEl.value) return;
    if (new Date(dateEl.value + "T00:00").getDay() === 0) {
      dateEl.value = "";
      showErr("We are closed on Sundays. Please choose Monday to Saturday.", dateEl);
    } else {
      err.hidden = true;
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const get = (k) => String(fd.get(k) || "").trim();
    if (!get("customerName")) return showErr("Please enter your name.", form.elements.customerName);
    if (get("customerPhone").replace(/\D/g, "").length < 9) return showErr("Please enter a valid phone number.", form.elements.customerPhone);
    if (!get("vehicleModel")) return showErr("Please enter your vehicle make and model.", form.elements.vehicleModel);
    if (!tow.hidden && !get("towRoute")) return showErr("Please tell us where the vehicle is and where it should go.", form.elements.towRoute);
    if (!get("preferredDate") && tow.hidden) return showErr("Please choose a date (Monday to Saturday).", dateEl);
    err.hidden = true;

    const dateLabel = get("preferredDate")
      ? new Date(get("preferredDate") + "T00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
      : "As soon as possible";
    const summary = [
      "AUTO CARE MOTORS — WORKSHOP INQUIRY",
      `Name: ${get("customerName")}`,
      `Phone: ${get("customerPhone")}`,
      `Vehicle: ${get("vehicleModel")}`,
      `Service: ${get("serviceType")}`,
      ...(tow.hidden ? [] : [`Vehicle location and destination: ${get("towRoute")}`]),
      `Preferred date: ${dateLabel}`,
      `Preferred time: ${get("preferredSlot")}`,
      `Details: ${get("notes") || "N/A"}`
    ].join("\n");

    try {
      localStorage.setItem("acm-customer", JSON.stringify({
        customerName: get("customerName"), customerPhone: get("customerPhone"), vehicleModel: get("vehicleModel")
      }));
    } catch {}

    summaryText.textContent = summary;
    waLink.href = `https://wa.me/${get("whatsappLine") || "265999372469"}?text=${encodeURIComponent(summary)}`;
    form.hidden = true;
    success.hidden = false;
    copyBtn.onclick = async () => {
      try {
        await navigator.clipboard.writeText(summary);
        copyBtn.textContent = "Copied to Clipboard!";
      } catch {
        copyBtn.textContent = "Select & Copy Above";
      }
      setTimeout(() => (copyBtn.textContent = "Copy Summary"), 2200);
    };
  });
}

/* 7. Enhancements: nav state, compare slider, lightbox controls, email protection */
function initEnhancements() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // scroll progress, sticky navbar shadow, back-to-top
  const bar = document.getElementById("scroll-progress");
  const nav = document.querySelector(".navbar");
  const toTop = document.getElementById("to-top");
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    if (nav) nav.classList.toggle("is-scrolled", y > 10);
    if (toTop) toTop.classList.toggle("is-shown", y > 700);
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));

  // active nav link while scrolling
  if ("IntersectionObserver" in window) {
    const linkFor = (id) => document.querySelector(`.nav-links a[href="#${id}"]`);
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        document.querySelectorAll(".nav-links a.is-active").forEach((a) => a.classList.remove("is-active"));
        const a = linkFor(en.target.id);
        if (a) a.classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id], section[id]").forEach((s) => linkFor(s.id) && spy.observe(s));
  }

  // then/now compare slider + one-time hint
  const slider = document.getElementById("ba-slider");
  if (slider) {
    const range = slider.querySelector(".ba-range");
    range.addEventListener("input", () => {
      slider.style.setProperty("--pos", range.value + "%");
      slider.classList.add("is-touched");
    });
    ["pointerdown", "keydown"].forEach((ev) => slider.addEventListener(ev, () => slider.classList.add("is-touched")));
    if (!reduce && "IntersectionObserver" in window) {
      const hint = new IntersectionObserver(([en]) => {
        if (!en.isIntersecting) return;
        hint.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / 1800, 1);
          if (slider.classList.contains("is-touched")) return;
          const v = 50 + 24 * Math.sin(p * Math.PI * 2) * (1 - p);
          range.value = v;
          slider.style.setProperty("--pos", v + "%");
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, { threshold: 0.6 });
      hint.observe(slider);
    }
  }

  // lightbox: arrows, keyboard, swipe, and focus trap
  document.getElementById("lb-prev")?.addEventListener("click", () => stepLightbox(-1));
  document.getElementById("lb-next")?.addEventListener("click", () => stepLightbox(1));
  const wrap = document.querySelector(".lb-image-wrap");
  if (wrap) {
    let x0 = null;
    wrap.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
    wrap.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) stepLightbox(dx < 0 ? 1 : -1);
      x0 = null;
    });
  }
  document.addEventListener("keydown", (e) => {
    const open = document.querySelector(".modal-backdrop.is-open");
    if (!open) return;
    if (open.id === "lightbox-modal") {
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
    }
    if (e.key === "Tab") {
      const f = Array.from(open.querySelectorAll('a[href], button:not([disabled]), input, select, textarea')).filter((el) => !el.hidden && el.getClientRects().length);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // email address assembled in the browser (keeps it out of plain-text scrapers)
  const addr = ["francismkwamba71", "gmail.com"].join("@");
  document.querySelectorAll("[data-email]").forEach((el) => (el.textContent = addr));
  document.querySelectorAll("[data-email-link]").forEach((a) => (a.href = `mailto:${addr}?subject=Auto%20Care%20Motors%20Inquiry`));
}


/* 8. Wash-bay equipment photos + clickable products shelf */
function initKitCards() {
  document.querySelectorAll("[data-lb-img]").forEach((b) =>
    b.addEventListener("click", () =>
      openLightbox({
        img: b.dataset.lbImg,
        badge: b.dataset.lbBadge,
        title: b.dataset.lbTitle,
        desc: b.dataset.lbDesc,
        servicePreset: "Car Wash & Detailing"
      })
    )
  );
}

function initProductShelf() {
  const box = document.getElementById("shelf-photo");
  const list = document.getElementById("shelf-list");
  if (!box || !list || typeof WASH_PRODUCTS === "undefined") return;
  const items = [];
  const pins = [];
  const select = (i) => {
    items.forEach((el, k) => el.classList.toggle("is-active", k === i));
    pins.forEach((p) => p.el.classList.toggle("is-active", p.i === i));
  };
  WASH_PRODUCTS.forEach((p, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "shelf-item";
    b.innerHTML = `<span class="si-type">${p.type}</span><strong>${i + 1}. ${p.name}</strong><span class="si-sum">${p.summary}</span><span class="si-more">${p.use}</span>`;
    b.addEventListener("click", () => select(i));
    list.appendChild(b);
    items.push(b);
    p.pins.forEach(([x, y]) => {
      const pin = document.createElement("button");
      pin.type = "button";
      pin.className = "pin";
      pin.style.left = x + "%";
      pin.style.top = y + "%";
      pin.textContent = i + 1;
      pin.setAttribute("aria-label", `${p.name}: show details`);
      pin.addEventListener("click", () => {
        select(i);
        b.scrollIntoView({ block: "nearest", behavior: "smooth" });
      });
      box.appendChild(pin);
      pins.push({ el: pin, i });
    });
  });
  select(0);
}
