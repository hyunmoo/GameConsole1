var express = require('express');
var app = express();
var http = require('http').Server(app);

var count = 0;

var io = require('socket.io')(http); // io : 멀티탭, 소켓 : 멀티탭 소켓 한개 

io.on('connection', function(socket){ // 이벤트 샐행 되었을 때 
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('move', function(msg){
		console.log('move: ' + msg);
		io.emit('move', msg);
	});
});


app.get('/dynamic', function(req, res){
	count = count + 1;
	res.send('<h1>You are the ' + count + 'st visitor.</h1>');
});

app.use(express.static(__dirname));

http.listen(3000, function(){
	console.log('listening on *:3000');
});