import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { getUserInput } from "./userInput.js";

const grid_img = new Image();
const player_img = new Image();
grid_img.src = "assets/grid.png";
player_img.src = "assets/player.png";

var socket = io();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
setCanvasDimensions();
function setCanvasDimensions() {
  const scaleRatio = Math.max(1, 800 / window.innerWidth);
  canvas.width = scaleRatio * window.innerWidth;
  canvas.height = scaleRatio * window.innerHeight;
}
addEventListener("resize", setCanvasDimensions);

const playerstate = {
  up: false,
  left: false,
  down: false,
  right: false,
  is_typing: false,
  is_attacking: false,
  is_rolling: false,
  is_blocking: false,
  is_dead: false,
  rotation: 0,
  chat_text: "",
};

getUserInput(canvas, playerstate);

setInterval(() => {
  socket.emit("playerstate", playerstate);
}, 1000 / 60);

socket.on("gamestate", (gamestate) => {
  render(gamestate);
});

function render(gamestate) {
  const me = gamestate[socket.id];
  ctx.clearRect(0, 0, 10000, 10000);
  ctx.drawImage(grid_img, me.x, me.y);
  ctx.strokeRect(0, 0, 1000, 1000);
  ctx.save();
  ctx.translate(-(me.x - canvas.width / 2), -(me.y - canvas.height / 2));
  console.log(me.xmouse, me.ymouse);
  // console.log(me.xmouse - me.x, -(me.ymouse - me.y));

  ctx.drawImage(
    player_img,
    me.x - player_img.width / 2,
    me.y - player_img.height / 2
  );
  ctx.rotate(0.3);

  for (let id in gamestate) {
    if (id == socket.id) {
      continue;
    }
    const enemy = gamestate[id];
    ctx.drawImage(
      player_img,
      enemy.x - player_img.width / 2,
      enemy.y - player_img.height / 2
    );
  }
  ctx.restore();
  // HUD
  ctx.font = "30px Arial";
  ctx.fillText(
    String(me.x.toFixed(0)) + ", " + String(me.y.toFixed(0)),
    10,
    50
  );
}
