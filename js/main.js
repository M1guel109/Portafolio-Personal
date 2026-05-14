document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // CUSTOM CURSOR
  // =========================================================
  const cursorDot = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");

  document.addEventListener("mousemove", (e) => {
    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";
    cursorRing.style.left = e.clientX + "px";
    cursorRing.style.top = e.clientY + "px";
    cursorDot.style.opacity = "1";
    cursorRing.style.opacity = "0.7";
  });

  document.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = "0";
    cursorRing.style.opacity = "0";
  });

  const hoverElements = document.querySelectorAll("a, button");
  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => cursorRing.classList.add("expand"));
    el.addEventListener("mouseleave", () =>
      cursorRing.classList.remove("expand"),
    );
  });

  // =========================================================
  // NAVBAR — línea animada, igual que siempre
  // =========================================================
  const navbar = document.querySelector(".navbar");
  setTimeout(() => {
    navbar.classList.add("animar-linea");
  }, 400);

  // =========================================================
  // PARALLAX CON MOUSE EN EL HERO
  // Convive con tsParticles: el canvas de partículas está en
  // z-index 0, el glow en z-index 1, los textos/imagen en 2-3.
  // =========================================================
  const hero = document.getElementById("hero");
  const heroGlow = document.getElementById("hero-glow");
  const heroNombre = hero ? hero.querySelector(".nombre") : null;
  const heroTitulo = hero ? hero.querySelector(".titulo-encima") : null;
  const heroImg = hero ? hero.querySelector(".hero-img-wrapper") : null;

  if (hero && heroGlow) {
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;

      // Mover el glow al cursor
      heroGlow.style.left = e.clientX - rect.left + "px";
      heroGlow.style.top = e.clientY - rect.top + "px";
      heroGlow.style.opacity = "1";

      // Parallax sutil en los tres elementos
      // (las partículas no se mueven, eso hace el efecto de profundidad)
      if (heroNombre)
        heroNombre.style.transform = `translateY(-130%) translate(${cx * 0.025}px, ${cy * 0.025}px)`;
      if (heroTitulo)
        heroTitulo.style.transform = `translateY(40%)  translate(${cx * 0.04}px,  ${cy * 0.04}px)`;
      if (heroImg)
        heroImg.style.transform = `translate(${cx * 0.012}px, ${cy * 0.012}px)`;
    });

    hero.addEventListener("mouseleave", () => {
      heroGlow.style.opacity = "0";
      // Volver a la posición original suavemente
      if (heroNombre) heroNombre.style.transform = "translateY(-130%)";
      if (heroTitulo) heroTitulo.style.transform = "translateY(40%)";
      if (heroImg) heroImg.style.transform = "none";
    });
  }

  // =========================================================
  // SCRAMBLE EN TÍTULOS
  // =========================================================
  const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&";

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
            return scrambleChars[
              Math.floor(Math.random() * scrambleChars.length)
            ];
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

  // =========================================================
  // TSPARTICLES — igual que tenías, solo heroizo el número
  // =========================================================
  tsParticles.load("particles-hero", {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
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
        enable: true,
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
      number: { value: 120, density: { enable: true } },
      opacity: { value: 0.35 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  });

  // =========================================================
  // SCROLLSPY + CERRAR MENÚ EN MÓVIL
  // =========================================================
  const sections = document.querySelectorAll("section, div#hero");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  const highlightMenu = () => {
    let current = "";
    const offset = 150;
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - offset) {
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

  const menuToggle = document.getElementById("navbarNav");
  const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
  navLinks.forEach((l) => {
    l.addEventListener("click", () => {
      if (menuToggle.classList.contains("show")) bsCollapse.toggle();
    });
  });
});

