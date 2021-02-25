var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  socket.on('add_user', (userId) => {
    socket.join(`user_${userId}`);
  });

  socket.on('changed_scene', (msg) => {
    io.sockets.in(msg.room).emit('changed_scene', msg.data);
  });

  socket.on('play_video', (msg) => {
    io.sockets.in(msg.room).emit('play_video', msg.data);
  });

  socket.on('preview_video', (msg) => {
    io.sockets.in(msg.room).emit('preview_video', msg.data);
  });
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
