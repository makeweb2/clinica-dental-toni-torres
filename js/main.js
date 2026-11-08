/* ==========================================================================
   Clínica Dental Toñi Torres · interacción y animaciones (GSAP)
   ========================================================================== */
(() => {
  "use strict";

  const CLINIC = {
    whatsapp: "34614226860",
    phone: "+34865554478",
    // Horario publicado: lunes a viernes 9:00–13:00 y 16:00–20:00
    slots: {
      "Mañana": ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"],
      "Tarde": ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"],
    },
    bookingWindowDays: 60,
  };

  const TREATMENTS = [
    "Primera visita / revisión",
    "Limpieza dental",
    "Implantes dentales",
    "Ortodoncia invisible",
    "Ortodoncia con brackets",
    "Blanqueamiento dental",
    "Periodoncia (encías)",
    "Cirugía oral",
    "Armonización orofacial",
    "Odontopediatría (niños)",
    "Endodoncia / reconstrucción",
    "Urgencia dental",
  ];

  // Reseñas reales de Google Maps (4,8★ · 71 reseñas). Algunos textos se han acortado.
  const REVIEWS = [
    { n: "Rocio Cutillas", d: "Hace 3 semanas", tag: "Ortodoncia invisible", t: "Mi hija ha llevado el tratamiento fenomenal, sin heridas ni complicaciones, y el cambio en su sonrisa ha sido increíble. La confianza y la tranquilidad que nos transmiten son fundamentales. ¡Estamos encantadas con el resultado!" },
    { n: "Pedro J. Escalante", d: "Hace 11 meses", tag: "Implantes", t: "En mi vida me hubiese imaginado que una extracción e implante iban a ser tan limpias, rápidas e indoloras. Menos de 24 horas después ya estaba haciendo vida totalmente normal. Recomendable 100%." },
    { n: "Claudia Ferrández", d: "Hace 6 meses", tag: "Trato", t: "Encantadísima con Toñi y todo su equipo, te hacen sentir súper cómoda, se preocupan mucho por tu salud bucal y además te lo explican todo muy bien. No cambio esta clínica por ninguna otra 🩷" },
    { n: "Amparo Sánchez", d: "Hace 3 meses", tag: "Miedo al dentista", t: "Soy una persona con mucho miedo al dentista y ansiedad, y desde el primer día me han transmitido mucha tranquilidad y mucha humanidad. Gracias por crear un espacio donde se respira calma." },
    { n: "Inma Pérez Martínez", d: "Hace un mes", tag: "Familias", t: "Vamos toda la familia. Mis hijos llevan los dos ortodoncia invisible y es muy cómoda para ellos. El personal es muy atento y mis hijos van encantados." },
    { n: "Jessica Oltra", d: "Hace 2 semanas", tag: "Niños", t: "Profesionales impecables, trato especial con niños. Mi hija tenía pánico y ahora va hasta sola. Las mejores sin duda." },
    { n: "Antonia Fernández", d: "Hace 4 meses", tag: "Ortodoncia y cirugía", t: "Con gran profesionalidad ha resuelto el problema que teníamos con el aparato y hemos iniciado la ortodoncia invisible. La cirugía de la muela del juicio ha quedado impecable. Su gran calidad humana es lo que más destaco." },
    { n: "Sandra Hernández Aliaga", d: "Hace un mes", tag: "Ortodoncia invisible", t: "He llevado ortodoncia invisible, terminé mi tratamiento y ahora puedo sonreír sin tener complejo. ¡Tanto Toñi como todos los doctores son increíbles! Gracias ❤️" },
    { n: "Maria Rabasco Mora", d: "Hace 10 meses", tag: "Ortodoncia infantil", t: "Tras sólo un año y medio de llevar la ortodoncia invisible, mi niña tiene la boca perfecta. Mi pequeña de 5 años se siente como en casa y no tiene nada de miedo. 100% recomendable." },
    { n: "Azucena Coronado Gómez", d: "Hace un año", tag: "Instalaciones", t: "Tienen un trato muy agradable y están en todos los detalles. Hasta tienen la sala de espera adaptada para que los niños jueguen y pinten. Además, cumplen con los horarios." },
    { n: "Esther Abad Martínez", d: "Hace 2 años", tag: "Urgencias", t: "Tuve una urgencia muy dolorosa y sin dudarlo Toñi me atendió enseguida. Parecerá exagerado, pero me devolvisteis la vida. Recomiendo esta clínica 100x100." },
    { n: "Carolina Lidon Alacid", d: "Hace un año", tag: "Coronas", t: "Encantada con el equipo de Toñi Torres. Me han dejado la muela con la reconstrucción y corona súper natural, parece mía. Las recomiendo, gran equipo." },
    { n: "Natalia Punzano", d: "Hace 2 años", tag: "Niños", t: "Desde el primer momento fueron al ritmo y necesidades de mi hijo y le explicaban muy claramente lo que le iban a hacer. Las instalaciones son cómodas y todo está muy limpio. Muy recomendable." },
    { n: "Manoloymayte Dacostarabasco", d: "Hace un año", tag: "Implantes", t: "Para toda la gente que tiene respeto a hacerse un implante: estoy muy contenta con el proceso. Son súper atentos, te cuidan y miman al máximo y no duele nada." },
  ];

  const CASES = [
    { title: "Estética dental", sub: "Rehabilitación del sector anterior", before: "assets/img/ba1-antes.jpg", after: "assets/img/ba1-despues.jpg" },
    { title: "Blanqueamiento", sub: "Sonrisa varios tonos más clara", before: "assets/img/ba2-antes.jpg", after: "assets/img/ba2-despues.jpg" },
    { title: "Reposición de diente", sub: "Recuperamos la pieza perdida", before: "assets/img/ba3-antes.jpg", after: "assets/img/ba3-despues.jpg" },
  ];

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const hasGSAP = typeof window.gsap !== "undefined";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!hasGSAP) document.documentElement.classList.remove("js");
  if (hasGSAP) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    gsap.defaults({ ease: "power3.out", duration: 0.9 });
  }

  $("#year").textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------------
     Datos dinámicos: tratamientos y reseñas
     ------------------------------------------------------------------------ */
  const qbSelect = $('#quickbook select[name="treatment"]');
  const chipsWrap = $("#treatmentChips");
  TREATMENTS.forEach((t, i) => {
    qbSelect.insertAdjacentHTML("beforeend", `<option>${t}</option>`);
    chipsWrap.insertAdjacentHTML(
      "beforeend",
      `<div class="chip"><input type="radio" name="treatment" id="tr${i}" value="${t}"><label for="tr${i}"><span class="chip__dot"></span>${t}</label></div>`
    );
  });
  qbSelect.addEventListener("change", () => qbSelect.classList.toggle("has-value", !!qbSelect.value));

  const avatarColors = ["avatar--pink", "avatar--mint", "avatar--sky"];
  const gIcon = `<svg class="review__g" viewBox="0 0 48 48" aria-label="Google"><path fill="#FFC107" stroke="none" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" stroke="none" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" stroke="none" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" stroke="none" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>`;
  const reviewHTML = (r, i) => `
    <article class="review">
      <div class="review__top">
        <span class="avatar ${avatarColors[i % 3]}">${r.n.charAt(0)}</span>
        <span><b>${r.n}</b><small>${r.d}</small></span>
        ${gIcon}
      </div>
      <span class="stars" aria-label="5 estrellas">★★★★★</span>
      <p>${r.t}</p>
      <span class="review__tag">${r.tag}</span>
    </article>`;
  const half = Math.ceil(REVIEWS.length / 2);
  $("#reviewsRowA").innerHTML = REVIEWS.slice(0, half).map(reviewHTML).join("");
  $("#reviewsRowB").innerHTML = REVIEWS.slice(half).map((r, i) => reviewHTML(r, i + 1)).join("");

  /* ------------------------------------------------------------------------
     Navegación
     ------------------------------------------------------------------------ */
  const nav = $("#nav");
  const navLinks = $$(".nav__links a");
  const indicator = $(".nav__indicator");
  const navOffset = () => $(".nav__sign").offsetHeight + 10;

  const moveIndicator = (link) => {
    if (!link || !indicator) return;
    const w = link.offsetWidth - 28;
    const x = link.offsetLeft + 14;
    if (hasGSAP) gsap.to(indicator, { x, width: w, duration: 0.6, ease: "expo.out" });
    else Object.assign(indicator.style, { transform: `translateX(${x}px)`, width: `${w}px` });
  };
  const setActive = (id) => {
    navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
    moveIndicator(navLinks.find((a) => a.classList.contains("is-active")));
  };
  window.addEventListener("load", () => moveIndicator($(".nav__links a.is-active")));
  window.addEventListener("resize", () => moveIndicator($(".nav__links a.is-active")));
  navLinks.forEach((a) => {
    a.addEventListener("mouseenter", () => moveIndicator(a));
    a.addEventListener("mouseleave", () => moveIndicator($(".nav__links a.is-active")));
  });

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Desplazamiento suave a anclas
  const scrollToTarget = (target) => {
    if (!target) return;
    if (hasGSAP && !reduceMotion) {
      gsap.to(window, { duration: 1.1, ease: "power3.inOut", scrollTo: { y: target, offsetY: navOffset() } });
    } else {
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navOffset() });
    }
  };
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      if (menuOpen) toggleMenu(false);
      scrollToTarget(target);
    });
  });

  // Menú móvil
  const burger = $(".nav__burger");
  const menu = $("#mobileMenu");
  let menuOpen = false;
  const toggleMenu = (open = !menuOpen) => {
    menuOpen = open;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
    if (hasGSAP) {
      if (open) {
        gsap.set(menu, { visibility: "visible" });
        gsap.to(menu, { clipPath: "circle(150% at calc(100% - 40px) 40px)", duration: 0.8, ease: "expo.inOut" });
        gsap.fromTo($$("nav a, .mobile-menu__foot > *", menu), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, delay: 0.25 });
      } else {
        gsap.to(menu, { clipPath: "circle(0% at calc(100% - 40px) 40px)", duration: 0.6, ease: "expo.inOut", onComplete: () => gsap.set(menu, { visibility: "hidden" }) });
      }
    } else {
      menu.style.visibility = open ? "visible" : "hidden";
      menu.style.clipPath = open ? "none" : "";
    }
  };
  burger.addEventListener("click", () => toggleMenu());
  document.addEventListener("keydown", (e) => e.key === "Escape" && menuOpen && toggleMenu(false));

  /* ------------------------------------------------------------------------
     Micro-interacciones: botones magnéticos, brillo y tarjetas con inclinación
     ------------------------------------------------------------------------ */
  $$(".btn").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty("--mx", `${e.clientX - r.left}px`);
      btn.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  if (hasGSAP && finePointer && !reduceMotion) {
    $$(".magnetic").forEach((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - r.left - r.width / 2;
        const dy = e.clientY - r.top - r.height / 2;
        if (Math.abs(dx) > r.width / 2 + 8 || Math.abs(dy) > r.height / 2 + 8) { xTo(0); yTo(0); return; }
        xTo(gsap.utils.clamp(-10, 10, dx * 0.25));
        yTo(gsap.utils.clamp(-8, 8, dy * 0.35));
      });
      el.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
      window.addEventListener("scroll", () => { xTo(0); yTo(0); }, { passive: true });
    });

    $$("[data-tilt]").forEach((card) => {
      const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3" });
      const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3" });
      gsap.set(card, { transformPerspective: 900 });
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry(px * 8);
        rx(-py * 8);
      });
      card.addEventListener("pointerleave", () => { rx(0); ry(0); });
    });
  }

  /* ------------------------------------------------------------------------
     Animaciones GSAP
     ------------------------------------------------------------------------ */
  if (hasGSAP && !reduceMotion) {
    // Entrada: el toldo se despliega y el rótulo se "enciende"
    const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
    intro
      .from(".nav__sign", { yPercent: -100, duration: 0.9 })
      .from(".nav__rule", { scaleX: 0, duration: 1.2, stagger: 0.1 }, "-=0.5")
      .from(".nav__awning-fabric", { rotationX: -90, opacity: 0, duration: 1, ease: "back.out(1.6)" }, "-=1")
      .from(".nav__brand > *, .nav__links a, .nav__cta, .nav__burger", { yPercent: -60, opacity: 0, stagger: 0.04, duration: 0.7 }, "-=0.9")
      .from(".hero__card", { y: 40, opacity: 0, scale: 0.98, duration: 1.1 }, "-=0.8")
      .from(".hero__badge", { y: 20, opacity: 0, duration: 0.7 }, "-=0.6")
      .from(".hero__title .word", { yPercent: 110, rotate: 4, duration: 1.1, stagger: 0.07 }, "-=0.5")
      .fromTo(".underline path", { strokeDasharray: 320, strokeDashoffset: 320 }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, "-=0.5")
      .from(".hero__lead", { y: 20, opacity: 0, duration: 0.8 }, "-=1.1")
      .from(".hero__checks li", { y: 16, opacity: 0, stagger: 0.08, duration: 0.6 }, "-=0.8")
      .from(".tick", { scale: 0, stagger: 0.08, duration: 0.6, ease: "back.out(3)" }, "<")
      .from(".hero__actions .btn", { yPercent: 40, opacity: 0, stagger: 0.1, duration: 0.7 }, "-=0.6")
      .from(".hero__orb", { scale: 0.6, opacity: 0, duration: 1.6 }, 0.9)
      .from(".hero__logo", { y: -20, opacity: 0, duration: 1.2 }, 1.3)
      .from(".hero__tooth", { y: 80, opacity: 0, duration: 1.4 }, 1.2)
      .from(".blob", { scale: 0, opacity: 0, stagger: 0.12, duration: 1, ease: "back.out(2)" }, 1.5)
      .from(".sparkle", { scale: 0, rotate: -90, opacity: 0, stagger: 0.12, duration: 0.8, ease: "back.out(3)" }, 1.7)
      .from(".rating-card", { x: 40, opacity: 0, duration: 1 }, 1.8)
      .from(".rating-card .stars", { clipPath: "inset(0 100% 0 0)", duration: 0.9, ease: "power2.inOut" }, 2.1)
      .from(".quickbook", { y: 50, opacity: 0, duration: 1 }, 1.6)
      .from(".quickbook > *", { y: 16, opacity: 0, stagger: 0.07, duration: 0.6 }, 1.9);

    // Movimiento continuo en el visual del hero
    gsap.to(".hero__tooth", { y: -14, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to(".blob--pink", { y: 16, x: -8, rotate: 12, duration: 4.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to(".blob--mint-sm", { y: -18, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to(".blob--mint", { scale: 1.2, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to(".hero__ring--3", { rotate: 360, duration: 60, ease: "none", repeat: -1 });
    gsap.to(".rating-card", { y: -8, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.8 });
    $$(".sparkle").forEach((s, i) => {
      gsap.to(s, { scale: 0.6, opacity: 0.4, rotate: 45, duration: 1.4 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.4 + i * 0.3 });
    });

    // Parallax con el ratón en el visual
    if (finePointer) {
      const visual = $(".hero__visual");
      const layers = [
        [".hero__logo", 10], [".hero__tooth", 18], [".blob--pink", 30], [".blob--mint-sm", 26], [".rating-card", -14], [".hero__orb", 6],
      ].map(([sel, depth]) => ({ el: $(sel), depth, xTo: gsap.quickTo(sel, "x", { duration: 1, ease: "power3" }) }));
      $(".hero__card").addEventListener("pointermove", (e) => {
        const r = visual.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        layers.forEach((l) => l.xTo(px * l.depth));
      });
    }

    // Parallax al hacer scroll en el hero
    gsap.to(".hero__visual", {
      yPercent: 8, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });

    // Aparición de elementos
    ScrollTrigger.batch(".reveal", {
      start: "top 88%",
      once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, stagger: 0.09, duration: 1, overwrite: true }),
    });

    // Cinta en bucle infinito que acelera con el scroll
    const ribbon = $(".ribbon__track");
    ribbon.innerHTML += ribbon.innerHTML;
    const ribbonTween = gsap.to(ribbon, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
    ScrollTrigger.create({
      onUpdate: (self) => {
        const v = Math.min(Math.abs(self.getVelocity()) / 600, 4);
        gsap.to(ribbonTween, { timeScale: (self.direction === -1 ? -1 : 1) * (1 + v), duration: 0.3, overwrite: true });
        gsap.to(ribbonTween, { timeScale: self.direction === -1 ? -1 : 1, duration: 1.2, delay: 0.3 });
      },
    });

    // La clínica
    gsap.fromTo(".about__photo img", { yPercent: -10 }, {
      yPercent: 0, ease: "none",
      scrollTrigger: { trigger: ".about__photo", start: "top bottom", end: "bottom top", scrub: true },
    });
    gsap.from(".about__photo", {
      clipPath: "inset(12% 12% 12% 12% round 28px)", duration: 1.6, ease: "expo.out",
      scrollTrigger: { trigger: ".about__photo", start: "top 80%" },
    });
    gsap.from(".about__stamp", { scale: 0, rotate: -120, duration: 1.4, ease: "back.out(1.6)", scrollTrigger: { trigger: ".about__media", start: "top 60%" } });
    gsap.to(".about__stamp-text", { rotate: 360, duration: 22, ease: "none", repeat: -1, transformOrigin: "50% 50%" });

    // Tarjetas de servicios
    gsap.from(".service-card", {
      y: 70, opacity: 0, duration: 1.1, stagger: { each: 0.1, from: "start" },
      scrollTrigger: { trigger: ".services__grid", start: "top 82%" },
    });
    gsap.from(".service-card__media img", {
      scale: 1.3, duration: 1.6, ease: "expo.out", stagger: 0.1,
      scrollTrigger: { trigger: ".services__grid", start: "top 82%" },
    });
    gsap.from(".more-list li", {
      x: -20, opacity: 0, stagger: 0.07, duration: 0.7,
      scrollTrigger: { trigger: ".service-card--more", start: "top 80%" },
    });
    gsap.from(".sources li", {
      scale: 0.6, opacity: 0, stagger: 0.03, duration: 0.5, ease: "back.out(2)",
      scrollTrigger: { trigger: ".services__grid", start: "top 70%" },
    });

    // Reseñas
    gsap.from(".featured-review__mark", { y: 80, opacity: 0, rotate: -20, duration: 1.4, scrollTrigger: { trigger: ".featured-review", start: "top 80%" } });

    // Cita
    gsap.from(".booking__grid", { y: 60, opacity: 0, duration: 1.2, scrollTrigger: { trigger: ".booking", start: "top 75%" } });
    gsap.from(".booking__aside > *", { y: 24, opacity: 0, stagger: 0.08, duration: 0.8, scrollTrigger: { trigger: ".booking", start: "top 65%" } });
    gsap.from(".chip", { y: 18, opacity: 0, stagger: 0.03, duration: 0.6, scrollTrigger: { trigger: ".booker", start: "top 70%" } });

    // Contacto y pie
    gsap.from(".contact__map", { clipPath: "inset(0 0 100% 0 round 28px)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: ".contact", start: "top 70%" } });
    gsap.from(".footer__inner > *", { y: 30, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: ".footer", start: "top 90%" } });
    gsap.from(".footer .nav__rule", { scaleX: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".footer", start: "top 95%" } });
  }

  // Sección activa en la navegación
  if (hasGSAP) {
    ["inicio", "clinica", "servicios", "resultados", "resenas", "contacto"].forEach((id) => {
      ScrollTrigger.create({
        trigger: `#${id}`, start: "top 45%", end: "bottom 45%",
        onToggle: (self) => self.isActive && setActive(id),
      });
    });
  }

  /* ------------------------------------------------------------------------
     Contadores
     ------------------------------------------------------------------------ */
  $$(".count").forEach((el) => {
    const to = parseFloat(el.dataset.to);
    const dec = parseInt(el.dataset.decimals || "0", 10);
    const fmt = (v) => v.toFixed(dec).replace(".", ",");
    if (!hasGSAP || reduceMotion) { el.textContent = fmt(to); return; }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: to, duration: 2, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => (el.textContent = fmt(obj.v)),
    });
  });

  /* ------------------------------------------------------------------------
     Antes y después
     ------------------------------------------------------------------------ */
  const compare = $("#compare");
  const range = $(".compare__range", compare);
  const imgAfter = $(".compare__img--after", compare);
  const imgBefore = $(".compare__before img", compare);
  const tagBefore = $(".compare__tag--before", compare);
  const tagAfter = $(".compare__tag--after", compare);
  const hint = $(".compare__hint", compare);
  const caption = $("#caseCaption");
  const caseBtns = $$(".case");
  const pos = { v: 50 };

  const setPos = (v) => {
    pos.v = v;
    compare.style.setProperty("--pos", `${v}%`);
    range.value = v;
    tagBefore.style.opacity = v < 14 ? 0 : 1;
    tagAfter.style.opacity = v > 86 ? 0 : 1;
  };
  const sweep = () => {
    if (!hasGSAP || reduceMotion) return setPos(50);
    gsap.timeline()
      .to(pos, { v: 88, duration: 0.9, ease: "power2.inOut", onUpdate: () => setPos(pos.v) })
      .to(pos, { v: 14, duration: 1.2, ease: "power2.inOut", onUpdate: () => setPos(pos.v) })
      .to(pos, { v: 50, duration: 0.9, ease: "power3.out", onUpdate: () => setPos(pos.v) });
  };

  let interacted = false;
  const stopAuto = () => {
    interacted = true;
    if (autoTween) autoTween.kill();
    caseBtns.forEach((b) => hasGSAP && gsap.set($(".case__bar", b), { scaleX: 0 }));
  };
  range.addEventListener("input", () => {
    if (hasGSAP) gsap.killTweensOf(pos);
    setPos(+range.value);
    if (hint) hint.style.opacity = 0;
    if (!interacted) stopAuto();
  });
  range.addEventListener("pointerdown", () => compare.classList.add("is-dragging"));
  window.addEventListener("pointerup", () => compare.classList.remove("is-dragging"));

  let current = 0;
  let autoTween = null;
  const showCase = (i, { fromUser = false } = {}) => {
    if (i === current && fromUser) return;
    current = i;
    const c = CASES[i];
    caseBtns.forEach((b, k) => {
      b.classList.toggle("is-active", k === i);
      b.setAttribute("aria-selected", String(k === i));
    });
    caption.textContent = `${c.title} · ${c.sub}`;
    const swap = () => { imgAfter.src = c.after; imgBefore.src = c.before; };
    if (hasGSAP && !reduceMotion) {
      gsap.timeline()
        .to([imgAfter, imgBefore], { opacity: 0, scale: 1.04, duration: 0.35, ease: "power2.in" })
        .add(swap)
        .to([imgAfter, imgBefore], { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" })
        .add(sweep, "-=0.3");
    } else swap();
    if (!interacted) runAuto();
  };
  const runAuto = () => {
    if (!hasGSAP || reduceMotion) return;
    if (autoTween) autoTween.kill();
    caseBtns.forEach((b) => gsap.set($(".case__bar", b), { scaleX: 0 }));
    autoTween = gsap.to($(".case__bar", caseBtns[current]), {
      scaleX: 1, duration: 8, ease: "none",
      onComplete: () => showCase((current + 1) % CASES.length),
    });
    autoTween.pause();
    if (resultsInView) autoTween.play();
  };
  caseBtns.forEach((b, i) => b.addEventListener("click", () => { stopAuto(); showCase(i, { fromUser: true }); }));
  // Precargar imágenes de todos los casos
  CASES.forEach((c) => { new Image().src = c.before; new Image().src = c.after; });

  let resultsInView = false;
  if (hasGSAP) {
    ScrollTrigger.create({
      trigger: compare, start: "top 70%", once: true, onEnter: () => { if (!reduceMotion) setPos(100); sweep(); },
    });
    ScrollTrigger.create({
      trigger: ".results", start: "top 60%", end: "bottom 30%",
      onToggle: (self) => {
        resultsInView = self.isActive;
        if (autoTween && !interacted) self.isActive ? autoTween.play() : autoTween.pause();
      },
    });
    if (!reduceMotion) {
      gsap.from(".case", { x: -40, opacity: 0, stagger: 0.12, duration: 0.9, scrollTrigger: { trigger: ".cases", start: "top 85%" } });
      gsap.from(".compare", { rotate: 2, scale: 0.92, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: compare, start: "top 85%" } });
    }
    runAuto();
  }

  /* ------------------------------------------------------------------------
     Carrusel de reseñas (bucle infinito, se pausa al pasar el ratón)
     ------------------------------------------------------------------------ */
  $$(".marquee").forEach((m) => {
    const track = $(".marquee__track", m);
    track.innerHTML += track.innerHTML;
    $$(".review", track).slice(track.children.length / 2).forEach((r) => r.setAttribute("aria-hidden", "true"));
    if (!hasGSAP || reduceMotion) { m.style.overflowX = "auto"; return; }
    const dir = +m.dataset.direction;
    const tween = gsap.fromTo(track, { xPercent: dir < 0 ? 0 : -50 }, { xPercent: dir < 0 ? -50 : 0, duration: 70, ease: "none", repeat: -1 });
    m.addEventListener("mouseenter", () => gsap.to(tween, { timeScale: 0, duration: 0.6 }));
    m.addEventListener("mouseleave", () => gsap.to(tween, { timeScale: 1, duration: 0.6 }));
    gsap.from(m, { opacity: 0, x: dir * 120, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: m, start: "top 92%" } });
  });

  /* ------------------------------------------------------------------------
     Sistema de citas → WhatsApp / teléfono de la clínica
     ------------------------------------------------------------------------ */
  const form = $("#bookingForm");
  const steps = $$(".step", form);
  const stepLabels = $$(".booker__steps li");
  const progress = $(".booker__progress span");
  const prevBtn = $("#prevStep");
  const nextBtn = $("#nextStep");
  const errorEl = $(".booker__error");
  const sum = (k) => $(`[data-sum="${k}"]`);

  const state = { step: 0, treatment: "", date: null, time: "" };
  const fmtDate = (d) => d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
  const fmtDateLong = (d) => d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today); maxDate.setDate(maxDate.getDate() + CLINIC.bookingWindowDays);
  let viewMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const isPastSlot = (date, time) => {
    const [h, m] = time.split(":").map(Number);
    const d = new Date(date); d.setHours(h, m, 0, 0);
    return d.getTime() < Date.now() + 60 * 60 * 1000; // al menos 1 h de margen
  };
  const dayHasSlots = (date) => Object.values(CLINIC.slots).flat().some((t) => !isPastSlot(date, t));

  const renderCalendar = () => {
    const cal = $("#calendar");
    const title = viewMonth.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
    $(".calendar__title", cal).textContent = title.charAt(0).toUpperCase() + title.slice(1);
    const days = $(".calendar__days", cal);
    const first = new Date(viewMonth);
    const offset = (first.getDay() + 6) % 7; // lunes = 0
    const total = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    let html = "";
    for (let i = 0; i < offset; i++) html += "<span></span>";
    for (let d = 1; d <= total; d++) {
      const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d);
      const weekend = date.getDay() === 0 || date.getDay() === 6;
      const disabled = weekend || date < today || date > maxDate || !dayHasSlots(date);
      const sel = state.date && date.getTime() === state.date.getTime();
      const isToday = date.getTime() === today.getTime();
      html += `<button type="button" class="day${sel ? " is-selected" : ""}${isToday ? " is-today" : ""}" data-d="${d}" ${disabled ? "disabled" : ""} aria-label="${fmtDate(date)}${disabled ? " (no disponible)" : ""}">${d}</button>`;
    }
    days.innerHTML = html;
    const [prev, next] = $$(".calendar__nav", cal);
    prev.disabled = viewMonth <= new Date(today.getFullYear(), today.getMonth(), 1);
    next.disabled = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1) > maxDate;
    if (hasGSAP && !reduceMotion) gsap.from($$(".day", days), { scale: 0.6, opacity: 0, duration: 0.4, stagger: 0.008, ease: "back.out(2)" });
  };

  const renderSlots = () => {
    const wrap = $("#slots");
    if (!state.date) {
      wrap.innerHTML = '<p class="slots__empty">Selecciona un día para ver las horas disponibles.</p>';
      return;
    }
    wrap.innerHTML = Object.entries(CLINIC.slots).map(([label, times]) => `
      <div class="slots__group"><small>${label}</small><div class="slots__grid">
        ${times.map((t) => `<button type="button" class="slot${state.time === t ? " is-selected" : ""}" data-t="${t}" ${isPastSlot(state.date, t) ? "disabled" : ""}>${t}</button>`).join("")}
      </div></div>`).join("");
    if (hasGSAP && !reduceMotion) gsap.from($$(".slot", wrap), { y: 10, opacity: 0, stagger: 0.02, duration: 0.4 });
  };

  const updateSummary = () => {
    sum("treatment").textContent = state.treatment || "—";
    sum("date").textContent = state.date ? fmtDate(state.date) : "—";
    sum("time").textContent = state.time || "—";
    $$("#summary b").forEach((b) => b.textContent !== "—" && hasGSAP && !reduceMotion && gsap.fromTo(b, { y: 6, opacity: 0.2 }, { y: 0, opacity: 1, duration: 0.4, overwrite: true }));
  };

  $("#calendar").addEventListener("click", (e) => {
    const nav = e.target.closest(".calendar__nav");
    if (nav && !nav.disabled) {
      viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + +nav.dataset.dir, 1);
      renderCalendar();
      return;
    }
    const day = e.target.closest(".day");
    if (!day || day.disabled) return;
    state.date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), +day.dataset.d);
    if (state.time && isPastSlot(state.date, state.time)) state.time = "";
    $$(".day.is-selected").forEach((d) => d.classList.remove("is-selected"));
    day.classList.add("is-selected");
    if (hasGSAP && !reduceMotion) gsap.fromTo(day, { scale: 0.8 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
    renderSlots();
    updateSummary();
    errorEl.textContent = "";
  });

  $("#slots").addEventListener("click", (e) => {
    const slot = e.target.closest(".slot");
    if (!slot || slot.disabled) return;
    state.time = slot.dataset.t;
    $$(".slot.is-selected").forEach((s) => s.classList.remove("is-selected"));
    slot.classList.add("is-selected");
    if (hasGSAP && !reduceMotion) gsap.fromTo(slot, { scale: 0.9 }, { scale: 1, duration: 0.4, ease: "back.out(3)" });
    updateSummary();
    errorEl.textContent = "";
  });

  chipsWrap.addEventListener("change", (e) => {
    state.treatment = e.target.value;
    updateSummary();
    errorEl.textContent = "";
    if (hasGSAP && !reduceMotion) gsap.fromTo(e.target.nextElementSibling, { scale: 0.96 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
  });

  const validate = (step) => {
    if (step === 0 && !state.treatment) return "Elige un tratamiento para continuar.";
    if (step === 1 && !state.date) return "Selecciona un día.";
    if (step === 1 && !state.time) return "Selecciona una hora.";
    if (step === 2) {
      const name = form.elements.name;
      const phone = form.elements.phone;
      $$(".field", form).forEach((f) => f.classList.remove("is-invalid"));
      if (name.value.trim().length < 2) { name.closest(".field").classList.add("is-invalid"); name.focus(); return "Escribe tu nombre."; }
      if (phone.value.replace(/\D/g, "").length < 9) { phone.closest(".field").classList.add("is-invalid"); phone.focus(); return "Introduce un teléfono válido (9 dígitos)."; }
      if (!form.elements.privacy.checked) return "Necesitamos tu consentimiento para gestionar la cita.";
    }
    return "";
  };

  const goTo = (next) => {
    const from = steps[state.step];
    const to = steps[next];
    const dir = next > state.step ? 1 : -1;
    state.step = next;
    stepLabels.forEach((li, i) => {
      li.classList.toggle("is-current", i === Math.min(next, 2));
      li.classList.toggle("is-done", i < next);
    });
    const pct = next >= 3 ? 100 : ((next + 1) / 3) * 100;
    prevBtn.disabled = next === 0;
    nextBtn.firstChild.textContent = next === 2 ? "Enviar por WhatsApp " : "Continuar ";
    form.classList.toggle("is-done", next === 3);

    const swap = () => {
      from.classList.remove("is-active");
      to.classList.add("is-active");
    };
    if (hasGSAP && !reduceMotion) {
      gsap.to(progress, { width: `${pct}%`, duration: 0.8, ease: "expo.out" });
      gsap.timeline()
        .to(from, { x: -40 * dir, opacity: 0, duration: 0.3, ease: "power2.in" })
        .add(swap)
        .fromTo(to, { x: 40 * dir, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 });
      if (next === 3) {
        const c = $(".done-check circle", to), p = $(".done-check path", to);
        gsap.fromTo(c, { strokeDasharray: 230, strokeDashoffset: 230 }, { strokeDashoffset: 0, duration: 0.9, delay: 0.4, ease: "power2.inOut" });
        gsap.fromTo(p, { strokeDasharray: 60, strokeDashoffset: 60 }, { strokeDashoffset: 0, duration: 0.6, delay: 1.1, ease: "power2.out" });
        gsap.from($$("h3, p, .done-actions, #restart", to), { y: 16, opacity: 0, stagger: 0.08, delay: 0.6 });
      }
    } else {
      progress.style.width = `${pct}%`;
      swap();
    }
    if (next === 1) { renderCalendar(); renderSlots(); }
  };

  const buildMessage = () => {
    const f = form.elements;
    const lines = [
      "Hola, Clínica Dental Toñi Torres 👋",
      "Me gustaría solicitar una cita:",
      "",
      `• Tratamiento: ${state.treatment}`,
      `• Día: ${fmtDateLong(state.date)}`,
      `• Hora: ${state.time}`,
      `• Nombre: ${f.name.value.trim()}`,
      `• Teléfono: ${f.phone.value.trim()}`,
    ];
    if (f.email.value.trim()) lines.push(`• Email: ${f.email.value.trim()}`);
    lines.push(`• ${f.first.value}`);
    if (f.notes.value.trim()) lines.push(`• Comentarios: ${f.notes.value.trim()}`);
    lines.push("", "¡Gracias!");
    return lines.join("\n");
  };

  nextBtn.addEventListener("click", () => {
    const err = validate(state.step);
    errorEl.textContent = err;
    if (err) {
      if (hasGSAP && !reduceMotion) gsap.fromTo(errorEl, { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      return;
    }
    if (state.step < 2) return goTo(state.step + 1);
    const url = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(buildMessage())}`;
    $("#waAgain").href = url;
    window.open(url, "_blank", "noopener");
    goTo(3);
  });
  prevBtn.addEventListener("click", () => state.step > 0 && goTo(state.step - 1));
  form.addEventListener("submit", (e) => { e.preventDefault(); nextBtn.click(); });

  $("#restart").addEventListener("click", () => {
    form.reset();
    Object.assign(state, { treatment: "", date: null, time: "" });
    updateSummary();
    viewMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    goTo(0);
  });

  // Barra rápida del hero → precarga el formulario de cita
  $("#quickbook").addEventListener("submit", (e) => {
    e.preventDefault();
    const qb = e.currentTarget.elements;
    if (qb.email.value) form.elements.email.value = qb.email.value;
    if (qb.phone.value) form.elements.phone.value = qb.phone.value;
    if (qb.treatment.value) {
      const radio = $$('input[name="treatment"]', chipsWrap).find((r) => r.value === qb.treatment.value);
      if (radio) { radio.checked = true; state.treatment = radio.value; updateSummary(); }
      if (state.step === 0) goTo(1);
    }
    scrollToTarget($("#cita"));
  });

  if (hasGSAP) window.addEventListener("load", () => ScrollTrigger.refresh());
})();
