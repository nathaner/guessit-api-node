const express = require("express");
const config = require("config");
const logger = require("./startup/logger");

const app = express();

const port = process.env.PORT || config.get("port");

const server = app.listen(port, () => logger.info(`Listening on port ${port}`));

exports = server;
