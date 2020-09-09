const User = require('../models/user');
const c = require('../config');

function getUsers(req, res) {
  let users = User.getAll();
  res.statusCode = c.statusCodes.SUCCESS;
  res.setHeader('Content-Type', c.contentTypes.JSON);
  res.end(JSON.stringify({users}));
}

function createUser(req, res) {
  let user = new User({
    username: req.data.username,
    password: req.data.password,
    name: req.data.name || '',
    family: req.data.family || ''
  });
  user.save();
  res.statusCode = c.statusCodes.SUCCESS;
  res.setHeader('Content-Type', c.contentTypes.JSON);
  res.end(JSON.stringify(req.data));
}

module.exports = {
  getUsers,
  createUser
};