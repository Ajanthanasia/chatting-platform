const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const config = require('./config');
const memberRoutes = require('./routes/members');

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

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/ in ${config.get('mode')} mode`);
});


const users = {};

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('userDetails', async (data) => {
    const {username, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10); 
    users[socket.id] = {username, email, password: hashedPassword }; 
    console.log('User saved:', users[socket.id]);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    delete users[socket.id]; 
  });
});
