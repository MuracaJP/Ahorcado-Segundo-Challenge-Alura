var palabras = ["SOFTWARE", "HARDWARE", "ESTUDIO", "COMPUTAR", "RESOLVER", "PROBLEMA", "SOLUCION", "PROGRAMA", "DISEÑAR"];
const caracteresValidos = new RegExp("[A-ZÑ]");

//Variables
var palabraEnJuego = palabraAleatoria();
var palabraSeparada = separarPalabra();
var inputValido;
var letrasIngresadas = [];
var contadorErrores;

//Selectores
var iniciarBtn = document.getElementById("iniciarBtn");
var botonesPrincipal = document.getElementById("botonesContainer");
var botonesEnJuego = document.getElementById("botonesEnJuego");
var palabraContainer = document.getElementById("palabraContainer");
var letrasIncorrectasContainer = document.getElementById("fallosContainer");

//Genera la palabra a adivinar
function palabraAleatoria() {
    var palabra = palabras[Math.floor(Math.random() * palabras.length)];
    return palabra;
}

//Convierte la palbra en array
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
    validarTeclaPresionada(e);
    
    //Comprueba que la letra ingresada no sea repetida
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
        } else if (!palabraEnJuego.includes(teclaPresionada)) {
            let error = document.createElement("p");
            error.textContent = teclaPresionada;
            error.classList.add("errores");
            letrasIncorrectasContainer.appendChild(error);
            contadorErrores++;
            return
        }
    }
}

//Pinta el ahorcado según la cantidad de errores 
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

