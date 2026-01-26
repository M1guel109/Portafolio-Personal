document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");

  // Espera un pequeño tiempo para que se note el efecto
  setTimeout(() => {
    navbar.classList.add("animar-linea");
  }, 400);
});

document.addEventListener("DOMContentLoaded", () => {

  // 1. CONFIGURACIÓN: Todos tus datos aquí
  const habilidadesData = [
    // Las 5 INICIALES (estado: 'barra')
    { nombre: "HTML", pct: 90, estado: 'barra' },
    { nombre: "CSS", pct: 85, estado: 'barra' },
    { nombre: "Bootstrap", pct: 90, estado: 'barra' },
    { nombre: "JavaScript", pct: 60, estado: 'barra' },
    { nombre: "GitHub", pct: 80, estado: 'barra' },

    // Las RESTANTES (estado: 'boton')
    { nombre: "MySQL", pct: 50, estado: 'boton' },
    { nombre: "Canva", pct: 70, estado: 'boton' },
    { nombre: "WordPress", pct: 40, estado: 'boton' },
    { nombre: "Trello", pct: 90, estado: 'boton' },
    { nombre: "React", pct: 30, estado: 'boton' },
    { nombre: "Figma", pct: 75, estado: 'boton' },
    { nombre: "Git", pct: 70, estado: 'boton' }
  ];

  const containerBotones = document.getElementById("contenedor-botones");
  const containerBarras = document.getElementById("contenedor-barras");

  // Función principal para renderizar todo
  function renderizar() {
    // Limpiamos contenido actual
    containerBotones.innerHTML = "";
    containerBarras.innerHTML = "";

    // Filtramos para saber cuáles van dónde
    const barrasActivas = habilidadesData.filter(h => h.estado === 'barra');
    const botonesInactivos = habilidadesData.filter(h => h.estado === 'boton');

    // A. RENDERIZAR BARRAS (Derecha)
    barrasActivas.forEach(skill => {
      const skillHTML = document.createElement('div');
      skillHTML.classList.add('skill-item');
      skillHTML.innerHTML = `
                <div class="skill-info">
                    <h3>${skill.nombre}</h3>
                    <span class="porcentaje-texto" data-target="${skill.pct}">0%</span>
                </div>
                <div class="progress">
                    <div class="progress-bar" style="width: 0%"></div>
                </div>
            `;
      containerBarras.appendChild(skillHTML);

      // Trigger animaciones (pequeño timeout para que el DOM lo registre)
      setTimeout(() => {
        skillHTML.querySelector('.progress-bar').style.width = `${skill.pct}%`;
        animarNumero(skillHTML.querySelector('.porcentaje-texto'), skill.pct);
      }, 100);
    });

    // B. RENDERIZAR BOTONES (Izquierda)
    // B. RENDERIZAR BOTONES (Izquierda)
    botonesInactivos.forEach((skill, index) => {
      const btn = document.createElement('button');

      // 1. Agregamos la clase 'animar'
      btn.classList.add('animar');

      // 2. EL TRUCO: Retraso progresivo (0.1s, 0.2s, 0.3s...)
      // Esto hace que salgan uno por uno y no en bloque
      btn.style.animationDelay = `${index * 0.1}s`;

      btn.innerText = skill.nombre;

      btn.addEventListener('click', () => {
        intercambiarHabilidad(skill.nombre);
      });

      containerBotones.appendChild(btn);
    });
  }

  // Lógica de Intercambio (FIFO: Entra uno, sale el primero)
  function intercambiarHabilidad(nombreSkillEntrante) {
    // 1. Identificar lista actual de barras
    const barrasActuales = habilidadesData.filter(h => h.estado === 'barra');

    // 2. Si ya hay 5, sacamos la PRIMERA (la más vieja)
    if (barrasActuales.length >= 5) {
      const skillASacar = barrasActuales[0]; // El primero del array
      skillASacar.estado = 'boton'; // Lo mandamos al mazo
    }

    // 3. Activamos la nueva
    const skillAEntrar = habilidadesData.find(h => h.nombre === nombreSkillEntrante);
    skillAEntrar.estado = 'barra';

    // 4. Reordenamos: ponemos la nueva al final de las barras para mantener orden
    // (Esto es opcional, pero ayuda visualmente)
    const index = habilidadesData.indexOf(skillAEntrar);
    habilidadesData.push(habilidadesData.splice(index, 1)[0]);

    // 5. Volvemos a pintar todo
    renderizar();
  }

  // Función para animar números de 0 a X
  function animarNumero(elemento, target) {
    let actual = 0;
    const incremento = Math.ceil(target / 200); // Velocidad de conteo

    const timer = setInterval(() => {
      actual += incremento;
      if (actual >= target) {
        actual = target;
        clearInterval(timer);
      }
      elemento.innerText = actual + "%";
    }, 20); // Cada 20ms actualiza
  }

  // INICIALIZAR AL CARGAR (Usamos IntersectionObserver para que empiece cuando bajes)
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      renderizar();
      observer.disconnect(); // Solo lo hace la primera vez
    }
  });

  if (document.getElementById("habilidades")) {
    observer.observe(document.getElementById("habilidades"));
  }

});