const socket = io();

function sendCode() {
  const code = document.getElementById('code').value;
  socket.emit('message', code);
}

socket.on('result', (msg) => {
  document.getElementById('result').innerText = msg;
});
