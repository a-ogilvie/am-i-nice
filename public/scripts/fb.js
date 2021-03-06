function statusChangeCallback(response) {
  if (response.status === "connected") {
    hideElement("fb-login");
    showElement("loading-fb");
    showElement("spinner");
    fetchPosts(response.authResponse);
  } else {
    document.getElementById("status").innerHTML = "Please log into this app.";
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId: FB_APP_ID,
    cookie: true,
    xfbml: true,
    version: "v3.0"
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_GB/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

let userPosts = [];

function fetchPosts(userInfo) {
  FB.api(
    `/${userInfo.userID}/posts`,
    "get",
    { access_token: userInfo.accessToken },
    pageResults
  );
}

function pageResults(result) {
  result.data.forEach((datum) => {
    if (datum.message) {
      userPosts.push({
        message: datum.message,
        createdTime: datum.created_time
      });
    }
  });

  if (userPosts.length < 200 && result.paging && result.paging.next) {
    FB.api(result.paging.next, "get", null, pageResults);
  } else {
    hideElement("loading-fb");
    showElement("done-fb");
    showElement("loading-google");

    analyseSentiments(userPosts);
  }
}
