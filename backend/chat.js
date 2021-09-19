const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 4000;

io.on("connection", (socket) => {
  console.log("web socket connection");
  socket.emit("message", "Welcome");

  //Brodacast new user has entered chat
  socket.broadcast.emit("broadcast", "New user has entered room!");

  socket.on("sendMessage", (msg, callback) => {
    io.emit("message", msg);
    callback("Msg from server:We got your message!");
  });
});

server.listen(PORT, () => {
  console.log(`Chat server listening on port${PORT} `);
});
