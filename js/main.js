document.addEventListener("DOMContentLoaded", () => {
  initPageLoader();
  initCursor();
  initNavbar();
  initNavbarScroll();
  initHeroParallax();
  initScramble();
  initParticles();
  initScrollSpy();
  initHabilidades();
  initProyectos();
  initExperiencia();
  initStats();
  initMagnetic();
  initRipple();
  initDrawer();
  initContactForm();
  initMobile();
  initResize();
});

// =========================================================
// PAGE LOADER
// =========================================================
function initPageLoader() {
  const loader = document.getElementById("page-loader");
  if (!loader) return;
  setTimeout(() => loader.classList.add("hidden"), 1100);
}

// =========================================================
// CUSTOM CURSOR — con requestAnimationFrame para evitar jank
// =========================================================
function initCursor() {
  const cursorDot  = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");
  if (!cursorDot || !cursorRing) return;

  let mouseX = 0, mouseY = 0, rafId;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.opacity  = "1";
    cursorRing.style.opacity = "0.7";

    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      cursorDot.style.left  = mouseX + "px";
      cursorDot.style.top   = mouseY + "px";
      cursorRing.style.left = mouseX + "px";
      cursorRing.style.top  = mouseY + "px";
    });
  });

  document.addEventListener("mouseleave", () => {
    cursorDot.style.opacity  = "0";
    cursorRing.style.opacity = "0";
  });

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => cursorRing.classList.add("expand"));
    el.addEventListener("mouseleave", () => cursorRing.classList.remove("expand"));
  });
}

// =========================================================
// NAVBAR — línea animada
// =========================================================
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  setTimeout(() => navbar.classList.add("animar-linea"), 400);
}

// =========================================================
// NAVBAR — glassmorphism al hacer scroll
// =========================================================
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// =========================================================
// PARALLAX CON MOUSE EN EL HERO
// =========================================================
function initHeroParallax() {
  const hero     = document.getElementById("hero");
  const heroGlow = document.getElementById("hero-glow");
  if (!hero || !heroGlow) return;

  const heroNombre = hero.querySelector(".nombre");
  const heroTitulo = hero.querySelector(".titulo-encima");
  const heroImg    = hero.querySelector(".hero-img-wrapper");

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const cx   = e.clientX - rect.left - rect.width  / 2;
    const cy   = e.clientY - rect.top  - rect.height / 2;

    heroGlow.style.left    = e.clientX - rect.left + "px";
    heroGlow.style.top     = e.clientY - rect.top  + "px";
    heroGlow.style.opacity = "1";

    if (heroNombre) heroNombre.style.transform = `translateY(-130%) translate(${cx * 0.025}px, ${cy * 0.025}px)`;
    if (heroTitulo) heroTitulo.style.transform = `translateY(40%)  translate(${cx * 0.04}px,  ${cy * 0.04}px)`;
    if (heroImg)    heroImg.style.transform    = `translate(${cx * 0.012}px, ${cy * 0.012}px)`;
  });

  hero.addEventListener("mouseleave", () => {
    heroGlow.style.opacity = "0";
    if (heroNombre) heroNombre.style.transform = "translateY(-130%)";
    if (heroTitulo) heroTitulo.style.transform = "translateY(40%)";
    if (heroImg)    heroImg.style.transform    = "none";
  });
}

// =========================================================
// SCRAMBLE EN TÍTULOS
// =========================================================
function initScramble() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&";

  document.querySelectorAll(".scramble-title").forEach((el) => {
    const original = el.dataset.text || el.textContent.trim();
    let interval;

    el.addEventListener("mouseenter", () => {
      let iter = 0;
      clearInterval(interval);
      interval = setInterval(() => {
        el.textContent = original
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iter) return original[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iter >= original.length) {
          clearInterval(interval);
          el.textContent = original;
        }
        iter += 0.5;
      }, 45);
    });
  });
}

// =========================================================
// TSPARTICLES — reducido en móvil para mejor performance
// =========================================================
function initParticles() {
  const isMobileDevice = window.innerWidth <= 767;
  const particleCount  = isMobileDevice ? 35 : 120;
  const linksEnabled   = !isMobileDevice;

  tsParticles.load("particles-hero", {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: !isMobileDevice, mode: "repulse" },
        resize: true,
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#b10f2e" },
      links: {
        color: "#b10f2e",
        distance: 150,
        enable: linksEnabled,
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        random: true,
        outModes: { default: "bounce" },
      },
      number: { value: particleCount, density: { enable: true } },
      opacity: { value: 0.35 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  });
}

