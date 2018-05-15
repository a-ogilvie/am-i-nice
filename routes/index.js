var express = require("express");
var router = express.Router();

const language = require("@google-cloud/language");
const client = new language.LanguageServiceClient();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Am I Nice?" });
});

router.post("/sentiment", (req, res) => {
  const post = {
    content: req.body.post,
    type: "PLAIN_TEXT"
  };

  client.analyzeSentiment({ document: post }).then((results) => {
    const sentiment = results[0].documentSentiment;
    return res.send(sentiment);
  });
});

module.exports = router;
