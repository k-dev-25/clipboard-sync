import ui from "./ui.js";
import socket from "./socket.js";

let currentURL = syncWithURL();

ui.onCopySessionLink(copySessionLink);

ui.onNewSession(generateNewSession);

async function copySessionLink() {
  const link = currentURL.toString();
  await navigator.clipboard.writeText(link);
  ui.showCopiedFeedback();
}

function generateNewSession() {
  const token = generateSimpleToken(12);
  const params = new URLSearchParams(currentURL.search);
  params.set("token", token);
  currentURL.search = params.toString();
  window.history.pushState({}, "", currentURL.toString());
  currentURL = syncWithURL();
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

function syncWithURL() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  if (params.has("token")) {
    ui.showSessionOnly();
    ui.setSessionLink(url.toString());
    socket.connect();
  } else {
    ui.showLandingOnly();
    socket.disconnect();
  }

  return url;
}

window.addEventListener("popstate", () => {
  currentURL = syncWithURL();
});
