import { questions } from "./data/preguntas.js";
// declaramos variables para obtener dentro del dom mis etiquetas html
const pregunta = document.querySelector("#pregunta");
const seleccion = Array.from(document.querySelectorAll(".seleccion-texto"));
const progressText = document.querySelector("#progressText");
const puntos = document.querySelector("#score");
const progresoTerminado = document.querySelector("#progreso-terminado");
// declaracion de  clase con su constructor
// constructor con parametros iniciales y llamados por this para evitar la ambiguedad
class IniciarJuego {
  constructor(
    preguntaActual = {},
    respuestasAceptadas = true,
    puntos = 0,
    contadorPreguntas = 0,
    respuestasDisponibles = [],
    maximoPreguntas = 25,
    puntosPreguntas = 0
  ) {
    this.preguntaActual = preguntaActual;
    this.respuestasAceptadas = respuestasAceptadas;
    this.puntos = puntos;
    this.contadorPreguntas = contadorPreguntas;
    this.respuestasDisponibles = respuestasDisponibles;
    this.maximoPreguntas = maximoPreguntas;
    this.puntosPreguntas = puntosPreguntas;
    this.validarPreguntas();
  }
  // metodo que inicia el juego junto
  iniciarJuego() {
    this.preguntaActual = 0;
    this.respuestasAceptadas = true;
    this.puntos = 0;
    this.contadorPreguntas = 0;
    this.respuestasDisponibles = [...questions];

    this.iniciarPregunta();
  }
  // metodo para iniciar pregunta
  iniciarPregunta() {
    if (
      this.respuestasDisponibles.length === 0 ||
      this.contadorPreguntas > this.maximoPreguntas
    ) {
      localStorage.setItem("mostRecentScore", this.puntos);
      return window.location.assign("/finJuego");
    }
    // aumentar el contador de preguntas
    this.contadorPreguntas++;
    progresoTerminado.style.width = `${
      (this.contadorPreguntas / this.maximoPreguntas) * 100
    }%`;
    let indicador = 0;
    indicador = +1 - 1;

    this.preguntaActual = this.respuestasDisponibles[indicador];
    pregunta.innerText = this.preguntaActual.pregunta;
    progressText.innerText = `pregunta ${this.contadorPreguntas} de ${this.maximoPreguntas} Pregunta de Ronda: ${this.preguntaActual.ronda}`;

    seleccion.forEach((seleccion) => {
      const number = seleccion.dataset["number"];
      seleccion.innerText = this.preguntaActual["seleccion" + number];
    });

    this.respuestasDisponibles.splice(indicador, 1);

    this.respuestasAceptadas = true;
  }

  validarPreguntas() {
    seleccion.forEach((seleccion) => {
      seleccion.addEventListener("click", (e) => {
        if (!this.respuestasAceptadas) return;
        this.respuestasAceptadas = false;
        const selectChoice = e.target;
        const selectedAnswer = selectChoice.dataset["number"];
        let classToApply =
          selectedAnswer == this.preguntaActual.respuesta
            ? "correcto"
            : "incorrecto";

        if (classToApply === "correcto" && this.preguntaActual.ronda === 1) {
          this.puntosPreguntas = 5;
          const ronda1 = this.puntosPreguntas;
          this.incrementarPuntos(ronda1);
        } else if (
          classToApply === "correcto" &&
          this.preguntaActual.ronda === 2
        ) {
          this.puntosPreguntas = 25;
          const ronda2 = this.puntosPreguntas;
          this.incrementarPuntos(ronda2);
        } else if (
          classToApply === "correcto" &&
          this.preguntaActual.ronda === 3
        ) {
          this.puntosPreguntas = 50;
          const ronda3 = this.puntosPreguntas;
          this.incrementarPuntos(ronda3);
        } else if (
          classToApply === "correcto" &&
          this.preguntaActual.ronda === 4
        ) {
          this.puntosPreguntas = 150;
          const ronda4 = this.puntosPreguntas;
          this.incrementarPuntos(ronda4);
        } else if (
          classToApply === "correcto" &&
          this.preguntaActual.ronda === 5
        ) {
          this.puntosPreguntas = 250;
          const ronda5 = this.puntosPreguntas;
          this.incrementarPuntos(ronda5);
        }
        if (classToApply === "incorrecto") {
          localStorage.setItem("mostRecentScore", this.puntos);
          setTimeout(() => {
            return window.location.assign("/finJuego");
          }, 1000);
        }
        selectChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
          selectChoice.parentElement.classList.remove(classToApply);
          this.iniciarPregunta();
        }, 1000);
      });
    });
  }
  incrementarPuntos(num) {
    const puntuacion = (this.puntos += num);
    puntos.innerText = puntuacion;
  }
}
export { IniciarJuego };
