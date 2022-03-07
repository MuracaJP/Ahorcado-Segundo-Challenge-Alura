var palabras = ["SOFTWARE", "HARDWARE", "ESTUDIO", "COMPUTAR", "RESOLVER", "PROBLEMA", "SOLUCION", "PROGRAMA", "DISEÑAR"];
const caracteresValidos = new RegExp("[A-ZÑ]");

//Variables
var palabraEnJuego = palabraAleatoria();
var palabraSeparada = separarPalabra();
var letrasIngresadas = [];
var letrasCorrectas = [];
var contadorErrores = 0;
var triunfo = false;

//Selectores
var iniciarBtn = document.getElementById("iniciarBtn");
var botonesPrincipal = document.getElementById("botonesContainer");
var botonesEnJuego = document.getElementById("botonesEnJuego");
var palabraContainer = document.getElementById("palabraContainer");
var letrasIncorrectasContainer = document.getElementById("fallosContainer");
var mensajeContainer = document.getElementById("mensaje");
var nuevoJuegoBtn = document.getElementById("nuevoJuegoBtn");
var desistirBtn = document.getElementById("desistirBtn")

//Genera la palabra a adivinar
function palabraAleatoria() {
    var palabra = palabras[Math.floor(Math.random() * palabras.length)];
    return palabra;
}

//Convierte la palabra en array
function separarPalabra() {
    var palabraSeparada = palabraEnJuego.split("");
    return palabraSeparada;
}

//Crea los guiones y esconde la palabra a adivinar
palabraSeparada.forEach(letra => {
    let contenedor = document.getElementById("palabraContainer")
    let guiones = document.createElement("div");
    let letras = document.createElement("p");
    letras.innerHTML = letra;

    guiones.classList.add("letras");
    letras.classList.add("esconder");

    guiones.appendChild(letras);
    contenedor.appendChild(guiones);
})


iniciarBtn.addEventListener("click", iniciarJuego);



//Función principal
function iniciarJuego() {
    prepararTablero();
}

//Prepara la pantalla de juego
function prepararTablero() {
    botonesPrincipal.classList.add("esconder");
    palabraContainer.classList.remove("esconder");
    canvas.classList.remove("esconder");
    botonesEnJuego.classList.remove("esconder");
    letrasIncorrectasContainer.classList.remove("esconder");
    tablero();
}

//Detecta cuando se presiona una tecla y ejecuta una función
document.addEventListener("keypress", comprobarAcierto);

//Valida el input, si no es valida muestra mensaje
function validarTeclaPresionada(e) {
    teclaPresionada = e.key.toUpperCase();
    if (!caracteresValidos.test(teclaPresionada)) {
        alert("Por favor, ingrese una letra");
    }
}

//Comprueba si la letra ingresada es parte de la palabra o no
function comprobarAcierto(e) {
    let teclaPresionada = e.key.toUpperCase();

    //Comprueba que no se haya ganado ni perdido
    if (contadorErrores < 7 && !triunfo) {
        //Comprueba que la letra ingresada no sea repetida
        validarTeclaPresionada(e);
        if (letrasIngresadas.includes(teclaPresionada)) {
            alert(teclaPresionada + " ya fué ingresada, intente con otra letra");
            return;
        } else {
            letrasIngresadas.push(teclaPresionada);
        }

        let letrasContainer = document.getElementsByTagName("p");

        for (let i = 0; i < letrasContainer.length; i++) {
            let letra = letrasContainer[i].textContent;

            if (letra === teclaPresionada) {
                letrasContainer[i].classList.remove("esconder");
                letrasCorrectas.push(teclaPresionada);
                victoria();
            } else if (!palabraEnJuego.includes(teclaPresionada)) {
                let error = document.createElement("p");
                error.textContent = teclaPresionada;
                error.classList.add("errores");
                letrasIncorrectasContainer.appendChild(error);
                contadorErrores++;
                dibujandoAhorcado(contadorErrores);
                return;
            }
        }
    }

}

//Dibuja al ahorcado en función de los errores cometidos
function dibujandoAhorcado(contadorErrores) {
    switch (contadorErrores) {
        case 1:
            cabeza();
            break;
        case 2:
            torso();
            break;
        case 3:
            manoD();
            break;
        case 4:
            manoI();
            break;
        case 5:
            piernaD();
            break;
        case 6:
            PiernaI();
            break;
        case 7:
            muerto();
            break;
        default:
            break;
    }
}

//Función para mostrar mensaje de triunfo
function victoria() {
    if (letrasCorrectas.length === palabraEnJuego.length) {
        console.log(letrasCorrectas.length);
        console.log(palabraAleatoria.length);

        mensajeContainer.classList.remove("esconder");
        mensajeContainer.textContent = "¡Ganaste, felicidades!";
        mensajeContainer.style = "color:green";
        triunfo = true;
    }
}

//Detecta click en botón "desistir"
desistirBtn.addEventListener("click", desistir);

function desistir() {
    mensajeContainer.classList.remove("esconder");
    mensajeContainer.textContent = "La palabra secreta era: " + palabraEnJuego;
    mensajeContainer.style = "color:red";
    setTimeout(actualizar, 1500);
}

function actualizar() {
    location.reload();
    prepararTablero();
}