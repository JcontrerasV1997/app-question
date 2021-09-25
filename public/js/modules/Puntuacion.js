const nombreJugador = document.querySelector("#nombre-input");
const botonGuardar = document.querySelector("#boton-guardar");
const puntuacionFinal = document.querySelector("#puntuacionFinal");
const mayorPuntuacion = localStorage.getItem("mostRecentScore");
const formulario=document.querySelector('#formulario');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

class Puntuacion {
  constructor() {
    puntuacionFinal.innerText = mayorPuntuacion;
    // this.validarNombre();
    // this.saveHighscore();
  }

  static validarNombre() {
    nombreJugador.addEventListener("keyup", (e) => {
      if (e.target.value) {
        botonGuardar.disabled = false;
      } else {
        botonGuardar.disabled = true;
      }
    });
  }

  static guardarPuntos(){
    formulario.addEventListener("submit",(e)=>{
      e.preventDefault()
      const score = {
        score: mayorPuntuacion,
        name: nombreJugador.value
      };



      highScores.push(score);
      highScores.sort((a, b) => {
        return b.score - a.score;
      });
      highScores.splice(5);
      localStorage.setItem("higScores", JSON.stringify(highScores));
      window.location.assign("/");

    })
  }


}

export {Puntuacion}
