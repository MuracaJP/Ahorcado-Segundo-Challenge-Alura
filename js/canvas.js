var pincel = canvas.getContext("2d");
var mover = (x, y) => pincel.moveTo(x, y);
var linea = (x, y) => pincel.lineTo(x, y);
var dibujar = () => pincel.stroke();

pincel.strokeStyle = "hsl(213, 84%, 24%)"
pincel.lineCap = "round"
pincel.lineWidth = 4;
pincel.font = "bold 18px Inter"
pincel.fillStyle = "hsl(213, 84%, 24%)"

function tablero() {
    //Base
    pincel.beginPath();
    mover(280, 350);
    linea(500, 350);
    dibujar();

    //Soporte vertical
    mover(330, 350);
    linea(330, 50);
    dibujar();

    //Soporte horizontal
    mover(330, 50);
    linea(470, 50);
    dibujar();

    //Soga
    mover(470, 50);
    linea(470, 100);
    dibujar();
    pincel.closePath();
}

function cabeza() {
    pincel.beginPath();
    pincel.arc(470, 125, 25, 0, Math.PI * 2);
    dibujar();
}

function torso() {
    mover(470, 150);
    linea(470, 250);
    dibujar();
}

function manoD() {
    mover(470, 150);
    linea(440, 200);
    dibujar();
}

function manoI() {
    mover(470, 150);
    linea(500, 200);
    dibujar();
}

function piernaD() {
    mover(470, 250);
    linea(440, 300);
    dibujar();
}

function PiernaI() {
    mover(470, 250);
    linea(500, 300);
    dibujar();
}

function muerto() {
    mover(455, 115);
    linea(465, 125);
    dibujar();
    mover(465, 115);
    linea(455, 125);
    dibujar();
    mover(475, 115);
    linea(485, 125);
    dibujar();
    mover(485, 115);
    linea(475, 125);
    dibujar();
}