// =========================================================
// SCROLLSPY + CERRAR MENÚ EN MÓVIL
// =========================================================
function initScrollSpy() {
  const sections  = document.querySelectorAll("section, div#hero");
  const navLinks  = document.querySelectorAll(".navbar-nav .nav-link");

  const highlightMenu = () => {
    let current = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 150) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", highlightMenu, { passive: true });
}

// =========================================================
// HABILIDADES (barras + botones intercambiables)
// =========================================================
function initHabilidades() {
  const habilidadesData = [
    { nombre: "HTML",       pct: 90, estado: "barra"  },
    { nombre: "CSS",        pct: 85, estado: "barra"  },
    { nombre: "Bootstrap",  pct: 90, estado: "barra"  },
    { nombre: "JavaScript", pct: 60, estado: "barra"  },
    { nombre: "GitHub",     pct: 80, estado: "barra"  },
    { nombre: "MySQL",      pct: 50, estado: "boton"  },
    { nombre: "Canva",      pct: 70, estado: "boton"  },
    { nombre: "WordPress",  pct: 40, estado: "boton"  },
    { nombre: "Trello",     pct: 90, estado: "boton"  },
    { nombre: "React",      pct: 30, estado: "boton"  },
    { nombre: "Figma",      pct: 75, estado: "boton"  },
    { nombre: "Git",        pct: 70, estado: "boton"  },
  ];

  const containerBotones = document.getElementById("contenedor-botones");
  const containerBarras  = document.getElementById("contenedor-barras");
  if (!containerBotones || !containerBarras) return;

  function crearElementoBarra(skill) {
    const div = document.createElement("div");
    div.classList.add("skill-item", "fade-in");
    div.id = `barra-${skill.nombre}`;
    div.innerHTML = `
      <div class="skill-info">
        <h3>${skill.nombre}</h3>
        <span class="porcentaje-texto">0%</span>
      </div>
      <div class="progress">
        <div class="progress-bar" style="width: 0%"></div>
      </div>`;
    setTimeout(() => {
      div.querySelector(".progress-bar").style.width = `${skill.pct}%`;
      animarNumero(div.querySelector(".porcentaje-texto"), skill.pct);
    }, 50);
    return div;
  }

  function crearElementoBoton(skill) {
    const btn = document.createElement("button");
    btn.classList.add("animar", "fade-in");
    btn.id = `btn-${skill.nombre}`;
    btn.innerText = skill.nombre;
    btn.addEventListener("click", () => intercambiarHabilidad(skill.nombre));
    return btn;
  }

  function inicializar() {
    containerBarras.innerHTML  = "";
    containerBotones.innerHTML = "";
    habilidadesData
      .filter((h) => h.estado === "barra")
      .forEach((skill) => containerBarras.appendChild(crearElementoBarra(skill)));
    habilidadesData
      .filter((h) => h.estado === "boton")
      .forEach((skill, index) => {
        const btn = crearElementoBoton(skill);
        btn.style.animationDelay = `${index * 0.1}s`;
        containerBotones.appendChild(btn);
      });
  }

  function intercambiarHabilidad(nombreSkillEntrante) {
    const btnClickeado     = document.getElementById(`btn-${nombreSkillEntrante}`);
    const barraSalienteDOM = containerBarras.firstElementChild;
    const dataEntrante     = habilidadesData.find((h) => h.nombre === nombreSkillEntrante);
    const nombreSaliente   = barraSalienteDOM?.id.replace("barra-", "");
    const dataSaliente     = habilidadesData.find((h) => h.nombre === nombreSaliente);

    if (!btnClickeado || !barraSalienteDOM) return;

    btnClickeado.classList.add("fade-out");
    barraSalienteDOM.classList.add("fade-out");

    setTimeout(() => {
      dataEntrante.estado = "barra";
      dataSaliente.estado = "boton";
      const index = habilidadesData.indexOf(dataEntrante);
      habilidadesData.push(habilidadesData.splice(index, 1)[0]);
      btnClickeado.remove();
      barraSalienteDOM.remove();
      containerBarras.appendChild(crearElementoBarra(dataEntrante));
      containerBotones.appendChild(crearElementoBoton(dataSaliente));
    }, 300);
  }

  function animarNumero(elemento, target) {
    let actual = 0;
    const incremento = Math.ceil(target / 100);
    const timer = setInterval(() => {
      actual += incremento;
      if (actual >= target) { actual = target; clearInterval(timer); }
      elemento.innerText = actual + "%";
    }, 20);
  }

  const sectionEl = document.getElementById("habilidades");
  if (sectionEl) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { inicializar(); observer.disconnect(); }
    });
    observer.observe(sectionEl);
  }
}

// =========================================================
// PROYECTOS — datos compartidos con mobile (un solo fetch)
// =========================================================
let _proyectosCache = null;

