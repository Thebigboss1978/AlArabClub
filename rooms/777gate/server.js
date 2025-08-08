const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    if (msg === '700707') {
      socket.emit('result', '✅ تم التفعيل من خلال الرمز.');
    } else {
      socket.emit('result', '❌ رمز غير صحيح');
    }
  });
});

server.listen(7777, () => {
  console.log('⟁ Room 777 listening on http://localhost:7777');
});