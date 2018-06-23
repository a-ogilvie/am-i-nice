function analyseSentiments(sentiments) {
  const sentimentReqs = sentiments.map((post) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/sentiment");
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onload = () => {
        resolve({
          post: post,
          analysis: JSON.parse(xhr.response)
        });
      };
      xhr.onerror = () => {
        reject({
          post: "",
          analysis: JSON.parse(xhr.response)
        });
      };
      xhr.send(JSON.stringify({ post: post.message }));
    });
  });

  Promise.all(sentimentReqs).then((results) => {
    processResults(results);
  });
}

// Process results for D3.js
function processResults(results) {
  const sentimentality = { positive: 0, negative: 0, neutral: 0 };

  let topPost = { analysis: { score: -1 } };
  let bottomPost = { analysis: { score: 1 } };

  results.forEach((result) => {
    if (result.analysis.score > topPost.analysis.score) {
      topPost = result;
    }
    if (result.analysis.score < bottomPost.analysis.score) {
      bottomPost = result;
    }

    if (result.analysis.score < -0.2) {
      sentimentality.negative++;
    } else if (result.analysis.score < 0.2) {
      sentimentality.neutral++;
    } else {
      sentimentality.positive++;
    }
  });

  hideElement("loading-google");
  hideElement("spinner");
  showElement("done-google");

  console.log({ topPost, bottomPost });

  drawGraph([
    {
      label: "Positive",
      count: sentimentality.positive
    },
    {
      label: "Neutral",
      count: sentimentality.neutral
    },
    {
      label: "Negative",
      count: sentimentality.negative
    }
  ]);

  showElement("result");

  appendPosts(topPost, bottomPost);
}
