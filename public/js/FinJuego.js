const nombreJugador=document.querySelector("#nombre-input")
const botonGuardar=document.querySelector("#boton-guardar")
const puntuacionFinal=document.querySelector("#puntuacionFinal")
const mayorPuntuacion=localStorage.getItem("mostRecentScore")

const highScores=JSON.parse(localStorage.getItem('highScores'))|| []

const MAX_HIGH_SCORES=5

puntuacionFinal.innerText=mayorPuntuacion;

nombreJugador.addEventListener('keyup', (e) =>{
    botonGuardar.disable=!nombreJugador.value
})


saveHighscore=e=>{
    console.log(e.target);
    e.preventDefault();
    const score={
        score:mayorPuntuacion,
        name:nombreJugador.value
    }
    highScores.push(score)
    highScores.sort((a,b) =>{
        return b.score -a.score
    })
    highScores.splice(5)
    localStorage.setItem('higScores',JSON.stringify(highScores));
    window.location.assign('/')

}