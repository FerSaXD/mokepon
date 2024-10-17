const sectionReiniciar = document.getElementById ("reiniciar")
const sectionSeleccionarAtaques = document.getElementById("Seleccionar-ataque")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("Seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")

const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
const audio = document.getElementById("miAudio") 
const sectionBotonesAudio = document.getElementById("sectionBotonAudio")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opciónDeMokepones
let inputRata 
let inputCarpincho
let inputHipopótamo
let inputLangosta
let inputGusano
let inputDragon
let mascotaJugador
let mascotaJugadorObjeto
let mascotaEnemigo
let tipoMokJug
let tipoMokEne
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua 
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo 
let resultado
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = "./imagenes/mapaa.jpg"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 500

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa -20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, tipo, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.tipo = tipo
        this.ancho = 50
        this.alto =50
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )
    }
}

let hipopotamo = new Mokepon("Hipopótamo", "./imagenes/hipopótamo.png", 5, "Agua", "./imagenes/hipopótamo cabezaa.png")

let carpincho = new Mokepon("Carpincho", "./imagenes/carpincho.png", 5, "Tierra", "./imagenes/carpincho cabezaa.png")

let rata = new Mokepon("Rata", "./imagenes/rata.png", 5, "Fuego", "./imagenes/rata cabezaa.png")

let langosta = new Mokepon("Langosta", "./imagenes/langosta.png", 5, "Agua", "./imagenes/langosta cabezaa.png")

let gusano = new Mokepon("Gusano", "./imagenes/gusano.png", 5, "Tierra", "./imagenes/gusano cabezaa.png")

let dragon = new Mokepon("Dragon", "./imagenes/dragon.png", 5, "Fuego", "./imagenes/dragon cabezaa.png")

const hipopotamoAtaques = [
    { nombre: "💧", id: "boton-agua", foto:"./imagenes/agua final.png", alt: "Agua"},
    { nombre: "💧", id: "boton-agua", foto:"./imagenes/agua final.png", alt: "Agua" },
    { nombre: "💧", id: "boton-agua", foto:"./imagenes/agua final.png", alt: "Agua" },
    { nombre: "🔥", id: "boton-fuego", foto:"./imagenes/fuego final.png", alt: "Fuego" },
    { nombre: "🌱", id: "boton-tierra",foto:"./imagenes/tierra final.png", alt: "Tierra"},
]
hipopotamo.ataques.push(...hipopotamoAtaques)
/* hipopotamoEnemigo.ataques.push(...hipopotamoAtaques) */

const carpinchoAtaques = [    
    { nombre: "🌱", id: "boton-tierra",foto:"./imagenes/tierra final.png", alt: "Tierra" },
    { nombre: "🌱", id: "boton-tierra",foto:"./imagenes/tierra final.png", alt: "Tierra" },
    { nombre: "🌱", id: "boton-tierra",foto:"./imagenes/tierra final.png", alt: "Tierra" },
    { nombre: "💧", id: "boton-agua", foto:"./imagenes/agua final.png", alt: "Agua" },
    { nombre: "🔥", id: "boton-fuego", foto:"./imagenes/fuego final.png", alt: "Fuego" },
]
carpincho.ataques.push(...carpinchoAtaques)
/* carpinchoEnemigo.ataques.push(...carpinchoAtaques) */

const rataAtaques = [
    { nombre: "🔥", id: "boton-fuego", foto:"./imagenes/fuego final.png", alt: "Fuego" },
    { nombre: "🔥", id: "boton-fuego", foto:"./imagenes/fuego final.png", alt: "Fuego" },
    { nombre: "🔥", id: "boton-fuego", foto:"./imagenes/fuego final.png", alt: "Fuego" },
    { nombre: "💧", id: "boton-agua", foto:"./imagenes/agua final.png", alt: "Agua" },
    { nombre: "🌱", id: "boton-tierra",foto:"./imagenes/tierra final.png", alt: "Tierra" },
]
rata.ataques.push(...rataAtaques)
/* rataEnemigo.ataques.push(...rataAtaques) */

const langostaAtaques = [
    { nombre: "💧", id: "boton-agua", foto:"./imagenes/agua final.png", alt: "Agua" },
    { nombre: "💧", id: "boton-agua", foto:"./imagenes/agua final.png", alt: "Agua" },
    { nombre: "🌱", id: "boton-tierra",foto:"./imagenes/tierra final.png", alt: "Tierra" },
    { nombre: "🔥", id: "boton-fuego", foto:"./imagenes/fuego final.png", alt: "Fuego" },
    { nombre: "🔥", id: "boton-fuego", foto:"./imagenes/fuego final.png", alt: "Fuego" },
]
langosta.ataques.push(...langostaAtaques)
/* langostaEnemigo.ataques.push(...langostaAtaques) */

