const cartas = [
    {id: 1, img: 'images/a1.jpg'},
    {id: 2, img: 'images/a2.jpg'},
    {id: 3, img: 'images/a3.jpg'},
    {id: 4, img: 'images/a4.jpg'},
    {id: 5, img: 'images/a5.jpg'},
    {id: 6, img: 'images/a6.jpg'},
    {id: 7, img: 'images/a7.jpg'},
    {id: 8, img: 'images/a8.jpg'},
    {id: 1, img: 'images/b1.jpg'},
    {id: 2, img: 'images/b2.jpg'},
    {id: 3, img: 'images/b3.jpg'},
    {id: 4, img: 'images/b4.jpg'},
    {id: 5, img: 'images/b5.jpg'},
    {id: 6, img: 'images/b6.jpg'},
    {id: 7, img: 'images/b7.jpg'},
    {id: 8, img: 'images/b8.jpg'},
]

let tabuleiro = document.getElementById('tabuleiro');
let carta1, carta2;
let trancado, virouAntes = false;
let contador = 0;

function misturar(cartas) {
    cartas.sort(function embaralhar() {
        numAleatorio = Math.random();
        if (numAleatorio >= 0.5) return 1;
        if (numAleatorio < 0.5) return -1;
    });
}

function iniciarJogo() {
    misturar(cartas);
    cartas.forEach(carta => {
        const divCarta = document.createElement('div');
        divCarta.classList.add('carta');
        divCarta.dataset.id = carta.id;
        divCarta.innerHTML = `
            <img src='${carta.img}' class='traseira'>
            <img src='images/frente.jpg' class='frente'>
        `;
        tabuleiro.appendChild(divCarta);
        divCarta.addEventListener('click', virarCarta);
    })
}

function virarCarta() {
    let som = new Audio();
    som.src = "https://www.soundjay.com/buttons/sounds/button-09a.mp3";
    som.play();
    if (trancado || this === carta1) {
        return;
    }

    this.classList.add('flipada');

    if (virouAntes == false) {
        virouAntes = true;
        carta1 = this;
    } else {
        carta2 = this;
        verificarCombinacao();
    }
}

function verificarCombinacao() {
    if (carta1.dataset.id === carta2.dataset.id) {
        som = new Audio();
        som.src = "https://www.soundjay.com/buttons/sounds/button-37a.mp3";
        setTimeout(() => {
            som.play();
        }, '1000');       
        desabilitarCartas();
    } else {
        som = new Audio();
        som.src = "https://www.soundjay.com/buttons/sounds/button-10.mp3";
        setTimeout(() => {
            som.play();
        }, '1000');  
        desvirarCartas();
    }
}

function desabilitarCartas() {
    carta1.removeEventListener('click', virarCarta);
    carta2.removeEventListener('click', virarCarta);
    contador += 1;
    resetar();
}

function desvirarCartas() {
    trancado = true;
    setTimeout(() => {
        carta1.classList.remove('flipada');
        carta2.classList.remove('flipada');
        resetar();
    }, '1000');
}

function resetar() {
    carta1 = null;
    carta2 = null;
    virouAntes = false;
    trancado = false;
    if (contador == 8) {
        setTimeout(() => {
            window.alert("Kudos! You are a winner!");
            window.location.href = "menu.html";
        }, '1000');
    }

}

iniciarJogo();