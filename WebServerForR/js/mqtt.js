var garagek;
var led1k;
var led2k;
var fank;

$(function(){
	
	socket.on("iot4-client-light1",function(data){
		led1k=data.status;
	});
	socket.on("iot4-client-light2",function(data){
		led2k=data.status;
	});
	socket.on("iot4-client-fan",function(data){
		//fank=data.value;
	});
	socket.on("iot4-client-garage",function(data){
		garagek=data.status;
	});
	socket.on("iot4-client-temperature",function(data){
		$("#calor").html(data.value);
	});

});

function myFunction() {
  let foco;
	if (led1k==0) {
		foco=1;
		document.getElementById('otro1').src = "img/foco.svg";
	}
	else{
		foco=0;
		document.getElementById('otro1').src = "img/foco-off.svg";
	}
  socket.emit("iot4-client-trigger-light1", foco);
}
function myFunction2() {
  let foco2;
	if (led2k==0) {
		foco2=1;
		document.getElementById('otro2').src = "img/foco.svg";
	}
	else{
		foco2=0;
		document.getElementById('otro2').src = "img/foco-off.svg";
	}
  socket.emit("iot4-client-trigger-light2", foco2);
}
function Fan() {
 // socket.emit("init", 'hola cain');
}
function garage() {
	let puerta;
	if (garagek==0) {
		puerta=1;
		document.getElementById('door').src = "img/door-open.svg";
	}
	else{
		puerta=0;
		document.getElementById('door').src = "img/door-closed.svg";
	}
  socket.emit("iot4-client-trigger-garage", puerta);
}
