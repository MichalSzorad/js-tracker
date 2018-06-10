const fs = require("fs");

function appendFile(filename, dataString) {
  return new Promise((resolve, reject) => {
    fs.appendFile(filename, dataString, error => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
}

module.exports = {
  appendFile,
};
