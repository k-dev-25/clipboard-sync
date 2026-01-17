export const WS_PROTOCOL = window.location.protocol === "https:" ? "wss" : "ws";
export const WS_HOST = window.location.hostname;
export const WS_PORT = window.location.protocol === "https:" ? 443 : 3000;
