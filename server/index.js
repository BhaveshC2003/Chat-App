const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const users = [];

const app = express();
app.use(cors);
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('New connection');
        socket.on('joined',({userName})=>{
        users[socket.id] = userName;
        socket.emit('greet',{message:`Sup ${users[socket.id]}`});
        socket.broadcast.emit('userJoined',{message: `${users[socket.id]} has joined the chat`});
    });

    socket.on('sendMessageToServer',({message,id})=>{
        io.emit('sendMessageToUser',{user: users[id],id,message});
    });

});

server.listen(8080,()=>console.log("Server running"));