var express = require("express");
var router = express.Router();

const language = require("@google-cloud/language");
const client = new language.LanguageServiceClient({
  projectId: "am-i-nice",
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL
  }
});

router.post("/", (req, res) => {
  const post = {
    content: req.body.post,
    type: "PLAIN_TEXT"
  };

  client
    .analyzeSentiment({ document: post })
    .then((results) => {
      const sentiment = results[0].documentSentiment;
      return res.json({ score: sentiment.score });
    })
    .catch(() => res.json({ score: 0 }));
});

module.exports = router;
