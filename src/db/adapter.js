const redis = require("redis");
const { REDIS_URL } = require("../config");
const client = redis.createClient(REDIS_URL);

async function store(key, value) {
  return client.set(key, value);
}

function load(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  });
}

module.exports = { load, store };