const gusanoAtaques = [
    { nombre: "💧", id: "boton-agua", foto:"./imagenes/agua final.png", alt: "Agua" },
    { nombre: "💧", id: "boton-agua", foto:"./imagenes/agua final.png", alt: "Agua" },
    { nombre: "🌱", id: "boton-tierra",foto:"./imagenes/tierra final.png", alt: "Tierra" },
    { nombre: "🌱", id: "boton-tierra",foto:"./imagenes/tierra final.png", alt: "Tierra" },
    { nombre: "🔥", id: "boton-fuego", foto:"./imagenes/fuego final.png", alt: "Fuego" },
]
gusano.ataques.push(...gusanoAtaques)
/* gusanoEnemigo.ataques.push(...gusanoAtaques) */

const dragonAtaques = [
    { nombre: "💧", id: "boton-agua", foto:"./imagenes/agua final.png", alt: "Agua" },
    { nombre: "🌱", id: "boton-tierra",foto:"./imagenes/tierra final.png", alt: "Tierra" },
    { nombre: "🌱", id: "boton-tierra",foto:"./imagenes/tierra final.png", alt: "Tierra" },
    { nombre: "🔥", id: "boton-fuego", foto:"./imagenes/fuego final.png", alt: "Fuego" },
    { nombre: "🔥", id: "boton-fuego", foto:"./imagenes/fuego final.png", alt: "Fuego" },
]
dragon.ataques.push(...dragonAtaques)
/* dragonEnemigo.ataques.push(...dragonAtaques) */

mokepones.push(hipopotamo, carpincho, rata, langosta, gusano, dragon)

function iniciarJuego(){
    sectionReiniciar.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opciónDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
                <label class="tarjetaDeMokepon" for=${mokepon.nombre}>
                    <p>${mokepon.nombre}</p>
                    <img src=${mokepon.foto} alt=${mokepon.nombre}>
                </label>
        `
    contenedorTarjetas.innerHTML += opciónDeMokepones

    inputRata = document.getElementById("Rata")
    inputCarpincho = document.getElementById("Carpincho")
    inputHipopótamo = document.getElementById("Hipopótamo")
    inputLangosta = document.getElementById("Langosta")
    inputGusano = document.getElementById("Gusano")
    inputDragon = document.getElementById("Dragon")

    })

    sectionSeleccionarAtaques.style.display = "none"
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)
    
    unirseAlJuego()
}
function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function(respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}
function reproducirAudio(){
    audio.play()
    audio.loop = true
}
function pausarAudio() {
    audio.pause()
}
function detenerAudio(){
    audio.pause()    
    audio.currentTime = 0
}

function seleccionarMascotaJugador() {
            sectionSeleccionarMascota.style.display = "none"
            sectionVerMapa.style.display = "flex"
            sectionBotonesAudio.style.display = "none"
           

        if (inputRata.checked){
                spanMascotaJugador.innerHTML = inputRata.id
                mascotaJugador = inputRata.id
                tipoMokJug = rata.tipo
            } else if (inputCarpincho.checked){
                spanMascotaJugador.innerHTML = inputCarpincho.id
                mascotaJugador = inputCarpincho.id
                tipoMokJug = carpincho.tipo
            } else if (inputHipopótamo.checked){
                spanMascotaJugador.innerHTML = inputHipopótamo.id
                mascotaJugador = inputHipopótamo.id
                tipoMokJug = hipopotamo.tipo
            } else if (inputLangosta.checked){
                spanMascotaJugador.innerHTML = inputLangosta.id
                mascotaJugador = inputLangosta.id
                tipoMokJug = langosta.tipo
            } else if (inputGusano.checked){
                spanMascotaJugador.innerHTML = inputHipopótamo.id
                mascotaJugador = inputGusano.id
                tipoMokJug = gusano.tipo
            } else if (inputDragon.checked){
                spanMascotaJugador.innerHTML = inputDragon.id
                mascotaJugador = inputDragon.id
                tipoMokJug = dragon.tipo
            } else {
                alert("Debe seleccionar su mascota")
                reiniciarJuego()
            }
            seleccionarMokepon(mascotaJugador)
            iniciarMapa()         
    }

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {    
        method: "post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    tipoMokEne = enemigo.tipo
    ataquesMokeponEnemigo = enemigo.ataques
    console.log(tipoMokJug)
    console.log(tipoMokEne)
    extraerAtaques(mascotaJugador)
}


function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques) {
    ataques.forEach((ataques) => {
        ataquesMokepon = `
        <button id=${ataques.id} class="BAtaque" >${ataques.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaque")
    secuenciaAtaque()
}
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#FFD7C4"
                boton.disabled = true
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#FFD7C4"
                boton.disabled = true
            } else {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#FFD7C4"
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }         
        })                   
    })
}

