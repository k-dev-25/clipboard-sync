let socket = null;

function connect() {
  if (socket) return;

  socket = new WebSocket("ws://127.0.0.1:3000");

  socket.addEventListener("open", () => {
    console.log("socket connected");
  });

  socket.addEventListener("close", () => {
    console.log("socket disconnected");
    socket = null;
  });

  socket.addEventListener("error", (err) => {
    console.error("socket error", err);
  });
}

function disconnect() {
  if (!socket) return;
  socket.close();
  socket = null;
}

export default {
  connect,
  disconnect,
};
