const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config");
const app = express();

const { notFoundHandler, errorHandler } = require("./api/middleware");
const trackingRoutes = require("./tracking/routes");

// parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router logic
app.use(trackingRoutes);

// handlers
app.use(notFoundHandler());
app.use(errorHandler());

app.listen(PORT);
