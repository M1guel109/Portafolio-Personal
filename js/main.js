document.addEventListener("DOMContentLoaded", () => {
// =========================================================
    // CUSTOM CURSOR (CORREGIDO)
    // =========================================================
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    // Seguir el movimiento del mouse y asegurar que sea visible
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        cursorRing.style.left = e.clientX + 'px';
        cursorRing.style.top = e.clientY + 'px';
        
        // Forzamos a que se vea mientras se mueve
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '0.7';
    });

    // Ocultar cursor SOLO cuando sale de la ventana principal
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
    });

    // Expandir cursor en hover sobre <a> y <button>
    const hoverElements = document.querySelectorAll('a, button');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.classList.add('expand');
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('expand');
        });
    });

    // =========================================================
    // NAVBAR
    // =========================================================
    const navbar = document.querySelector(".navbar");

    // Espera un pequeño tiempo para que se note el efecto
    setTimeout(() => {
        navbar.classList.add("animar-linea");
    }, 400);
});

document.addEventListener("DOMContentLoaded", () => {

    // 1. TUS DATOS (Misma estructura)
    const habilidadesData = [
        { nombre: "HTML", pct: 90, estado: 'barra' },
        { nombre: "CSS", pct: 85, estado: 'barra' },
        { nombre: "Bootstrap", pct: 90, estado: 'barra' },
        { nombre: "JavaScript", pct: 60, estado: 'barra' },
        { nombre: "GitHub", pct: 80, estado: 'barra' },
        // Inactivos
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

    // --- FUNCIONES HELPER (Para crear HTML sin repetir código) ---

    // Crear HTML de una Barra
    function crearElementoBarra(skill) {
        const div = document.createElement('div');
        div.classList.add('skill-item', 'fade-in'); // Clase fade-in para animar entrada
        // Agregamos un ID único para poder buscarlo y borrarlo luego
        div.id = `barra-${skill.nombre}`;

        div.innerHTML = `
            <div class="skill-info">
                <h3>${skill.nombre}</h3>
                <span class="porcentaje-texto">0%</span>
            </div>
            <div class="progress">
                <div class="progress-bar" style="width: 0%"></div>
            </div>
        `;

        // Animamos la barra inmediatamente después de crearla
        setTimeout(() => {
            div.querySelector('.progress-bar').style.width = `${skill.pct}%`;
            animarNumero(div.querySelector('.porcentaje-texto'), skill.pct);
        }, 50);

        return div;
    }

    // Crear HTML de un Botón
    function crearElementoBoton(skill) {
        const btn = document.createElement('button');
        btn.classList.add('animar', 'fade-in');
        btn.id = `btn-${skill.nombre}`; // ID único
        btn.innerText = skill.nombre;

        btn.addEventListener('click', () => {
            intercambiarHabilidad(skill.nombre);
        });

        return btn;
    }

    // --- LÓGICA PRINCIPAL ---

    // 1. Renderizado Inicial (Solo ocurre una vez)
    function inicializar() {
        containerBarras.innerHTML = "";
        containerBotones.innerHTML = "";

        // Pintar Barras
        habilidadesData.filter(h => h.estado === 'barra').forEach(skill => {
            const barra = crearElementoBarra(skill);
            containerBarras.appendChild(barra);
        });

        // Pintar Botones
        habilidadesData.filter(h => h.estado === 'boton').forEach((skill, index) => {
            const btn = crearElementoBoton(skill);
            btn.style.animationDelay = `${index * 0.1}s`; // Delay cascada solo al inicio
            containerBotones.appendChild(btn);
        });
    }

    // 2. Intercambio Quirúrgico (Sin borrar todo)
    function intercambiarHabilidad(nombreSkillEntrante) {

        // A. IDENTIFICAR JUGADORES
        // 1. El botón que clickeaste (Entrante)
        const btnClickeado = document.getElementById(`btn-${nombreSkillEntrante}`);
        const dataEntrante = habilidadesData.find(h => h.nombre === nombreSkillEntrante);

        // 2. La barra que se va (La primera de la lista visible)
        // Buscamos el primer hijo del contenedor de barras
        const barraSalienteDOM = containerBarras.firstElementChild;
        // Obtenemos su nombre desde el ID (ej: "barra-HTML" -> "HTML")
        const nombreSaliente = barraSalienteDOM.id.replace('barra-', '');
        const dataSaliente = habilidadesData.find(h => h.nombre === nombreSaliente);

        if (!btnClickeado || !barraSalienteDOM) return;

        // B. ANIMAR SALIDA (Visual)
        btnClickeado.classList.add('fade-out');       // El botón se desvanece
        barraSalienteDOM.classList.add('fade-out');   // La barra se desvanece

        // C. ESPERAR Y CAMBIAR (Esperamos 300ms que dura la transición CSS)
        setTimeout(() => {
            // 1. Actualizar Datos (En memoria)
            dataEntrante.estado = 'barra';
            dataSaliente.estado = 'boton';

            // Mover el nuevo al final del array de barras (opcional, para orden interno)
            const index = habilidadesData.indexOf(dataEntrante);
            habilidadesData.push(habilidadesData.splice(index, 1)[0]);

            // 2. MANIPULACIÓN DOM (Aquí está el truco: remover y agregar solo lo necesario)

            // a) Eliminar los elementos viejos del HTML
            btnClickeado.remove();
            barraSalienteDOM.remove();

            // b) Crear la NUEVA BARRA (que antes era botón) y ponerla al final
            const nuevaBarra = crearElementoBarra(dataEntrante);
            containerBarras.appendChild(nuevaBarra);

            // c) Crear el NUEVO BOTÓN (que antes era barra) y ponerlo al final
            const nuevoBoton = crearElementoBoton(dataSaliente);
            containerBotones.appendChild(nuevoBoton);

        }, 300); // 300ms coincide con el CSS transition
    }

    // --- UTILIDADES ---
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

    // --- ARRANQUE ---
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            inicializar(); // Solo llamamos a inicializar una vez
            observer.disconnect();
        }
    });

    if (document.getElementById("habilidades")) {
        observer.observe(document.getElementById("habilidades"));
    }
});

