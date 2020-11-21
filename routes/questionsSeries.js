const express = require("express");
const router = express.Router();
const { QuestionsSerie } = require("../models/questionsSerie");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", async (req, res) => {
  const questionsSeries = await QuestionsSerie.find().sort("title");
  res.send(questionsSeries);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const questionsSerie = await QuestionsSerie.findById(req.params.id).select(
    "-__v"
  );

  if (!questionsSerie)
    return res.status(404).send("No Questions Serie exists with the given ID.");

  res.send(questionsSerie);
});

module.exports = router;
