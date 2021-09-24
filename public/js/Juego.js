
const pregunta = document.querySelector('#pregunta');
const seleccion = Array.from(document.querySelectorAll('.seleccion-texto'));
const progressText = document.querySelector('#progressText');
const puntos = document.querySelector('#score');
const progresoTerminado = document.querySelector('#progreso-terminado')
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestion = []

let questions = [
  {
    pregunta: "Cuanto es 2+2",
    seleccion1: "2",
    seleccion2: "23",
    seleccion3: "12",
    seleccion4: "4",
    respuesta: 4
  },
  {
    pregunta: "Fundadores Principales de las farc",
    seleccion1: "jorge eliecer gaitan",
    seleccion2: "Tiro Fijo y jacobo arenas",
    seleccion3: "Jose maria cordova",
    seleccion4: "Pedreti",
    respuesta: 2
  }

]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestion = [...questions]
  getNewQuestion();
}


getNewQuestion = () => {
  if (availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)
     return window.location.assign('/finJuego')
  }

  questionCounter++
  progressText.innerText = `pregunta ${questionCounter} de ${MAX_QUESTIONS}`
  progresoTerminado.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

  const questionIndex = Math.floor(Math.random() * availableQuestion.length)
  currentQuestion = availableQuestion[questionIndex]
  pregunta.innerText = currentQuestion.pregunta
  

  seleccion.forEach(seleccion => {
    const number = seleccion.dataset['number']
    seleccion.innerText = currentQuestion['seleccion' + number]
  })

  availableQuestion.splice(questionIndex, 1)
  acceptingAnswers = true;
}

seleccion.forEach(seleccion => {
  seleccion.addEventListener('click', e => {
    if (!acceptingAnswers) 
      return
    acceptingAnswers = false
    const selectChoice = e.target
    const selectedAnswer = selectChoice.dataset['number']
    let classToApply = selectedAnswer == currentQuestion.respuesta ? 'correcto':'incorrecto' 

    if (classToApply === 'correcto') {
      incremetScore(SCORE_POINTS)
    }
    if (classToApply==='incorrecto') {
      return window.location.assign("/finJuego")
    }

    selectChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)
  })
})


incremetScore=num =>{
  score +=num
  puntos.innerText=score
  
}

startGame();





