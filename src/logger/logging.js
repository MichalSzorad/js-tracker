// setup sentry/save errors to file/log errors

function logUncaughtError(error) {
  console.log("Caught exception:", error);
}

function logUnhandledRejection(reason, promise) {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
}

function logUnhandledApiError(error, request) {
  console.log("Unhandled API error on ", request.originalUrl, error);
}

function logNotFoundError(request) {
  console.log("Handled 404 API error on ", request.originalUrl);
}

module.exports = {
  logNotFoundError,
  logUncaughtError,
  logUnhandledApiError,
  logUnhandledRejection,
};
