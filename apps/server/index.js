const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

const io = socketIO(server, {
  cors: {
    origin: 'https://pollgroo-web-git-plgr-socket-poc-trendyol-web-team.vercel.app',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (message) => {
    console.log('Received message:', message);
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/data', (req, res) => {
  const data = {
    message: 'Test request!',
    timestamp: new Date().toISOString(),
  };

  res.json(data);
});
