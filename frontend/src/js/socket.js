import { WS_HOST, WS_PORT } from "./config.js";

let socket = null;
let activeToken = null;
let clipboardHandler = null;
let connectingHandler = null;
let connectedHandler = null;
let disconnectedHandler = null;
let deviceCountHandler = null;

function connect(token) {
  if (socket) return;

  activeToken = token;

  if (connectingHandler) connectingHandler();

  socket = new WebSocket(`ws://${WS_HOST}:${WS_PORT}`);

  socket.addEventListener("open", () => {
    if (connectedHandler) connectedHandler();
    socket.send(
      JSON.stringify({
        type: "join",
        token: activeToken,
      }),
    );
  });

  socket.addEventListener("message", (message) => {
    const data = JSON.parse(message.data);
    if (data.type === "clipboard" && clipboardHandler) {
      clipboardHandler(data.text);
    }

    if (data.type === "device_count" && deviceCountHandler) {
      deviceCountHandler(data.count);
    }
  });

  socket.addEventListener("close", () => {
    socket = null;
    activeToken = null;
    if (disconnectedHandler) disconnectedHandler();
  });
}

function onClipboard(handler) {
  clipboardHandler = handler;
}

function onConnected(handler) {
  connectedHandler = handler;
}

function onConnecting(handler) {
  connectingHandler = handler;
}

function onDisconnected(handler) {
  disconnectedHandler = handler;
}

function onDeviceCount(handler) {
  deviceCountHandler = handler;
}

function sendClipboard(text) {
  if (!socket) return;

  socket.send(
    JSON.stringify({
      type: "clipboard",
      text,
    }),
  );
}

export default {
  connect,
  onClipboard,
  onConnected,
  onConnecting,
  onDisconnected,
  onDeviceCount,
  sendClipboard,
};
