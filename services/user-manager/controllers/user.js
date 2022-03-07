const User = require('../models/user');
const c = require('../config');
const jwt = require('jsonwebtoken');
const {
    hashPassword,
    comparePassword
} = require('../utils/password-hashing');


const {
    StatusCodes,
} = require('http-status-codes');
const {UserTypes} = require("noodle-user-authorization");
const {createToken} = require("../utils/token-management");


async function login(req, res) {
    const user = await User.get(req.data.username)
    const token = createToken(user.username, user.type)
    if (await comparePassword(req.data.password, user.password)) {
        res.statusCode = StatusCodes.OK
        res.setHeader('Content-Type', c.contentTypes.JSON);
        res.end(JSON.stringify({
            username: user?.username,
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

async function getUsers(req, res) {
    const type = req.query?.type
    let users = await User.getAll(type);
    res.statusCode = StatusCodes.OK
    res.setHeader('Content-Type', c.contentTypes.JSON);
    res.end(JSON.stringify({users}));
}

function _checkForValidType(req, res) {
    // Only admins can create admins or supporters
    if ((req.data.type === UserTypes.admin || req.data.type === UserTypes.supporter)
        && req.user.type !== UserTypes.admin) {
        res.statusCode = StatusCodes.FORBIDDEN
        res.setHeader('Content-Type', c.contentTypes.JSON);
        return res.end(JSON.stringify({
            message: "Only admins can create admins or supporters"
        }));
    }
}

async function createUser(req, res) {
    _checkForValidType(req, res);
    const hashedPassword = await hashPassword(req.data.password);
    try {
        await User.add({
            ...req.data,
            password: hashedPassword,
        })
    } catch (e) {
        if (parseInt(e.code) === 23505) {
            res.statusCode = StatusCodes.CONFLICT
            res.setHeader('Content-Type', c.contentTypes.JSON);
            return res.end(JSON.stringify({
                message: "A user with this username already exists"
            }));
        }
    }

    const token = createToken(req.data.username, req.data.type)

    res.statusCode = StatusCodes.OK
    res.setHeader('Content-Type', c.contentTypes.JSON);
    return res.end(JSON.stringify({
        username: req.data.username,
        token
    }));

}

module.exports = {
    getUsers,
    createUser,
    login
};