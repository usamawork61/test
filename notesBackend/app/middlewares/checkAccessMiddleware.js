let url = require("url");
const roles = require("../../config/roles/roles.json");
const accessList = require("../../config/apis/accessApis.json");

// check the access of a login user
function access(req, res, next) {
  let apiUrl = req.url;
  apiUrl = apiUrl.replace('/api/', '')
	apiUrl = apiUrl.split('/')[0]
	apiUrl = apiUrl.split('?')[0]

  let role = req.userDetails.role;
  let method = req.method;

  if (accessList[roles[role]][method.toLowerCase()].includes(apiUrl)) {
    next();
  } else {
    res.send({ message: "You don't have the Access" });
  }
}

module.exports = access;
