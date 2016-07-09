 /* App - 
 Semillero de Investigación en Tecnologia Electrónica Aplicada SINTEA

 By Yohon Jairo Bravo Castro
 	bravo2008@misena.edu.co
 	Palmira 2016
 */
 
 var app = require("express")();
 var express = require("express");
 
 app.use('/public',express.static(__dirname + '/public'));
 var http = require("http").Server(app);
 var io = require("socket.io")(http);
 
 var serialport = require("serialport");
 var SerialPort = serialport.SerialPort;
 
 var mySocket;

 app.get("/", function(req, res){
 	res.sendFile(__dirname +"/view/index.html");
 });
 

 var mySerial = new SerialPort("/dev/ttyUSB0", {
 	baudrate : 9600,
 	parser : serialport.parsers.readline("\n")
 });
 

 mySerial.on("open", function(){
 	console.log("Arduino coneccion estabelecida!");
 });
 

 mySerial.on("data", function(data){
 	console.log(data);
 	io.emit("datosArduino", { 
 		valor: data
 	});

 	
 });
 

 io.on("connection", function(socket){
 	console.log("Usuario está conectádo!");

 	socket.on("apagadoEmergencia",function(data){
 		
 		mySerial.write(data.data, function(err, results) {
				if(err) console.log('err ' + err);
						        
				console.log('results ' + results);
			});
	 });

 });
 

 http.listen("3000", function(){
 	console.log("Servidor on-line http://localhost:3000 - para salir Ctrl+C.");
 });