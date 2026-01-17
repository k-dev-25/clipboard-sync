import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000, host: "0.0.0.0" });

const rooms = new Map();

wss.on("connection", (ws) => {
  let currentToken = null;

  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());

    if (data.type == "join") {
      currentToken = data.token;
      if (!currentToken) return;
      if (!rooms.has(currentToken)) {
        rooms.set(currentToken, new Set());
      }
      rooms.get(currentToken).add(ws);

      const count = rooms.get(currentToken).size;

      for (const peer of rooms.get(currentToken)) {
        peer.send(
          JSON.stringify({
            type: "device_count",
            count,
          }),
        );
      }
      return;
    }

    if (data.type == "clipboard") {
      if (!currentToken) return;
      const peers = rooms.get(currentToken);

      for (const peer of peers) {
        if (peer !== ws && peer.readyState === peer.OPEN) {
          peer.send(JSON.stringify(data));
        }
      }
    }
  });

  ws.on("close", () => {
    if (!currentToken) return;

    const peers = rooms.get(currentToken);
    peers.delete(ws);

    if (peers.size === 0) {
      rooms.delete(currentToken);
      return;
    }

    const count = peers.size;

    for (const peer of peers) {
      peer.send(
        JSON.stringify({
          type: "device_count",
          count,
        }),
      );
    }
  });
});
