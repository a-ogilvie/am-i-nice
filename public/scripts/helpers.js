function hideElement(elementId) {
  document.getElementById(elementId).setAttribute("hidden", true);
}

function showElement(elementId) {
  document.getElementById(elementId).removeAttribute("hidden");
}
