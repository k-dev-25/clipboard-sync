import ui from "./ui.js";
import socket from "./socket.js";

let currentURL = syncWithURL();
let isRemoteUpdate = false;
let sendTimer = null;
const SEND_DELAY = 300;

ui.onCopySessionLink(copySessionLink);

ui.onNewSession(generateNewSession);

ui.onTextareaInput(scheduleSend);

socket.onClipboard(setText);

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

function scheduleSend() {
  if (sendTimer) {
    clearTimeout(sendTimer);
  }
  sendTimer = setTimeout(() => {
    sendText();
    sendTimer = null;
  }, SEND_DELAY);
}

function sendText() {
  const params = new URLSearchParams(currentURL.search);
  if (!params.has("token") || isRemoteUpdate) return;
  const text = ui.getText();
  socket.sendClipboard(text);
}

function setText(text) {
  isRemoteUpdate = true;
  ui.setText(text);
  isRemoteUpdate = false;
}

function syncWithURL() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  if (params.has("token")) {
    ui.showSessionOnly();
    ui.setSessionLink(url.toString());
    socket.connect(params.get("token"));
  } else {
    ui.showLandingOnly();
  }

  return url;
}

window.addEventListener("popstate", () => {
  currentURL = syncWithURL();
});
