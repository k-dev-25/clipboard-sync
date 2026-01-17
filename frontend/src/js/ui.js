const newSessionButton = document.getElementById("new-session-button");
const sessionLink = document.getElementById("sessionLink");
const copyLinkButton = document.getElementById("copyLinkButton");
const showQRButton = document.getElementById("showQRButton");
const qrContainer = document.getElementById("qr-container");
const qrCanvas = document.getElementById("qr-canvas");
const textArea = document.getElementById("text");
const copyTextButton = document.getElementById("copyTextButton");
const statusColor = document.getElementById("status-color");
const statusConnected = document.getElementById("status-connected");
const statusConnecting = document.getElementById("status-connecting");
const statusDisconnected = document.getElementById("status-disconnected");
const deviceCountElement = document.getElementById("device-count");
const landingElements = document.querySelectorAll(".landing-only");
const sessionElements = document.querySelectorAll(".session-only");

function getText() {
  return textArea.value;
}

function onCopySessionLink(handler) {
  copyLinkButton.addEventListener("click", handler);
}

function onCopyText(handler) {
  copyTextButton.addEventListener("click", handler);
}

function onNewSession(handler) {
  newSessionButton.addEventListener("click", handler);
}

function onShowQR(handler) {
  showQRButton.addEventListener("click", handler);
}

function onTextareaInput(handler) {
  textArea.addEventListener("input", handler);
}

function showQR() {
  qrContainer.classList.remove("hidden");
}

function hideQR() {
  qrContainer.classList.add("hidden");
}

function getQRCanvas() {
  return qrCanvas;
}

function setConnectionStatus(status) {
  statusColor.classList.remove("bg-green-500", "bg-yellow-500", "bg-red-500");

  statusConnecting.classList.toggle("hidden", status !== "Connecting");
  statusConnected.classList.toggle("hidden", status !== "Connected");
  statusDisconnected.classList.toggle("hidden", status !== "Disconnected");

  if (status === "Connecting") {
    statusColor.classList.add("bg-yellow-500");
    statusConnecting.textContent = "Connecting";
  } else if (status === "Connected") {
    statusColor.classList.add("bg-green-500");
    statusConnected.textContent = "Connected";
  } else if (status === "Disconnected") {
    statusColor.classList.add("bg-red-500");
    statusDisconnected.textContent = "Disconnected";
  }
}

function setDeviceCount(count) {
  deviceCountElement.textContent =
    count === 1 ? "1 device" : `${count} devices`;
}

function setSessionLink(link) {
  sessionLink.value = link;
}

function setText(text) {
  textArea.value = text;
}

function showCopiedFeedback(button) {
  const Button = button === "textArea" ? copyTextButton : copyLinkButton;
  Button.textContent = "Copied!";
  setTimeout(() => {
    Button.textContent = "Copy";
  }, 1000);
}

function showLandingOnly() {
  landingElements.forEach((el) => el.classList.remove("hidden"));
  sessionElements.forEach((el) => el.classList.add("hidden"));
}

function showSessionOnly() {
  landingElements.forEach((el) => el.classList.add("hidden"));
  sessionElements.forEach((el) => el.classList.remove("hidden"));
}

export default {
  getText,
  getQRCanvas,
  hideQR,
  onCopySessionLink,
  onCopyText,
  onNewSession,
  onShowQR,
  onTextareaInput,
  setConnectionStatus,
  setDeviceCount,
  setSessionLink,
  setText,
  showCopiedFeedback,
  showLandingOnly,
  showQR,
  showSessionOnly,
};
