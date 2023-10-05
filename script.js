const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const startPauseBt = document.querySelector("#start-pause");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const icon = document.querySelector("#imagem-icon");
const tempoNaTela = document.querySelector("#timer");

const musica = new Audio("./sons/luna-rise-part-one.mp3");
const toquePlay = new Audio("sons/play.wav");
const toquePause = new Audio("./sons/pause.mp3");
const toqueBeep = new Audio("./sons/beep.mp3");
musica.loop = true //musica ficando tocando o tempo inteiro
toqueBeep == true;


let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener("change", () => { //change usamos para checkbox INPUT
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto("foco"); //CAMINHO DA IMAGEM E VALOR DO ATRIBUTO
    focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto("descanso-curto"); //CAMINHO DA IMAGEM E VALOR DO ATRIBUTO
    curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto("descanso-longo"); //CAMINHO DA IMAGEM E VALOR DO ATRIBUTO
    longoBt.classList.add("active");
});



//FUNÇÃO 
function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove("active");
    })
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `../imagens/${contexto}.png`); 
    switch (contexto) {
        case "foco":
            titulo.innerHTML = 
            `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = 
            `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo": 
            titulo.innerHTML = 
            `Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;
    }
}



const contagemRegressiva = () => {
    if (toqueBeep && tempoDecorridoEmSegundos <= 0) {
        toqueBeep.play();
        zerar();
        return
    } 
    tempoDecorridoEmSegundos -= 1
    mostrarTempo();
}

startPauseBt.addEventListener("click", iniciarOuPausar);


function iniciarOuPausar() { //inicia e pausa o temporizador
    if (intervaloId) {
        toquePause.play();
        zerar();
        return
    } if (toquePause.played) {
        toqueBeep.pause()
    } 

    toquePlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000); //setInterval(qual método, em quanto tempo para ser executado)
    iniciarOuPausarBt.textContent = "Pausar";
    icon.setAttribute("src", "./imagens/pause.png");
}




function zerar() {
    clearInterval(intervaloId); //vai interromper a execução de um código
    iniciarOuPausarBt.textContent = "Começar";
    icon.setAttribute("src", "./imagens/play_arrow.png");
    intervaloId = null; 
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {minute: "2-digit", second: "2-digit"})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