// ==========================================
// LÓGICA DE PROYECTOS (Cargando desde JSON)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-proyectos");

    // 1. Función que va a buscar el archivo JSON
    async function cargarProyectos() {
        try {
            const resp = await fetch('data/proyectos.json');
            if (!resp.ok) throw new Error('Error al cargar datos');
            const proyectosData = await resp.json();

            // Si todo sale bien, se los pasamos a la función que los dibuja
            renderizarGaleria(proyectosData);
        } catch (err) {
            console.error("Hubo un error cargando los proyectos:", err);
            if (contenedor) {
                contenedor.innerHTML = "<p>Error al cargar los proyectos. Intenta de nuevo más tarde.</p>";
            }
        }
    }

    // 2. Función que toma los datos y crea el HTML
    function renderizarGaleria(proyectosData) {
        if (!contenedor) return;

        let htmlContent = "";

        proyectosData.forEach((proyecto, index) => {
            const numero = (index + 1).toString().padStart(2, '0');

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
                </div>
            `;
        });

        contenedor.innerHTML = htmlContent;
    }

    // 3. ¡MUY IMPORTANTE! Dar la orden de arranque
    cargarProyectos();
});

document.addEventListener("DOMContentLoaded", () => {

    // Seleccionamos el título
    const titulo = document.querySelector(".titulo-animado");

    // Creamos el "Observador"
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si el elemento entra en pantalla...
            if (entry.isIntersecting) {
                // ...le agregamos la clase que dispara el CSS
                titulo.classList.add("visible");

                // Y dejamos de observar (para que no se repita)
                observer.unobserve(titulo);
            }
        });
    }, {
        threshold: 0.5 // Se activa cuando el 50% del título es visible
    });

    // Si el título existe, empezamos a observar
    if (titulo) {
        observer.observe(titulo);
    }
});

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. SCROLLSPY (Detectar sección activa en el menú)
    ===================================================== */
    const sections = document.querySelectorAll("section, div#hero"); // Selecciona secciones y el Hero
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    const highlightMenu = () => {
        let current = "";
        const offset = 150; // Ajuste para que cambie un poco antes de llegar a la línea

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Si el scroll ha bajado lo suficiente para entrar en la sección
            if (window.scrollY >= (sectionTop - offset)) {
                current = section.getAttribute("id");
            }
        });

        // Limpiar todos los 'active' y ponerlo solo al actual
        navLinks.forEach((link) => {
            link.classList.remove("active");

            // Si el link apunta a la sección actual, actívalo
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    };

    // Escuchar el evento de scroll
    window.addEventListener("scroll", highlightMenu);


    /* =====================================================
       2. CERRAR MENÚ AL DAR CLICK (En celulares)
    ===================================================== */
    // Esto es un detalle de UX: que el menú se recoja al elegir una opción
    const menuToggle = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });

    navLinks.forEach((l) => {
        l.addEventListener('click', () => {
            // Si el menú está abierto (clase show), ciérralo
            if (menuToggle.classList.contains('show')) {
                bsCollapse.toggle();
            }
        });
    });

});