// =========================================================
// HABILIDADES (barras + botones intercambiables)
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const habilidadesData = [
    { nombre: "HTML", pct: 90, estado: "barra" },
    { nombre: "CSS", pct: 85, estado: "barra" },
    { nombre: "Bootstrap", pct: 90, estado: "barra" },
    { nombre: "JavaScript", pct: 60, estado: "barra" },
    { nombre: "GitHub", pct: 80, estado: "barra" },
    { nombre: "MySQL", pct: 50, estado: "boton" },
    { nombre: "Canva", pct: 70, estado: "boton" },
    { nombre: "WordPress", pct: 40, estado: "boton" },
    { nombre: "Trello", pct: 90, estado: "boton" },
    { nombre: "React", pct: 30, estado: "boton" },
    { nombre: "Figma", pct: 75, estado: "boton" },
    { nombre: "Git", pct: 70, estado: "boton" },
  ];

  const containerBotones = document.getElementById("contenedor-botones");
  const containerBarras = document.getElementById("contenedor-barras");

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
    containerBarras.innerHTML = "";
    containerBotones.innerHTML = "";
    habilidadesData
      .filter((h) => h.estado === "barra")
      .forEach((skill) => {
        containerBarras.appendChild(crearElementoBarra(skill));
      });
    habilidadesData
      .filter((h) => h.estado === "boton")
      .forEach((skill, index) => {
        const btn = crearElementoBoton(skill);
        btn.style.animationDelay = `${index * 0.1}s`;
        containerBotones.appendChild(btn);
      });
  }

  function intercambiarHabilidad(nombreSkillEntrante) {
    const btnClickeado = document.getElementById(`btn-${nombreSkillEntrante}`);
    const dataEntrante = habilidadesData.find(
      (h) => h.nombre === nombreSkillEntrante,
    );
    const barraSalienteDOM = containerBarras.firstElementChild;
    const nombreSaliente = barraSalienteDOM.id.replace("barra-", "");
    const dataSaliente = habilidadesData.find(
      (h) => h.nombre === nombreSaliente,
    );

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
      if (actual >= target) {
        actual = target;
        clearInterval(timer);
      }
      elemento.innerText = actual + "%";
    }, 20);
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      inicializar();
      observer.disconnect();
    }
  });

  if (document.getElementById("habilidades")) {
    observer.observe(document.getElementById("habilidades"));
  }
});

