const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const config = require('./config');
const cors = require('cors');
const {Server}=require("socket.io");
const { Socket } = require('dgram');
const app = express();
const port = config.get('port');
const hostname = config.get('hostname');

app.use(cors());

const server =http.createServer(app);

const io=new Server(server,{
    cors:{
        origin: 'http://localhost:4242',
        credentials: true
    }
});

io.on("connection",(Socket)=>{
    console.log(Socket.id);

    Socket.on("disconnect",()=>{
        console.log("user dosconected",Socket.id);
    });
})
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/ in ${config.get('mode')} mode`);
  });