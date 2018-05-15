function hideElement(elementId) {
  document.getElementById(elementId).setAttribute("hidden", true);
}

function showElement(elementId) {
  document.getElementById(elementId).removeAttribute("hidden");
}

function appendPosts(top, bottom) {
  const topDiv = document.getElementById("top-post");
  const bottomDiv = document.getElementById("bottom-post");

  topDiv.innerHTML = `
    <h5>Positive Post</h5>
    ${top.post}
  `;

  bottomDiv.innerHTML = `
    <h5>Negative Post</h5>
    ${bottom.post}
  `;
}
