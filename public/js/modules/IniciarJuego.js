import { questions } from "./data/preguntas.js";

const pregunta = document.querySelector('#pregunta');
const seleccion = Array.from(document.querySelectorAll('.seleccion-texto'));
const progressText = document.querySelector('#progressText');
const puntos = document.querySelector('#score');
const progresoTerminado = document.querySelector('#progreso-terminado')

class IniciarJuego {
  constructor(
    preguntaActual = {},
    respuestasAceptadas = true,
    puntos = 0,
    contadorPreguntas = 0,
    respuestasDisponibles = [],
    MAX_QUESTIONS = 4,
    SCORE_POINTS = 100
  ) {
    this.preguntaActual = preguntaActual;
    this.respuestasAceptadas = respuestasAceptadas;
    this.puntos = puntos;
    this.contadorPreguntas = contadorPreguntas;
    this.respuestasDisponibles = respuestasDisponibles;
    this.MAX_QUESTIONS = MAX_QUESTIONS;
    this.SCORE_POINTS=SCORE_POINTS
    this.validarPreguntas();
  }

  iniciarJuego() {
    this.preguntaActual = 0;
    this.respuestasAceptadas = true;
    this.puntos = 0;
    this.contadorPreguntas = 0;
    this.respuestasDisponibles = [...questions];
    this.iniciarPregunta()

  }

  iniciarPregunta(){
    if (this.respuestasDisponibles.length === 0 || this.contadorPreguntas > this.MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore', this.puntos)
       return window.location.assign('/finJuego')
    }
    this.contadorPreguntas++
    progressText.innerText = `pregunta ${this.contadorPreguntas} de ${this.MAX_QUESTIONS}`
    progresoTerminado.style.width = `${(this.contadorPreguntas / this.MAX_QUESTIONS) * 100}%`
  
    const questionIndex = Math.floor(Math.random() * this.respuestasDisponibles.length)
    this.preguntaActual = this.respuestasDisponibles[questionIndex]
    pregunta.innerText = this.preguntaActual.pregunta

    seleccion.forEach(seleccion => {
      const number = seleccion.dataset['number']
      seleccion.innerText = this.preguntaActual['seleccion' + number]
    })
  
    this.respuestasDisponibles.splice(questionIndex, 1)
    this.respuestasAceptadas = true;
  }

  validarPreguntas(){
    seleccion.forEach(seleccion => {
      seleccion.addEventListener('click', e => {
        if (!this.respuestasAceptadas) 
          return
        this.respuestasAceptadas = false
        const selectChoice = e.target
        const selectedAnswer = selectChoice.dataset['number']
        let classToApply = selectedAnswer == this.preguntaActual.respuesta ? 'correcto':'incorrecto' 
    
        if (classToApply === 'correcto') {
          this.incrementarPregunta(this.SCORE_POINTS)
        }
        if (classToApply==='incorrecto') {
          return window.location.assign("/finJuego")
        }
    
        selectChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
          selectChoice.parentElement.classList.remove(classToApply)
          this.iniciarPregunta()
        }, 1000)
      })
    })
  }
  incrementarPregunta(num){
    const puntuacion=this.puntos +=num
    puntos.innerText=puntuacion
    
  }
}




export { IniciarJuego };
