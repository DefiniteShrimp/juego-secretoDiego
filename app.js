let numeroSecreto = 0;
let intentos = 0;
let numerosSorteados = [];
let numeroMaximo = 10;
let vidas = 5;
let puntos = 0;

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

function verificarIntento() {
  let numeroUsuario = parseInt(document.getElementById("valorUsuario").value);

  console.log(vidas);
  console.log(puntos);
  console.log(numerosSorteados);
  if (numeroUsuario === numeroSecreto) {
    asignarTextoElemento(
      "p",
      `Acertaste en ${intentos} ${intentos == 1 ? "vez" : "veces"}!`
    );
    if (intentos <= 3) {
      puntos++;
    } else if (intentos > 3) {
      vidas--;
    }
    if (vidas === 3) {
      asignarTextoElemento("p", `Perdiste, no te quedan vidas.`);
      document.querySelector("#reiniciar").setAttribute("disabled", "true");
      document.querySelector("#win").setAttribute("disabled", "true");
    }
    if (puntos >= 2) {
      asignarTextoElemento("p", `Completaste el juego!`);
      //document.querySelector("#reiniciar").setAttribute("disabled", "true");
      document.querySelector("#win").setAttribute("disabled", "true");
    }
    document.querySelector("#reiniciar").removeAttribute("disabled");
    document.querySelector("#win").setAttribute("disabled", "true");
  } else {
    limpiarInput();
    intentos++;
    if (numeroUsuario > numeroSecreto) {
      asignarTextoElemento("p", "El numero secreto es menor");
    } else {
      asignarTextoElemento("p", "El numero secreto es mayor");
    }
  }
  return;
}
function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego del número secreto 2");
  asignarTextoElemento("p", `Ingresa un numero del 1 al ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
  document.querySelector("#win").removeAttribute("disabled");
}
function reiniciarJuego() {
  condicionesIniciales();
  limpiarInput();
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
}

function limpiarInput() {
  let valorCaja = (document.querySelector("#valorUsuario").value = "");
}

function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo + 1);
  if (numerosSorteados.length === numeroMaximo) {
    asignarTextoElemento("p", `Adivinaste todos los numeros. Juego completado`);
  } else {
    if (numerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      numerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

condicionesIniciales();
