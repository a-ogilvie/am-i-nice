const FB_APP_ID = "192011154757596";

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
    <p>Posted ${moment(top.post.createdTime).format(
      "[at] HH:mm [on] dddd, MMMM Do YYYY."
    )}</p>
    
  `;

  bottomDiv.innerHTML = `
    <h5>Negative Post</h5>
    <p>${bottom.post.message}</p>
    <p>Posted ${moment(bottom.post.createdTime).format(
      "[at] HH:mm [on] dddd, MMMM Do YYYY."
    )}</p>
  `;
}
