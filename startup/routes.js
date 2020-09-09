const express = require("express");
const questionsSeries = require("../routes/questionsSeries");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/questionsseries", questionsSeries);
};
