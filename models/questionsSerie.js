const Joi = require("joi");
const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const questionsSerieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  author: {
    type: String,
    required: true,
    maxlength: 50,
  },
  slug: {
    type: String,
    slug: "title",
  },
  creation_date: {
    type: Date,
    default: Date.now(),
  },
});

const QuestionsSerie = mongoose.model("QuestionSerie", questionsSerieSchema);

function validateQuestionsSerie(questionsSerie) {
  const schema = {
    title: Joi.string().required().max(50),
    author: Joi.string().required().max(50),
    slug: Joi.string(),
    creation_date: Joi.date(),
  };

  return Joi.validate(questionsSerie, schema);
}

exports.questionsSerieSchema = questionsSerieSchema;
exports.QuestionsSerie = QuestionsSerie;
exports.validate = validateQuestionsSerie;
