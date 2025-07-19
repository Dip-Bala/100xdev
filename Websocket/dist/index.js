"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on("connection", function (socket) {
    socket.send("WS Connected");
    // setInterval(()=>{
    //     socket.send("Rabdom Value " + Math.random())
    // }, 500);
    socket.on("message", function (data) {
        if (data.toString() === "ping") {
            socket.send("pong");
        }
        // console.log(data.toString());
    });
});
