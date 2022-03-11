var palabras = ["SOFTWARE", "HARDWARE", "ESTUDIO", "COMPUTAR", "RESOLVER", "PROBLEMA", "SOLUCION", "PROGRAMA", "DISEÑAR"];
const caracteresValidos = new RegExp("[A-ZÑ]");

//Variables
var palabraEnJuego = palabraAleatoria();
var palabraSeparada = separarPalabra();
var letrasIngresadas = [];
var letrasCorrectas = [];
var contadorErrores = 0;
var triunfo = false;
var inputValido;

//Selectores
//Botones
var iniciarBtn = document.getElementById("iniciarBtn");
var agregarPalabraBtn = document.getElementById("agregarPalabraBtn");
var guardarEmpezar = document.getElementById("guardar");
var nuevoJuegoBtn = document.getElementById("nuevoJuegoBtn");
var desistirBtn = document.getElementById("desistirBtn");
var inputAgregar = document.getElementById("ingresePalabra");
var cancelarBtn = document.getElementById("cancelar");
//Contenedores
var inicio = document.getElementById("pantallaInicio");
var pantallaJuego = document.getElementById("pantallaJuego");
var botonesPrincipal = document.getElementById("botonesContainer");
var botonesEnJuego = document.getElementById("botonesEnJuego");
var palabraContainer = document.getElementById("palabraContainer");
var letrasIncorrectasContainer = document.getElementById("fallosContainer");
var mensajeContainer = document.getElementById("mensaje");
var agregarPalabraContainer = document.getElementById("agregarPalabraContainer");

//Genera la palabra a adivinar
function palabraAleatoria() {
    var palabra = palabras[Math.floor(Math.random() * palabras.length)];
    return palabra;
}

//Separa la palabra letra por letra
function separarPalabra() {
    var palabraSeparada = palabraEnJuego.split("");
    return palabraSeparada;
}

//Crea los guiones y esconde la palabra a adivinar
function crearGuiones(palabraSeparada) {
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
}

iniciarBtn.addEventListener("click", prepararTablero);

//Prepara la pantalla de juego
function prepararTablero() {
    inicio.classList.add("esconder");
    pantallaJuego.classList.remove("esconder");
    tablero();
    crearGuiones(palabraSeparada);
}

//Detecta cuando se presiona una tecla
document.addEventListener("keypress", comprobarAcierto);

//Valida el input, si no es valido muestra mensaje
function validarTeclaPresionada(e) {
    teclaPresionada = e.key.toUpperCase();
    if (!caracteresValidos.test(teclaPresionada)) {
        inputValido = false;
    } else {
        inputValido = true;
    }
}

//Comprueba si la letra ingresada es parte de la palabra secreta o no
function comprobarAcierto(e) {
    let teclaPresionada = e.key.toUpperCase();
    validarTeclaPresionada(e);
    //Comprueba que este en la pantalla de juego (para evitar ejecutar cuando se agrega palabra) 
    if (pantallaJuego.classList.value == "pantallaJuego") {
        //Comprueba que no se haya ganado ni perdido
        if (contadorErrores < 7 && !triunfo) {
            if (inputValido === true) {
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
        mensajeContainer.classList.remove("esconder");
        mensajeContainer.textContent = "¡Ganaste, felicidades!";
        mensajeContainer.style = "color:green";
        triunfo = true;
    }
}

nuevoJuegoBtn.addEventListener("click", nuevoJuego);

function nuevoJuego() {
    actualizar();
}

desistirBtn.addEventListener("click", desistir);

function desistir() {
    mensajeContainer.classList.remove("esconder");
    mensajeContainer.textContent = "La palabra secreta era: " + palabraEnJuego;
    mensajeContainer.style = "color:red";
    setTimeout(actualizar, 1500);
}

function actualizar() {
    location.reload();
}

agregarPalabraBtn.addEventListener("click", agregarPalabra);

function agregarPalabra() {
    inicio.classList.add("esconder");
    agregarPalabraContainer.classList.remove("esconder");
}

guardarEmpezar.addEventListener("click", empezar);

function empezar() {
    let palabra = document.getElementsByClassName("ingresePalabra")[0].value;
    let palabraMayus = palabra.toUpperCase();
    if (palabra.length <= 8 && palabra.length != 0) {
        palabras.push(palabraMayus);
        agregarPalabraContainer.classList.add("esconder");
        prepararTablero();
    } else {
        alert("La palabra tiene mas de 8 letras o no tiene letras");
        document.getElementsByClassName("ingresePalabra")[0].value = "";
    }
}

cancelarBtn.addEventListener("click", nuevoJuego);
