const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config");
const app = express();

const { notFoundHandler, errorHandler } = require("./api/middleware");
const trackingRoutes = require("./tracking/routes");

const {
  logNotFoundError,
  logUncaughtError,
  logUnhandledApiError,
  logUnhandledRejection,
} = require("./logger/logging");

// catch process unhandled errors
process.on("unhandledRejection", logUnhandledRejection);
process.on("uncaughtException", logUncaughtError);

// parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router logic
app.use(trackingRoutes);

// handlers
app.use(notFoundHandler({ log: logNotFoundError }));
app.use(errorHandler({ log: logUnhandledApiError }));

app.listen(PORT);
