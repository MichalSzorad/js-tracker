const saveBodyRequest = config => (req, res, next) => {
  config.save(req.body);
  return next();
};

const increaseCountIfInBody = config => async (req, res, next) => {
  const { increaseCount } = config;
  const keyToFind = "count";
  const amount = req.body[keyToFind];
  const shouldIncrease = typeof amount === "number";
  if (shouldIncrease) {
    await increaseCount(amount);
  }

  return next();
};

const displayCount = config => async (req, res, next) => {
  const { getCount } = config;
  const count = await getCount();
  return res.status(200).json({ count });
};

module.exports = {
  displayCount,
  increaseCountIfInBody,
  saveBodyRequest,
};
