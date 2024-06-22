const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const config = require('./config');
const memberRoutes = require('./routes/members');
// const channelRoutes = require('./routes/channels');
const channelRoutes =require('./routes/members');

const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = config.get('port');
const hostname = config.get('hostname');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/members', memberRoutes);
app.use('/api/channels', channelRoutes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/ in ${config.get('mode')} mode`);
});
const users = {};
const channels = {};

io.on('connection', (socket) => {
  socket.on('userDetails', async (data) => {
    const { username, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    users[socket.id] = { username, email, password: hashedPassword };
    console.log('User saved:', users[socket.id]);
  });
  socket.on('createChannel', (data) => {
    const { userId, channelName } = data;
    if (!channels[channelName]) {
      channels[channelName] = { owner: userId, name: channelName, members: [userId], lastMessage: Date.now() };
      if (!users[userId].channels) users[userId].channels = [];
      users[userId].channels.push(channelName);
      socket.join(channelName);
      io.emit('globalMessage', `Channel ${channelName} created by ${users[userId].username}.`);
    } else {
      socket.emit('channelError', { message: 'Channel name already exists' });
    }
  });
  socket.on('deleteChannel', (data) => {
    const { userId, channelName } = data;
    const channel = channels[channelName];
    if (channel && channel.owner === userId) {
      delete channels[channelName];
      users[userId].channels = users[userId].channels.filter(name => name !== channelName);
      io.emit('globalMessage', `Channel ${channelName} deleted by ${users[userId].username}.`);
    } else {
      socket.emit('channelError', { message: 'Channel not found or you are not the owner' });
    }
  });
  socket.on('joinChannel', (data) => {
    const { userId, channelName } = data;
    if (channels[channelName]) {
      channels[channelName].members.push(userId);
      users[userId].channels.push(channelName);
      socket.join(channelName);
      io.to(channelName).emit('channelMessage', `${users[userId].username} has joined the channel.`);
    } else {
      socket.emit('channelError', { message: 'Channel not found' });
    }
  });
  socket.on('leaveChannel', (data) => {
    const { userId, channelName } = data;
    const channel = channels[channelName];
    if (channel) {
      channel.members = channel.members.filter(id => id !== userId);
      users[userId].channels = users[userId].channels.filter(name => name !== channelName);
      socket.leave(channelName);
      io.to(channelName).emit('channelMessage', `${users[userId].username} has left the channel.`);
    } else {
      socket.emit('channelError', { message: 'Channel not found' });
    }
  });
  
  socket.on('sendMessage', (data) => {
    const { userId, channelName, message } = data;
    if (channels[channelName]) {
      channels[channelName].lastMessage = Date.now();
      io.to(channelName).emit('channelMessage', `${users[userId].username}: ${message}`);
    } else {
      socket.emit('channelError', { message: 'Channel not found' });
    }
  });
  socket.on('listChannels', (data) => {
    const { searchString } = data;
    const channelList = Object.keys(channels).filter(name => name.includes(searchString));
    socket.emit('channelList', channelList);
  });
  socket.on('privateMessage', (data) => {
    const { userId, toUsername, message } = data;
    const recipientSocketId = Object.keys(users).find(id => users[id].username === toUsername);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('privateMessage', { from: users[userId].username, message });
    } else {
      socket.emit('userError', { message: 'User not found' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    delete users[socket.id];
  });
  setInterval(() => {
    const now = Date.now();
    Object.keys(channels).forEach(channelName => {
      if (now - channels[channelName].lastMessage > 5 * 60 * 1000) {
        const channel = channels[channelName];
        channel.members.forEach(id => {
          users[id].channels = users[id].channels.filter(name => name !== channelName);
        });
        delete channels[channelName];
        io.emit('globalMessage', `Channel ${channelName} has been deleted due to inactivity.`);
      }
    });
  }, 60 * 1000);
});
