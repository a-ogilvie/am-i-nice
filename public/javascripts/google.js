function analyseSentiments(sentiments) {
  const sentimentReqs = sentiments.map((post) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/sentiment");
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onload = () => {
        resolve({ post: post, analysis: JSON.parse(xhr.response) });
      };
      xhr.send(JSON.stringify({ post }));
    });
  });

  Promise.all(sentimentReqs).then((results) => {
    console.log(results);
  });
}
