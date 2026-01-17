import { WS_HOST, WS_PORT } from "./config.js";

let socket = null;
let activeToken = null;
let clipboardHandler = null;

function connect(token) {
  if (socket) return;

  activeToken = token;

  socket = new WebSocket(`ws://${WS_HOST}:${WS_PORT}`);

  socket.addEventListener("open", () => {
    socket.send(
      JSON.stringify({
        type: "join",
        token: activeToken,
      })
    );
  });

  socket.addEventListener("message", (message) => {
    const data = JSON.parse(message.data);
    if (data.type === "clipboard" && clipboardHandler) {
      clipboardHandler(data.text);
    }
  });

  socket.addEventListener("close", () => {
    socket = null;
    activeToken = null;
  });
}

function onClipboard(handler) {
  clipboardHandler = handler;
}

function sendClipboard(text) {
  if (!socket) return;

  socket.send(
    JSON.stringify({
      type: "clipboard",
      text,
    })
  );
}

export default {
  connect,
  onClipboard,
  sendClipboard,
};
