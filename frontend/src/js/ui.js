const newSessionButton = document.getElementById("new-session-button");
const sessionLink = document.getElementById("sessionLink");
const copyButton = document.getElementById("copyButton");
const textArea = document.getElementById("text");
const landingElements = document.querySelectorAll(".landing-only");
const sessionElements = document.querySelectorAll(".session-only");

function getText() {
  return textArea.value;
}

function onCopySessionLink(handler) {
  copyButton.addEventListener("click", handler);
}

function onNewSession(handler) {
  newSessionButton.addEventListener("click", handler);
}

function onTextareaInput(handler) {
  textArea.addEventListener("input", handler);
}

function setSessionLink(link) {
  sessionLink.value = link;
}

function setText(text) {
  textArea.value = text;
}

function showCopiedFeedback() {
  copyButton.textContent = "Copied!";
  setTimeout(() => {
    copyButton.textContent = "Copy";
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
  onCopySessionLink,
  onNewSession,
  onTextareaInput,
  setSessionLink,
  setText,
  showCopiedFeedback,
  showLandingOnly,
  showSessionOnly,
};
