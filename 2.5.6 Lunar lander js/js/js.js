var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel = null;
var fuel=100; 
var finished= false;

//al cargar por completo la página...
window.onload = function(){
	//definición de eventos
	//mostrar menú móvil
   /* document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("right")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("right")[0].style.display = "none";
		start();
	}*/

//encender/apagar el motor al hacer click en la pantalla
	document.getElementById("imgnave").onclick = function(){
	  if (a==g){
  		motorOn();
 	  } else {
  		motorOff();
 	  }
	}
    //press space 
	window.onkeydown=function(event) {
		if (event.keyCode==32)
		{motorOn();
		}
	}
	window.onkeyup=motorOff;
	//Empezar a mover nave
	start();
	document.getElementById("tryAgain").onclick=function(){restart();}
	document.getElementById("playAgain").onclick=function(){restart();}
}

//Definición de funciones
function motorOn(){
	if (!finished){
		a=-g;
		document.getElementById("imgnave").src = "img/nave_on.png";
		if (timerFuel==null)
		timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
	}
}
function motorOff(){
	if (!finished){
		a=g;
		document.getElementById("imgnave").src = "img/nave.png";
		clearInterval(timerFuel);
		timerFuel=null;
	}
}
function actualizarFuel(){
	//Aquí hay que cambiar el valor del marcador de Fuel...
	fuel-=0.1;
	document.getElementById("fuel").innerHTML=fuel.toFixed(2);
	if (fuel<=0){
		motorOff();
		document.getElementById("fuel").innerHTML=0;
	}	
}

function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=v.toFixed(2);
	
	y +=v*dt;
	document.getElementById("altura").innerHTML=(80-y).toFixed(2);
	
	//mover hasta que top sea un 80% de la pantalla
	if (y<80){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		stop();
		quitGame();
	}
}
function pause() {
	stop();
	document.getElementById("pause").style.display="none";
	document.getElementById("play").style.display="inline-block";
}

function play() {
	start();
	document.getElementById("play").style.display="none";
	document.getElementById("pause").style.display="inline-block";
}

function restart() {
	window.location.reload();
}

function quitGame() {
	if (v>5) {
		document.getElementById("imgnave").src="img/nave_rota.png";
		document.getElementById("quitGame").style.display="block";
		finished=true;
	}
	else{
		document.getElementById("win").style.display="block";
		motorOff();
		finished=true;
	}
}

