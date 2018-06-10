const notFoundHandler = config => (req, res, next) => {
  return res.status(404).json({ message: "Route not found" });
};

const errorHandler = config => (error, req, res, next) => {
  return res.status(error.status || 500).json({ message: error.message });
};

const successHandler = config => (req, res) => {
  const { status } = config;
  return res.status(status).json({ result: true });
};

module.exports = {
  errorHandler,
  notFoundHandler,
  successHandler,
};
