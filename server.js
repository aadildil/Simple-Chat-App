const express = require('express');
const socketIO=require('socket.io');
const http=require('http');



const app = express();
const {Server}=socketIO;
const server=http.createServer(app); 
const IO=new Server(server);

const port = 3333;

app.use(express.static('client'));

function onStartFun() {
    console.log("Server is online");
}

server.listen(port, onStartFun);

IO.on('connection',(socket)=>{
    console.log('connection established',socket.id);

    socket.on('chat message',(data)=>{
        IO.emit('chat message',data);
    })

    socket.on('disconnect',()=>{
        console.log("left the chat ");
    })
})