function initProyectos() {
  const contenedor = document.getElementById("contenedor-proyectos");
  if (!contenedor) return;

  contenedor.innerHTML = `<div class="text-center py-5" style="color:#555;font-size:0.8rem;letter-spacing:2px;text-transform:uppercase">Cargando…</div>`;

  fetch("data/proyectos.json")
    .then((resp) => {
      if (!resp.ok) throw new Error("Error al cargar datos");
      return resp.json();
    })
    .then((data) => {
      _proyectosCache = data;
      renderizarGaleria(data, contenedor);
      if (isMobile()) setupProyectosMobile(data);
    })
    .catch((err) => {
      console.error("Error cargando proyectos:", err);
      contenedor.innerHTML = "<p style='color:#666;text-align:center;padding:3rem'>Error al cargar los proyectos.</p>";
    });
}

function renderizarGaleria(proyectosData, contenedor) {
  let html = "";
  proyectosData.forEach((proyecto, index) => {
    const numero = (index + 1).toString().padStart(2, "0");
    html += `
      <div class="row proyecto align-items-center g-0" data-aos="fade-up">
        <span class="numero-fondo">${numero}</span>
        <div class="col-lg-8 info">
          <div class="d-flex align-items-center">
            <span class="numero-proyecto-pequeno me-4">${numero}</span>
            <div class="titulo-detalles">
              <h3>${proyecto.titulo}</h3>
              <span class="texto"><p>${proyecto.categoria}</p></span>
            </div>
          </div>
        </div>
        <div class="col-lg-4 link text-end">
          <a href="${proyecto.link}" target="_blank" rel="noopener noreferrer">Ver Proyecto <i class="bi bi-arrow-right ms-2"></i></a>
          <div class="preview">
            <img src="${proyecto.imagen}" alt="${proyecto.titulo}" loading="lazy">
            <div class="preview-overlay">
              <div class="preview-info">
                <span>${proyecto.tecnologias}</span>
                <h4>${proyecto.titulo}</h4>
                <p>${proyecto.descripcion}</p>
              </div>
            </div>
          </div>
        </div>
        <hr class="proyecto-linea-horizontal">
      </div>`;
  });
  contenedor.innerHTML = html;
}

// =========================================================
// EXPERIENCIA — título animado + acordeón
// =========================================================
function initExperiencia() {
  const titulo = document.querySelector(".titulo-animado");
  if (titulo) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { titulo.classList.add("visible"); obs.unobserve(titulo); }
        });
      },
      { threshold: 0.5 },
    );
    obs.observe(titulo);
  }

  const items = document.querySelectorAll(".timeline-item");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      items.forEach((el) => el.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });
  });
}

// =========================================================
// STATS — contadores animados
// =========================================================
function initStats() {
  const items = document.querySelectorAll(".stat-number");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let current  = 0;
        const step   = target / 60;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current);
        }, 16);

        observer.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  items.forEach((el) => observer.observe(el));
}

