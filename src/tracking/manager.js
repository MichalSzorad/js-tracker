const { store, load } = require("../db/adapter");
const { appendFile } = require("../fs/adapter");

async function increaseCount(amount, { get = getCount, put = store } = {}) {
  const count = await get();
  await put("count", count + amount);
}

async function getCount({ get = load } = {}) {
  return parseFloat(await get("count")) || 0;
}

async function saveData(dataObject, { append = appendFile } = {}) {
  return await append("logs.txt", JSON.stringify(dataObject) + "\n");
}

module.exports = {
  getCount,
  increaseCount,
  saveData,
};
