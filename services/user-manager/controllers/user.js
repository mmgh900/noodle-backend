const User = require('../models/user');
const c = require('../config');
const jwt = require('jsonwebtoken');
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');


function getUsers(req, res) {
    let users = User.getAll();
    res.statusCode = StatusCodes.OK
    res.setHeader('Content-Type', c.contentTypes.JSON);
    res.end(JSON.stringify({users}));
}

function createUser(req, res) {
    if (req.user.type < req.data.type) {

    }
    User.add(req.data)
    // Create token
    const token = jwt.sign(
        {
            username: req.data.username,
            type: req.data.type
        },
        c.authConfig.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
    const response = {
        username: req.data.username,
        token
    }
    res.statusCode = StatusCodes.OK
    res.setHeader('Content-Type', c.contentTypes.JSON);
    res.end(JSON.stringify(response));
}

module.exports = {
    getUsers,
    createUser
};