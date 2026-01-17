import ui from "./ui.js";
import { WS_HOST } from "./config.js";

let socket = null;
let activeToken = null;
let clipboardHandler = null;

let reconnectTimer = null;
const RECONNECT_DELAY = 3000;

function connect(token) {
  if (socket) return;

  activeToken = token;
  ui.setConnectionStatus("Connecting");
  tryConnect();
}

function tryConnect() {
  socket = new WebSocket(`wss://${WS_HOST}`);

  socket.addEventListener("open", () => {
    ui.setConnectionStatus("Connected");

    socket.send(
      JSON.stringify({
        type: "join",
        token: activeToken,
      })
    );

    clearReconnect();
  });

  socket.addEventListener("message", (message) => {
    const data = JSON.parse(message.data);
    if (data.type === "clipboard" && clipboardHandler) {
      clipboardHandler(data.text);
    } else if (data.type === "device_count") {
      ui.setDeviceCount(data.count);
    }
  });

  socket.addEventListener("close", handleDisconnect);
  socket.addEventListener("error", handleDisconnect);
}

function handleDisconnect() {
  if (socket) {
    socket.close();
    socket = null;
  }

  ui.setConnectionStatus("Disconnected");
  scheduleReconnect();
}

function scheduleReconnect() {
  if (reconnectTimer) return;

  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    ui.setConnectionStatus("Connecting");
    tryConnect();
  }, RECONNECT_DELAY);
}

function clearReconnect() {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
}

function onClipboard(handler) {
  clipboardHandler = handler;
}

function sendClipboard(text) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;

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
