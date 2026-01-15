const newSessionButton = document.getElementById("new-session-button");
const sessionLink = document.getElementById("sessionLink");
const copyButton = document.getElementById("copyButton");
const landingElements = document.querySelectorAll(".landing-only");
const sessionElements = document.querySelectorAll(".session-only");

function onCopySessionLink(handler) {
  copyButton.addEventListener("click", handler);
}

function onNewSession(handler) {
  newSessionButton.addEventListener("click", handler);
}

function getSessionLink() {
  return sessionLink.value;
}

function setSessionLink(link) {
  sessionLink.value = link;
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
  getSessionLink,
  onCopySessionLink,
  onNewSession,
  setSessionLink,
  showCopiedFeedback,
  showLandingOnly,
  showSessionOnly,
};
