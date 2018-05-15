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
    processResults(results);
  });
}

// Process results for D3.js
function processResults(results) {
  const sentimentality = { positive: 0, negative: 0, neutral: 0 };

  results.forEach((result) => {
    if (result.analysis.score < -0.2) {
      sentimentality.negative++;
    } else if (result.analysis.score < 0.2) {
      sentimentality.neutral++;
    } else {
      sentimentality.positive++;
    }
  });

  const positiveColour = "#008000";
  const neutralColour = "#C0C0C0";
  const negativeColour = "#FF0000";

  drawGraph([
    {
      label: "positive",
      count: sentimentality.positive,
      colour: positiveColour
    },
    {
      label: "neutral",
      count: sentimentality.neutral,
      colour: neutralColour
    },
    {
      label: "negative",
      count: sentimentality.negative,
      colour: negativeColour
    }
  ]);
}
