const listaHistorial=document.querySelector('#lista-historial')
const historial=JSON.parse(localStorage.getItem('higScores')) || []
console.log(historial);
listaHistorial.innerHTML=
historial.map(score =>{
        return `<li class="high-score"> Nombre Jugador : ${score.name} Puntuacion: ${score.score}</li>`
    }).join('');