const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = app.listen(5005, () => {
  console.log('Server is running on port 5005');
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

const calculateMetricAverages = (groomingId, metrics) => {
  let missingVotes = 0;
  const averages = {};
  // const weightedAverages = [];
  const excelAverages = [];
  const participantData = groomings[groomingId];
  const numObjects = participantData?.length;

  for (let i = 0; i < numObjects; i++) {
    const formData = participantData[i].formData;
    const keys = Object.keys(formData);

    if (!Object.keys(formData).length) {
      missingVotes++;
    }

    for (const element of keys) {
      const key = element;
      if (!averages.hasOwnProperty(key)) {
        averages[key] = 0;
      }

      averages[key] += Number(formData[key]);
    }
  }

  for (const key in averages) {
    if (averages.hasOwnProperty(key)) {
      averages[key] /= numObjects - missingVotes;
      const weight = metrics.find((metric) => metric.name === key).weight;
      // const weightedAverage = Number(((averages[key] * weight) / 100).toFixed(2));
      // weightedAverages.push(weightedAverage);
      if (weight) {
        excelAverages.push(Number(averages[key].toFixed(2)));
      }
    }
  }

  // const score = (weightedAverages.reduce((acc, curr) => acc + curr, 0) * 25 - 25).toFixed(2);
  const score = ((excelAverages.reduce((acc, curr) => acc + curr, 0) / excelAverages.length) * 25 - 25).toFixed(2);

  return { averages, score };
};

const calculateScore = (metrics, averages) => {
  const excelAverages = [];
  // const weightedAverages = [];
  for (const key in averages) {
    const weight = metrics.find((metric) => metric.name === key).weight;
    // const weightedAverage = Number(((averages[key] * weight) / 100).toFixed(2));
    // weightedAverages.push(weightedAverage);
    if (weight) {
      excelAverages.push(Number(averages[key].toFixed(2)));
    }
  }

  // const score = (weightedAverages.reduce((acc, curr) => acc + curr, 0) * 25 - 25).toFixed(2);
  const score = ((excelAverages.reduce((acc, curr) => acc + curr, 0) / excelAverages.length) * 25 - 25).toFixed(2);

  return score;
};

// Handle incoming socket connections
io.on('connection', (socket) => {
  // We need to handle here from cookies later.
  const groomingId = socket.handshake.query.groomingId;
  const stringifiedUser = socket.handshake.query.user;
  const user = JSON.parse(stringifiedUser);

  // If no one in the room, create new one.
  if (!groomings[groomingId]) {
    groomings[groomingId] = [];
  }

  // If user already connected, just add socket to his / her object.
  if (connectedUsers[user.id]) {
    connectedUsers[user.id].socketIds.push(socket.id);
  } else {
    // If new user create necessary data.
    connectedUsers[user.id] = { ...user, groomingId, formData: {} };
    connectedUsers[user.id].socketIds = [socket.id];
  }

  // handle user to join grooming if he / she not join before
  const isUserExistInGrooming = groomings[groomingId].some((participant) => participant.id === user.id);
  if (!isUserExistInGrooming) {
    groomings[groomingId].push(connectedUsers[user.id]);
  }

  socket.join(groomingId);
  io.to(groomingId).emit('userJoined', { joinedUser: connectedUsers[user.id], allUsers: groomings[groomingId] });

  socket.on('changeTask', (data) => {
    const { groomingId, taskNumber } = data;

    groomings[groomingId] = groomings[groomingId]?.map((grooming) => {
      grooming.formData = {};
      return grooming;
    });

    io.to(groomingId).emit('changeTask', { taskNumber, allUsers: groomings[groomingId] });
  });

  socket.on('userVote', (data) => {
    const { groomingId, formData, userId } = data;

    const voter = groomings[groomingId]?.find((user) => user.id === userId);
    const voterIndex = groomings[groomingId]?.findIndex((user) => user.id === userId);
    voter.formData = formData;
    groomings[groomingId].splice(voterIndex, 1, voter);

    io.to(groomingId).emit('userVote', groomings[groomingId]);
  });

  socket.on('calculateTaskResult', (data) => {
    const { groomingId, metrics, currentTaskNumber, taskId } = data;
    const result = calculateMetricAverages(groomingId, metrics);
    result.currentTaskNumber = currentTaskNumber;
    result.taskId = taskId;

    io.to(groomingId).emit('calculateTaskResult', result);
  });

  socket.on('updateTaskResult', (data) => {
    const { taskResult, groomingId, metrics } = data;
    const newScore = calculateScore(metrics, taskResult.averages);
    const result = {
      ...taskResult,
      score: newScore,
    };
    io.to(groomingId).emit('updateTaskResult', result);
  });

  socket.on('startGame', (data) => {
    const { groomingId, isGameStarted } = data;
    io.to(groomingId).emit('startGame', isGameStarted);
  });

  socket.on('taskSelection', (data) => {
    const { groomingId, tasks } = data;

    io.to(groomingId).emit('taskSelection', tasks);
  });

  socket.on('finishGrooming', (groomingId) => {
    io.to(groomingId).emit('finishGrooming');
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
    const disconnectedSocketId = socket.id;
    const disconnectedUser = Object.values(connectedUsers).find((user) =>
      user.socketIds.includes(disconnectedSocketId)
    );

    const disconnectedSocketIdIndex = disconnectedUser?.socketIds.findIndex(
      (socketId) => socketId === disconnectedSocketId
    );
    disconnectedUser?.socketIds.splice(disconnectedSocketIdIndex, 1);

    setTimeout(() => {
      if (disconnectedUser?.socketIds.length === 0) {
        const disconnectedUserIndex = groomings[disconnectedUser.groomingId].findIndex(
          (participant) => participant.id === disconnectedUser.id
        );
        groomings[disconnectedUser.groomingId].splice(disconnectedUserIndex, 1);
        delete connectedUsers[disconnectedUser.id];
        io.to(disconnectedUser.groomingId).emit('disconnectedUser', {
          disconnectedUser: connectedUsers[disconnectedUser.id],
          allUsers: groomings[disconnectedUser.groomingId],
        });
      }
    }, [10000]);
  });
});
