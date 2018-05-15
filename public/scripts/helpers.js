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
    <p>${top.post.message}</p>
    <p>Posted ${new Date(top.post.createdTime)}</p>
    
  `;

  bottomDiv.innerHTML = `
    <h5>Negative Post</h5>
    <p>${bottom.post.message}</p>
    <p>Posted ${new Date(bottom.post.createdTime)}</p>
  `;
}
