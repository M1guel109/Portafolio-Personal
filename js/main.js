document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  
  // Espera un pequeño tiempo para que se note el efecto
  setTimeout(() => {
    navbar.classList.add("animar-linea");
  }, 400);
});

