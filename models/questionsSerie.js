const Joi = require("joi");
const mongoose = require("mongoose");

const questionsSerieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
});

const QuestionsSerie = mongoose.model("QuestionSerie", questionsSerieSchema);

function validateQuestionsSerie(questionsSerie) {
  const schema = {
    title: Joi.string().required().max(50),
  };

  return Joi.validate(questionsSerie, schema);
}

exports.questionsSerieSchema = questionsSerieSchema;
exports.QuestionsSerie = QuestionsSerie;
exports.validate = validateQuestionsSerie;
