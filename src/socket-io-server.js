var app = require('express')();
var server =require('http').Server(app);
var io= require('socket.io')(server);

io.on('connection', function (socket){
    console.log("connected to socket");
    socket.emit('test event','Hello App');
});

server.listen(3000, () =>{
    console.log("Socket.io server is listening on port 3000")
});
socket.on("my message", (msg) => {
    feedback.html('');
    message.val('');
    io.append('my broadcast', `server: ${msg}`+ data.name + ": " + data.rating + "")
});
