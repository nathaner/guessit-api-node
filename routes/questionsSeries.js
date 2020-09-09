const express = require("express");
const router = express.Router();
const { QuestionsSerie } = require("../models/questionsSerie");

router.get("/", async (req, res) => {
  const questionsSeries = await QuestionsSerie.find().sort("title");
  res.send(questionsSeries);
});

module.exports = router;
