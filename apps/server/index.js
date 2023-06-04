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
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

let groomings = {};
let connectedUsers = {};

// Handle incoming socket connections
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', (groomingId, user) => {
    console.log(`Client joined game room: ${groomingId}${user}`);
    console.log(user.fullname);

    if (!groomings[groomingId]) {
      groomings[groomingId] = [];
    }

    connectedUsers[socket.id] = { ...user, groomingId, formData: {} };

    groomings[groomingId].push(connectedUsers[socket.id]);

    socket.join(groomingId);

    io.to(groomingId).emit('userJoined', { joinedUser: user, allUsers: groomings[groomingId] });
  });

  socket.on('changeTask', (data) => {
    const { groomingId, taskNumber } = data;

    groomings[groomingId] = groomings[groomingId].map((grooming) => {
      grooming.formData = {};
      return grooming;
    });

    io.to(groomingId).emit('changeTask', { taskNumber, allUsers: groomings[groomingId] });
  });

  socket.on('userVote', (data) => {
    const { groomingId, formData, userId } = data;
    console.log(data);

    const voter = groomings[groomingId]?.find((user) => user.id === userId);
    const voterIndex = groomings[groomingId]?.findIndex((user) => user.id === userId);
    voter.formData = formData;
    groomings[groomingId].splice(voterIndex, 1, voter);

    io.to(groomingId).emit('userVote', groomings[groomingId]);
  });

  socket.on('disconnect', () => {
    const disconnectedUserGroomingId = connectedUsers[socket.id]?.groomingId;
    const userIndex = groomings[disconnectedUserGroomingId]?.findIndex(
      (participant) => participant.id === connectedUsers[socket.id]?.id
    );
    groomings[disconnectedUserGroomingId]?.splice(userIndex, 1);
    io.to(disconnectedUserGroomingId).emit('disconnectedUser', {
      disconnectedUser: connectedUsers[socket.id],
      allUsers: groomings[disconnectedUserGroomingId],
    });
    delete connectedUsers[socket.id];
  });
});
