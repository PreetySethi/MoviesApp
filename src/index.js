const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


var name = $("#name")
var new_message = $("#new_message")
var rating = $("#rating")

//Emit message
new_message.click(function(){
    socket.emit('new_message', {message : message.val()})
})

//Listen on new_message
socket.on("new_message", (data) => {
    feedback.html('');
    message.val('');
    chatroom.append("<p class='message'>" + data.name + ": " + data.rating + "</p>")
})


app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
