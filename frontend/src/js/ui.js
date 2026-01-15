const newSessionButton = document.getElementById("new-session-button");
const sessionLink = document.getElementById("sessionLink");
const landingElements = document.querySelectorAll(".landing-only");
const sessionElements = document.querySelectorAll(".session-only");

function onNewSession(handler) {
  newSessionButton.addEventListener("click", handler);
}

function setSessionLink(link) {
  sessionLink.value = link;
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
  onNewSession,
  setSessionLink,
  showLandingOnly,
  showSessionOnly,
};
