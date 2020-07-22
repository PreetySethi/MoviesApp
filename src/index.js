const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
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
  });
});




io.on('connection', socket => {
  let previousId;
  const safeJoin = currentId => {
      socket.leave(previousId);
      socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
      previousId = currentId;
  }

  socket.on('getDoc', docId => {
      safeJoin(docId);
      socket.emit('document', documents[docId]);
  });

  socket.on('addDoc', doc => {
      documents[doc.id] = doc;
      safeJoin(doc.id);
      io.emit('documents', Object.keys(documents));
      socket.emit('document', doc);
  });

  socket.on('editDoc', doc => {
      documents[doc.id] = doc;
      socket.to(doc.id).emit('document', doc);
  });

  io.emit('documents', Object.keys(documents));

  console.log(`Socket ${socket.id} has connected`);
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
