require("dotenv").config();

const { PORT, REDIS_URL } = process.env;

module.exports = {
  PORT,
  REDIS_URL,
};