function enviarAtaques(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`,{
        method : "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function(res){
            if (res.ok){
                res.json()
                    .then(function ({ataques}){
                        if (ataques.length === 5){
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function ataqueRandomEnemigo() {
    console.log("ataques enemigo", ataquesMokeponEnemigo)
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);
        if (ataqueAleatorio <= 1) {
            tipoAtaque = "FUEGO";
        } else if (ataqueAleatorio === 3 || ataqueAleatorio === 4) {
            tipoAtaque = "AGUA";
        } else {
            tipoAtaque = "TIERRA";
        }
        ataqueEnemigo.push(tipoAtaque)
        console.log(ataqueEnemigo);
        iniciarPelea();
}
function iniciarPelea(){
    if (ataqueJugador.length === 5) {
        combate()
    } 
}

function crearMensaje(){
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}
function crearMensajeFinal(resultadoFinal){
    sectionReiniciar.style.display = "flex"

    let parrafo = document.createElement("p")

    sectionMensajes.innerHTML = resultadoFinal
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max - min + 1)+ min) 
}

function indexAmbosOponentes (jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes (index, index)
            resultado = " Empataste 🤝"
            crearMensaje()
        } else if (ataqueJugador[index] == "FUEGO" && ataqueEnemigo[index] == "TIERRA" || ataqueJugador[index] == "AGUA" && ataqueEnemigo[index] == "FUEGO" || ataqueJugador[index] == "TIERRA" && ataqueEnemigo[index]   == "AGUA" ) {
            indexAmbosOponentes (index, index)
            resultado = " Ganaste 🎉"
            crearMensaje()
            indexAmbosOponentes (index, index)
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else {
            indexAmbosOponentes (index, index)
            resultado = " Perdiste 🥲"
            crearMensaje()
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        } 
    }
    revisarVictorias()
}

function revisarVictorias(){
    if (victoriasJugador == victoriasEnemigo){
        crearMensajeFinal("Es un empate")
    }else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("Felicidades ganaste")
    }else {
        crearMensajeFinal("Lo siento perdiste :c")
    }
}

function reiniciarJuego() {
        location.reload()
}

function pintarCanvas() {
    
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion( mascotaJugadorObjeto.x,  mascotaJugadorObjeto.y)
    
    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })

}
function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok){
            res.json()
                .then(function({ enemigos }){
                    console.log(enemigos)
                    
                    mokeponesEnemigos = enemigos.map(function (enemigo) {     
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""                    
                        if (mokeponNombre === "Hipopotamo") {
                            mokeponEnemigo = new Mokepon("Hipopótamo", "./imagenes/hipopótamo.png", 5, "Agua", "./imagenes/hipopótamo cabezaa.png", enemigo.id)
                        }else if (mokeponNombre === "Carpincho"){
                            mokeponEnemigo = new Mokepon("Carpincho", "./imagenes/carpincho.png", 5, "Tierra", "./imagenes/carpincho cabezaa.png", enemigo.id)
                        }else if (mokeponNombre === "Rata"){
                            mokeponEnemigo = new Mokepon("Rata", "./imagenes/rata.png", 5, "Fuego", "./imagenes/rata cabezaa.png", enemigo.id)
                        }else if (mokeponNombre === "Langosta"){
                            mokeponEnemigo = new Mokepon("Langosta", "./imagenes/langosta.png", 5, "Agua", "./imagenes/langosta cabezaa.png", enemigo.id)
                        }else if (mokeponNombre === "Gusano") {
                            mokeponEnemigo = new Mokepon("Gusano", "./imagenes/gusano.png", 5, "Tierra", "./imagenes/gusano cabezaa.png", enemigo.id)
                        }else if (mokeponNombre === "Dragon"){
                            mokeponEnemigo = new Mokepon("Dragon", "./imagenes/dragon.png", 5, "Fuego", "./imagenes/dragon cabezaa.png", enemigo.id)
                        }
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                        return mokeponEnemigo
                    })                             
                })
        }
    })
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadY = 0
    mascotaJugadorObjeto.velocidadY = 0
    mascotaJugadorObjeto.velocidadX = 0
}

function sePresionoUnaTecla(event) {
    console.log(event.key)
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break;
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}
function obtenerObjetoMascota() {

    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }    
}
function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo= enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota= mascotaJugadorObjeto.x
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    console.log("se det coli");

    enemigoId = enemigo.id
    clearInterval(intervalo)  
    sectionSeleccionarAtaques.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}
 

window.addEventListener("load", iniciarJuego)
