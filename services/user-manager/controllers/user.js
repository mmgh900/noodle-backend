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
    const user = await User.get(req.data.username)
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
    if (user.password.replace(/\s/g, '') === req.data.password) {
        res.statusCode = StatusCodes.OK
        res.setHeader('Content-Type', c.contentTypes.JSON);
        res.end(JSON.stringify({
            username: user.username,
            token
        }));
    } else {
        res.statusCode = StatusCodes.FORBIDDEN
        res.setHeader('Content-Type', c.contentTypes.JSON);
        res.end(JSON.stringify({
            message: "Your username or password is not valid!"
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

function createUser(type) {
    return async (req, res) => {
        try {
            await User.add({
                ...req.data,
                type: type
            })
        } catch (e) {
            if (e.code == 23505) {
                res.statusCode = StatusCodes.CONFLICT
                res.setHeader('Content-Type', c.contentTypes.JSON);
                return res.end(JSON.stringify({
                    message: "A user with this username already exists"
                }));
            }
        }

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
        return res.end(JSON.stringify({
            username: req.data.username,
            token
        }));
    }
}

module.exports = {
    getUsers,
    createUser,
    login
};