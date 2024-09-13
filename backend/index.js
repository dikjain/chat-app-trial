import express from 'express';
import { Server } from 'socket.io';
import {createServer} from 'http'
import cors from 'cors';
import path from 'path';



const port =3000

const app = express();
const server  = createServer(app);


const io = new Server(server,{cors:{
    origin: "*",
    methods:["GET","POST"],
    credentials:true
}
});

const __dirname = path.resolve()

let users = [];
let new_users = [];


app.use(express.static(path.join(__dirname, 'dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'dist','index.html'));
});

app.use(cors({
    origin: "*",
    methods:["GET","POST"],
    credentials:true
}))

io.on("connection",(socket)=>{
    socket.broadcast.emit("join")
    socket.emit("senddet",socket.id)
    socket.on("message",(data)=>{
        socket.broadcast.emit("recived-message",data);
    })
    socket.on("join",(data)=>{
        io.emit("recived-message",data);
        users.push({name : data.name , id : socket.id});
        io.emit("curr-user",users);
    })

    socket.on("disconnect", () => {
        const user = users.find((q) => q.id === socket.id); // Find the user that disconnected
        new_users = users.filter((q) => q.id !== socket.id);
        users = new_users;
        if (user) {
            io.emit("recived-message", {name: user.name,message: "Left",type: "notification",id:user.id});
        }

        io.emit("curr-user",users);
    
})
})



server.listen(port,()=>{
    console.log(`server is running at ${port}`);
    
})