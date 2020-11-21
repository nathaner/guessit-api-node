const mongoose = require("mongoose");
const config = require("config");
const { QuestionsSerie } = require("./models/questionsSerie");
const { questionsSeries } = require("./samples/questionsSeries");

console.log(questionsSeries);

async function seed() {
  mongoose.connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await QuestionsSerie.deleteMany({});

  await QuestionsSerie.insertMany(questionsSeries);

  mongoose.disconnect();

  console.info("Done!");
}

seed();
