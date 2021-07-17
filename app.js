const express = require('express');
const app = express();

app.set('port', process.env.PORT);

const server = app.listen(app.get("port"), ()=>{
    console.log("Server running");
})

const io = require("socket.io")(server, {cors : {origin : "*"}});

app.get("/", (req, res)=>{
    res.send("Hi");
})

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on("sms", (data) => {
        socket.broadcast.emit("sms", data);
        console.log(data);
    })
})
