const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var message = $("#message")
	var name = $("#name")
  var rating = $("#rating")
  var send_data = $("#send_data")
	var update = $("#update")

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('my message', (msg) => {
    console.log('message: ' + msg);
    io.emit('my broadcast', `server: ${msg}`);
    send_data.append("" + msg.name + ": " + msg.rating + "")
  });

  //Emit message
	send_data.click(function(){
		socket.emit('new_message', {message : message.val()})
	})

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
