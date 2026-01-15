import ui from "./ui.js";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);

if (params.has("token")) {
  ui.showSessionOnly();
  ui.setSessionLink(url.toString());
} else {
    ui.showLandingOnly();
}

ui.onNewSession(generateNewSession);

function generateNewSession() {
    const token = generateSimpleToken(12);
    params.set("token", token);
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
    ui.showSessionOnly();
    ui.setSessionLink(url.toString());
}

function generateSimpleToken(length) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}