// =========================================================
// MAGNETIC BUTTONS — botones que siguen el cursor
// =========================================================
function initMagnetic() {
  if (window.matchMedia("(hover: none)").matches) return; // skip en touch

  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x    = (e.clientX - rect.left - rect.width  / 2) * 0.25;
      const y    = (e.clientY - rect.top  - rect.height / 2) * 0.25;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

// =========================================================
// RIPPLE — efecto de onda al hacer click en botones .btn-base
// =========================================================
function initRipple() {
  document.querySelectorAll(".btn-base").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      const size = Math.max(btn.offsetWidth, btn.offsetHeight);
      const rect = btn.getBoundingClientRect();
      ripple.style.cssText = `
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size / 2}px;
        top:${e.clientY - rect.top  - size / 2}px;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// =========================================================
// DRAWER — menú lateral en móvil/tablet
// =========================================================
function initDrawer() {
  const toggle  = document.getElementById("menu-toggle");
  const drawer  = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("drawer-overlay");
  const close   = document.getElementById("drawer-close");
  if (!toggle || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    toggle.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");
    overlay.setAttribute("aria-hidden", "false");
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    toggle.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    overlay.setAttribute("aria-hidden", "true");
  }

  toggle.addEventListener("click", openDrawer);
  if (close) close.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  drawer.querySelectorAll(".drawer-link").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) closeDrawer();
  });
}

// =========================================================
// CONTACT FORM — envío a Web3Forms
// =========================================================
function initContactForm() {
  const form     = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  if (!form || !feedback) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btnText    = form.querySelector(".btn-text");
    const btnLoading = form.querySelector(".btn-loading");
    const submitBtn  = form.querySelector('[type="submit"]');

    submitBtn.disabled = true;
    btnText.setAttribute("hidden", "");
    btnLoading.removeAttribute("hidden");
    feedback.removeAttribute("hidden");
    feedback.className   = "form-feedback";
    feedback.textContent = "";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form),
      });

      const result = await response.json();

      if (result.success) {
        feedback.className   = "form-feedback success";
        feedback.textContent = "¡Mensaje enviado! Te responderé pronto.";
        form.reset();
      } else {
        throw new Error(result.message || "Error al enviar");
      }
    } catch {
      feedback.className   = "form-feedback error";
      feedback.textContent = "Algo salió mal. Intenta de nuevo o escríbeme directamente.";
    } finally {
      submitBtn.disabled = false;
      btnText.removeAttribute("hidden");
      btnLoading.setAttribute("hidden", "");
    }
  });
}

// =========================================================
// HELPERS
// =========================================================
function isMobile() {
  return window.innerWidth <= 767;
}

// =========================================================
// MOBILE ENHANCEMENTS
// =========================================================
function initMobile() {
  setupHeroMobile();
  setupExpMobile();
}

function setupHeroMobile() {
  if (!isMobile()) return;
  const hero = document.getElementById("hero");
  if (!hero || document.getElementById("hero-mobile-text")) return;

  const textBlock = document.createElement("div");
  textBlock.id = "hero-mobile-text";
  textBlock.innerHTML = `
    <span class="hero-available-tag">● Disponible para proyectos</span>
    <h1 class="hero-mobile-name">MIGUEL<br><span>LOZANO</span></h1>
    <p class="hero-mobile-role">Desarrollador Web</p>
  `;

  const btns = document.createElement("div");
  btns.id = "hero-mobile-btns";
  btns.className = "hero-mobile-btns";
  btns.innerHTML = `
    <a href="https://wa.me/573009002929?text=Hola%20Miguel,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20contactarte."
       target="_blank" rel="noopener noreferrer" class="btn-hero-primary">Contáctame</a>
    <a href="archivos/hoja-de-vida-Miguel-Lozano.pdf" download class="btn-hero-secondary">Ver CV</a>
  `;

  hero.insertBefore(textBlock, hero.firstChild);
  const imgWrapper = hero.querySelector(".hero-img-wrapper");
  if (imgWrapper) imgWrapper.after(btns);
}

function setupProyectosMobile(proyectosData) {
  if (!isMobile()) return;
  const portafolio = document.getElementById("portafolio");
  if (!portafolio || document.getElementById("proyectos-mobile")) return;

  const grid = document.createElement("div");
  grid.id = "proyectos-mobile";

  proyectosData.forEach((proyecto, index) => {
    const num  = (index + 1).toString().padStart(2, "0");
    const card = document.createElement("div");
    card.className = "proj-card-mobile";
    card.innerHTML = `
      <div class="proj-card-mobile-img">
        <img src="${proyecto.imagen}" alt="${proyecto.titulo}" loading="lazy"
             onerror="this.style.display='none'">
        <span class="proj-card-mobile-num">${num}</span>
        <span class="proj-card-mobile-tag">${proyecto.categoria.split("/")[0].trim()}</span>
      </div>
      <div class="proj-card-mobile-body">
        <div class="proj-card-mobile-title">${proyecto.titulo}</div>
        <div class="proj-card-mobile-cat">${proyecto.categoria}</div>
        <div class="proj-card-mobile-footer">
          <span class="proj-card-mobile-tech">${proyecto.tecnologias.split("•")[0].trim()}</span>
          <a href="${proyecto.link}" target="_blank" rel="noopener noreferrer" class="proj-card-mobile-link">Ver →</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  const contenedor = document.getElementById("contenedor-proyectos");
  if (contenedor) contenedor.after(grid);
}

function setupExpMobile() {
  if (!isMobile()) return;
  const expSection = document.getElementById("experiencia");
  if (!expSection || document.getElementById("experiencia-mobile-header")) return;

  const col7 = expSection.querySelector(".col-lg-7");
  if (!col7) return;

  const header = document.createElement("div");
  header.id = "experiencia-mobile-header";
  header.innerHTML = `
    <p class="exp-sub">Experiencia</p>
    <h2 class="exp-title">+2 años en <span>desarrollo web</span></h2>
  `;
  col7.insertBefore(header, col7.firstChild);
}

// =========================================================
// RESIZE — limpiar elementos móvil al volver a desktop
// =========================================================
function initResize() {
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      ["hero-mobile-text", "hero-mobile-btns", "proyectos-mobile", "experiencia-mobile-header"]
        .forEach((id) => document.getElementById(id)?.remove());
    }
  });
}
