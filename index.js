const http=require("http");
const express =require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app=express();
const port=4000


const users=[{}];

app.use(cors());
app.get("/",(req,res)=>{
    res.send("Chat room");
})

const server=http.createServer(app);

const io=socketIO(server);

io.on("connection",(socket)=>{
    console.log("New Connection");

    socket.on('joined',({user})=>{
          users[socket.id]=user;
          socket.broadcast.emit('userJoined',{user:"Bot",message:` ${user} has joined`});
          socket.emit('welcome',{user:"Bot",message:`hii -${user} `})
    })

    socket.on('message',({message,id,user})=>{
        io.emit('sendMessage',{user:user,message,id});
    })

    socket.on('userDisconnect',()=>{
          socket.broadcast.emit('leave',{user:"Bot",message:`${users[socket.id]}  has left`});
        console.log(`user left`);
    })
});

server.listen(port,()=>{
   
})