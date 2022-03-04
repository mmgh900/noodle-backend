const User = require('../models/user');
const c = require('../config');
const jwt = require('jsonwebtoken');
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');

async function login(req, res) {
    const user = await User.get(req.user.username)
    const token = jwt.sign(
        {
            username: user.username,
            type: user.type
        },
        c.authConfig.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
    if (user.password === req.data.password) {
        res.statusCode = StatusCodes.OK
        res.setHeader('Content-Type', c.contentTypes.JSON);
        res.end(JSON.stringify({
            username: user.username,
            token
        }));
    }

}

function getUsers(type) {
    return async (req, res) => {
        let users = await User.getAll(type);
        res.statusCode = StatusCodes.OK
        res.setHeader('Content-Type', c.contentTypes.JSON);
        res.end(JSON.stringify({users}));
    }
}

async function createUser(req, res) {
    await User.add(req.data)
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

    res.statusCode = StatusCodes.OK
    res.setHeader('Content-Type', c.contentTypes.JSON);
    res.end(JSON.stringify({
        username: req.data.username,
        token
    }));
}

module.exports = {
    getUsers,
    createUser,
    login
};