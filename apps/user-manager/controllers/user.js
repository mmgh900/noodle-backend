const User = require('../models/user');
const c = require('../config');

function getUsers(req, res) {
  let users = [];
  res.statusCode = c.statusCodes.SUCCESS;
  res.setHeader('Content-Type', c.contentTypes.JSON);
  res.end(JSON.stringify({users}));
}

module.exports = {
  getUsers
};