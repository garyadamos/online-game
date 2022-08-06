// const cors = require("cors");
const express = require("express");
const socket = require("socket.io");
const app = express();
app.use(express.static("public"));
PORT = 3000;
// const server = app.listen(PORT, IP_ADDRESS);
const server = app.listen(3000, "localhost");
const io = socket(server, { cors: { origin: "*" } }); // allows connections from anywhere
const gamestate = {};
console.log("server start");

io.sockets.on("connection", (socket) => {
  gamestate[socket.id] = {
    x: Math.floor(Math.random() * 1000),
    y: Math.floor(Math.random() * 1000),
    speed: 5,
    color: "#F7D8B5",
  };

  socket.on("disconnect", () => {
    delete gamestate[socket.id];
  });

  setInterval(() => {
    io.sockets.emit("gamestate", gamestate);
  }, 1000 / 60);

  socket.on("playerstate", (arg) => {
    const player = gamestate[socket.id];
    // movement
    let diagonal_speed = player.speed * 0.70710678118;
    if (arg.up && arg.left) {
      player.y = player.y - diagonal_speed;
      player.x = player.x - diagonal_speed;
    } else if (arg.up && arg.right) {
      player.y = player.y - diagonal_speed;
      player.x = player.x + diagonal_speed;
    } else if (arg.down && arg.left) {
      player.y = player.y + diagonal_speed;
      player.x = player.x - diagonal_speed;
    } else if (arg.down && arg.right) {
      player.y = player.y + diagonal_speed;
      player.x = player.x + diagonal_speed;
    } else if (arg.up) {
      player.y = player.y - player.speed;
    } else if (arg.left) {
      player.x = player.x - player.speed;
    } else if (arg.right) {
      player.x = player.x + player.speed;
    } else if (arg.down) {
      player.y = player.y + player.speed;
    }

    // mouse movement
    player.xmouse = arg.xmouse;
    player.ymouse = arg.ymouse;
  });
});

function handlePhysics() {}
