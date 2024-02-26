const url = require("url");
const apiFolder = require("../../config/apis/allApis.json");
const fs = require("fs");

// It will check that api that user api request include in or apis or not
function checkApisRoutes(req, res, next) {
  var readApis = fs.readFileSync("config/apis/allApis.json");
  var apis = JSON.parse(readApis);
  let url = req.url;
  url = url.replace("/api/", "");
  url = url.split("/")[0];
  url = url.split("?")[0];
  //check if the requested api include in our listed apis

  if (apis.includes(url)) {
    next();
  } else {
    res.statusCode = 404;
    return res.send({ message: 2001 });
  }
}

module.exports = checkApisRoutes;
