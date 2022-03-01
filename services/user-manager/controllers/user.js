const User = require('../models/user');
const c = require('../config');
const jwt = require('jsonwebtoken');

function getUsers(req, res) {
    let users = User.getAll();
    res.statusCode = c.statusCodes.SUCCESS;
    console.log(req.user)
    res.setHeader('Content-Type', c.contentTypes.JSON);
    res.end(JSON.stringify({users}));
}

function createUser(req, res) {
    let user = new User({
        username: req.data.username,
        password: req.data.password,
        name: req.data.name
    });
    user.save();
    // Create token
    const token = jwt.sign(
        {username: req.data.username},
        c.authConfig.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
    const response = {
        username: req.data.username,
        token
    }
    res.statusCode = c.statusCodes.SUCCESS;
    res.setHeader('Content-Type', c.contentTypes.JSON);
    res.end(JSON.stringify(response));
}

module.exports = {
    getUsers,
    createUser
};