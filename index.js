const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


let panel = new Array(30);
let timesteps = 20;
for (let i = 0; i < panel.length; i++) {
  panel[i] = new Array(timesteps);
}

for (let i = 0; i < panel.length; i++) {
  for (let j = 0; j < panel[0].length; j++) {
    panel[i][j] = false;
  }
}

// socket.io
io.on('connection', (socket) => {
  socket.emit('newPanel', { new_panel: panel });

  socket.on('changePanel', (data) => {
    panel[data.row][data.col] = data.val;

    io.emit('newPanel', { new_panel: panel });
  });
});

// timer
interval = 0;
setInterval(() => {
  io.emit('timeEvent', { interval: interval });
  interval = (interval + 1) % timesteps;
}, 500);


server.listen(port, (err) => {
  console.log(`Server running on port ${port}`);
});
