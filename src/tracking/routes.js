const express = require("express");

const router = express.Router();

const { successHandler } = require("../api/middleware");
const {
  displayCount,
  increaseCountIfInBody,
  saveBodyRequest,
} = require("./middleware");
const { saveData, increaseCount, getCount } = require("./manager");

router.post(
  "/track",
  saveBodyRequest({ save: saveData }),
  increaseCountIfInBody({ increaseCount }),
  successHandler({ status: 200 }),
);
router.get("/count", displayCount({ getCount }));

module.exports = router;