// =========================================================
// PROYECTOS (desde JSON)
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-proyectos");

  async function cargarProyectos() {
    try {
      const resp = await fetch("data/proyectos.json");
      if (!resp.ok) throw new Error("Error al cargar datos");
      const proyectosData = await resp.json();
      renderizarGaleria(proyectosData);
    } catch (err) {
      console.error("Hubo un error cargando los proyectos:", err);
      if (contenedor)
        contenedor.innerHTML =
          "<p>Error al cargar los proyectos. Intenta de nuevo más tarde.</p>";
    }
  }

  function renderizarGaleria(proyectosData) {
    if (!contenedor) return;
    let htmlContent = "";
    proyectosData.forEach((proyecto, index) => {
      const numero = (index + 1).toString().padStart(2, "0");
      htmlContent += `
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
            <a href="${proyecto.link}" target="_blank">Ver Proyecto <i class="bi bi-arrow-right ms-2"></i></a>
            <div class="preview">
              <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
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
    contenedor.innerHTML = htmlContent;
  }

  cargarProyectos();
});

// =========================================================
// TÍTULO ANIMADO DE EXPERIENCIA
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const titulo = document.querySelector(".titulo-animado");
  if (!titulo) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          titulo.classList.add("visible");
          observer.unobserve(titulo);
        }
      });
    },
    { threshold: 0.5 },
  );

  observer.observe(titulo);
});

// =========================================================
// MOBILE ENHANCEMENTS
// Agrega esto al FINAL de tu main.js
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const isMobile = () => window.innerWidth <= 767;

  // ── 1. HERO MÓVIL ──────────────────────────────────────
  // Inserta el bloque de texto + botones del hero en móvil
  function setupHeroMobile() {
    if (!isMobile()) return;
    const hero = document.getElementById("hero");
    if (!hero || document.getElementById("hero-mobile-text")) return;

    // Bloque de nombre/rol
    const textBlock = document.createElement("div");
    textBlock.id = "hero-mobile-text";
    textBlock.innerHTML = `
      <span class="hero-available-tag">● Disponible para proyectos</span>
      <h1 class="hero-mobile-name">MIGUEL<br><span>LOZANO</span></h1>
      <p class="hero-mobile-role">Desarrollador Web</p>
    `;

    // Botones
    const btns = document.createElement("div");
    btns.className = "hero-mobile-btns";
    btns.innerHTML = `
      <a href="https://wa.me/573203270793?text=Hola%20Miguel,%20vi%20tu%20portafolio%20y%20me%20gustaría%20contactarte."
         target="_blank" class="btn-hero-primary">Contactame</a>
      <a href="archivos/hoja-de-vida-Miguel-Lozano.pdf" download
         class="btn-hero-secondary">Ver CV</a>
    `;

    // Insertamos antes del primer hijo del hero
    hero.insertBefore(textBlock, hero.firstChild);
    // Botones van después de la imagen
    const imgWrapper = hero.querySelector(".hero-img-wrapper");
    if (imgWrapper) imgWrapper.after(btns);
  }

  // ── 2. PROYECTOS MÓVIL ─────────────────────────────────
  // Crea las cards móvil en un contenedor separado
  function setupProyectosMobile(proyectosData) {
    if (!isMobile()) return;
    const portafolio = document.getElementById("portafolio");
    if (!portafolio || document.getElementById("proyectos-mobile")) return;

    const grid = document.createElement("div");
    grid.id = "proyectos-mobile";

    proyectosData.forEach((proyecto, index) => {
      const num = (index + 1).toString().padStart(2, "0");
      const card = document.createElement("div");
      card.className = "proj-card-mobile";
      card.innerHTML = `
        <div class="proj-card-mobile-img">
          <img src="${proyecto.imagen}" alt="${proyecto.titulo}"
               onerror="this.style.display='none'">
          <span class="proj-card-mobile-num">${num}</span>
          <span class="proj-card-mobile-tag">${proyecto.categoria.split("/")[0].trim()}</span>
        </div>
        <div class="proj-card-mobile-body">
          <div class="proj-card-mobile-title">${proyecto.titulo}</div>
          <div class="proj-card-mobile-cat">${proyecto.categoria}</div>
          <div class="proj-card-mobile-footer">
            <span class="proj-card-mobile-tech">${proyecto.tecnologias.split("•")[0].trim()}</span>
            <a href="${proyecto.link}" target="_blank" class="proj-card-mobile-link">Ver →</a>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Insertarlo antes del botón "ver más"
    const btnVerMas = portafolio.querySelector(
      ".btn-ver-mas-container",
    )?.parentElement;
    const contenedor = document.getElementById("contenedor-proyectos");
    if (contenedor) contenedor.after(grid);
  }

  // ── 3. HEADER EXPERIENCIA MÓVIL ────────────────────────
  function setupExpMobile() {
    if (!isMobile()) return;
    const expSection = document.getElementById("experiencia");
    if (!expSection || document.getElementById("experiencia-mobile-header"))
      return;

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

  // ── ARRANQUE ───────────────────────────────────────────
  setupHeroMobile();
  setupExpMobile();

  // Los proyectos se cargan async — los interceptamos
  const originalFetch = window.fetch;
  const proyectosCache = [];
  let proyectosCargados = false;

  // Observer para cuando el contenedor de proyectos tenga contenido
  const proyObs = new MutationObserver(() => {
    if (proyectosCargados) return;
    const contenedor = document.getElementById("contenedor-proyectos");
    if (contenedor && contenedor.children.length > 0) {
      proyectosCargados = true;
      // Re-fetch el JSON para tener los datos crudos
      fetch("data/proyectos.json")
        .then((r) => r.json())
        .then((data) => setupProyectosMobile(data))
        .catch(() => {});
      proyObs.disconnect();
    }
  });

  const contenedor = document.getElementById("contenedor-proyectos");
  if (contenedor) proyObs.observe(contenedor, { childList: true });

  // ── RESIZE: limpiar elementos móvil si se va a desktop ─
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      const mobileEls = [
        "hero-mobile-text",
        "hero-mobile-btns",
        "proyectos-mobile",
        "experiencia-mobile-header",
      ];
      mobileEls.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    }
  });
});
