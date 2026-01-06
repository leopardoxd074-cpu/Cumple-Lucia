const musica = document.getElementById("musica-fondo");

// Ayuda después de 4s
setTimeout(() => {
  const globo = document.getElementById("globo-ayuda");
  if (globo) globo.classList.remove("oculto");
}, 4000);

function encenderLuces() {
  const pita = document.getElementById("pita-zona");
  const ojos = document.getElementById("escena-ojos");
  const concierto = document.getElementById("escena-concierto");

  pita.classList.add("subir-persiana");

  setTimeout(() => {
    ojos.classList.add("oculto");
    concierto.classList.remove("oculto");

    musica.play().catch(() => {});
    mostrarSorpresa();
  }, 1500);
}

function mostrarSorpresa() {
  const sorpresa = document.getElementById("texto-sorpresa");
  const feliz = document.getElementById("texto-feliz");

  sorpresa.style.display = "block";
  feliz.style.display = "none";

  setTimeout(() => {
    sorpresa.style.display = "none";

    feliz.style.display = "block";
    document.getElementById("texto-guia").style.display = "block";

    mostrarDialogos();
  }, 3000);
}

function mostrarDialogos() {
  document.getElementById("dialogo-chico").style.display = "block";
  document.getElementById("dialogo-chica").style.display = "block";
  document.getElementById("dialogo-izq").style.display = "block";
  document.getElementById("dialogo-der").style.display = "block";
}

// =====================
// REGALOS
// =====================
function abrirRegalo(num) {
  if (num === 1) { abrirRegalo1(); return; }
  if (num === 2) { abrirRegalo2(); return; }
  if (num === 3) { abrirRegalo3(); return; }
  alert("Regalo " + num + " todavía no está listo 💝");
}

// -------- REGALO 1 (CARTA) --------
function abrirRegalo1() {
  const modal = document.getElementById("modal-regalo1");
  modal.classList.add("activo");
  modal.setAttribute("aria-hidden", "false");
  document.getElementById("contenedor-web").classList.add("blur-activo");
}

function cerrarRegalo1() {
  const modal = document.getElementById("modal-regalo1");
  modal.classList.remove("activo");
  modal.setAttribute("aria-hidden", "true");
  document.getElementById("contenedor-web").classList.remove("blur-activo");
}

// -------- REGALO 2 (YOUTUBE) + SILENCIAR MÚSICA --------
function abrirRegalo2() {
  const modal = document.getElementById("modal-regalo2");
  const iframe = document.getElementById("yt-regalo2");

  modal.classList.add("activo");
  modal.setAttribute("aria-hidden", "false");
  document.getElementById("contenedor-web").classList.add("blur-activo");

  // pausar música del escenario
  musica.pause();

  // (opcional) autoplay al abrir
  iframe.src = "https://www.youtube.com/embed/yt-dWvzNnbo?autoplay=1";
}

function cerrarRegalo2() {
  const modal = document.getElementById("modal-regalo2");
  const iframe = document.getElementById("yt-regalo2");

  modal.classList.remove("activo");
  modal.setAttribute("aria-hidden", "true");
  document.getElementById("contenedor-web").classList.remove("blur-activo");

  // detener video (resetear iframe)
  iframe.src = "https://www.youtube.com/embed/yt-dWvzNnbo";

  // volver música del escenario
  musica.play().catch(() => {});
}

// -------- REGALO 3 (ESCENA CARTAS) --------
function abrirRegalo3() {
  // esconder concierto
  document.getElementById("escena-concierto").classList.add("oculto");
  // mostrar cartas
  document.getElementById("escena-cartas").classList.remove("oculto");
}

function volverAlConcierto() {
  // cerrar modales por si acaso
  cerrarCarta();

  document.getElementById("escena-cartas").classList.add("oculto");
  document.getElementById("escena-concierto").classList.remove("oculto");
}

// Abrir una carta (muestra GIF/PNG centrado)
function abrirCarta(n) {
  const modal = document.getElementById("modal-cartas");
  const img = document.getElementById("img-carta");

  // mapa de archivos
  const archivos = {
    1: "assets/carta1.gif",
    2: "assets/carta2.gif",
    3: "assets/carta3.gif",
    4: "assets/carta4.gif",
    5: "assets/carta5.gif",
    6: "assets/carta6.png"
  };

  img.src = archivos[n] || "";
  modal.classList.add("activo");
  modal.setAttribute("aria-hidden", "false");

  // blur solo para escena-cartas
  document.getElementById("contenedor-web").classList.add("blur-cartas");
}

function cerrarCarta() {
  const modal = document.getElementById("modal-cartas");
  if (!modal.classList.contains("activo")) return;

  modal.classList.remove("activo");
  modal.setAttribute("aria-hidden", "true");
  document.getElementById("contenedor-web").classList.remove("blur-cartas");
}

// ESC para cerrar modal abierto
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  const m1 = document.getElementById("modal-regalo1");
  const m2 = document.getElementById("modal-regalo2");
  const m3 = document.getElementById("modal-cartas");

  if (m1.classList.contains("activo")) cerrarRegalo1();
  if (m2.classList.contains("activo")) cerrarRegalo2();
  if (m3.classList.contains("activo")) cerrarCarta();
});
