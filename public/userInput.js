export function getUserInput(canvas, playerState) {
  addEventListener("keydown", (e) => {
    if (playerState.is_typing) {
      playerState.chat_text += e.key;
    } else {
      playerState.chat_text = "";
    }
    switch (e.key) {
      case "w":
        playerState.up = true;
        break;
      case "a":
        playerState.left = true;
        break;
      case "s":
        playerState.down = true;
        break;
      case "d":
        playerState.right = true;
        break;
      case "ArrowUp":
        playerState.up = true;
        break;
      case "ArrowLeft":
        playerState.left = true;
        break;
      case "ArrowDown":
        playerState.down = true;
        break;
      case "ArrowRight":
        playerState.right = true;
        break;
      case "Enter":
        playerState.is_typing = !playerState.is_typing;
        break;
    }
  });

  addEventListener("keyup", (e) => {
    switch (e.key) {
      case "w":
        playerState.up = false;
        break;
      case "a":
        playerState.left = false;
        break;
      case "s":
        playerState.down = false;
        break;
      case "d":
        playerState.right = false;
        break;
      case "ArrowUp":
        playerState.up = false;
        break;
      case "ArrowLeft":
        playerState.left = false;
        break;
      case "ArrowDown":
        playerState.down = false;
        break;
      case "ArrowRight":
        playerState.right = false;
        break;
    }
  });

  addEventListener("mousemove", (e) => {
    // playerState.rotation = Math.atan2()
    playerState.xmouse = e.clientX
    playerState.ymouse = e.clientY
  });

  addEventListener("mousedown", (e) => {
    playerState.is_attacking = true;
  });

  addEventListener("mouseup", (e) => {
    playerState.is_attacking = false;
  });
}
