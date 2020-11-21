const express = require("express");
const questionsSeries = require("../routes/questionsSeries");
const users = require("../routes/users");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/questionsseries", questionsSeries);
  //   app.use("/api/questionssets", questionssets);
  app.use("/api/users", users);
};
