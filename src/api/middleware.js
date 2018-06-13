const defaultLogger = () => {};

const notFoundHandler = (config = {}) => (req, res) => {
  const { log = defaultLogger } = config;
  log(req);
  return res.status(404).json({ message: "Route not found" });
};

const errorHandler = (config = {}) => (error, req, res) => {
  const { log = defaultLogger } = config;
  log(error, req);
  return res.status(error.status || 500).json({ message: error.message });
};

const successHandler = config => (req, res) => {
  const { status } = config;
  return res.status(status).json({ result: true });
};

const headers = config => (req, res, next) => {
  res.set("Content-Type", "application/json");
  next();
};

module.exports = {
  errorHandler,
  headers,
  notFoundHandler,
  successHandler,
};
