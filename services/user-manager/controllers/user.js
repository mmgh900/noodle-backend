const User = require('../models/user');
const c = require('../config');
const {
    hashPassword,
    comparePassword
} = require('../utils/password-hashing');


const {
    StatusCodes,
} = require('http-status-codes');
const {UserTypes} = require("noodle-user-authorization");
const {createToken} = require("../utils/token-management");
const responseSender = require("gheysari-resposer");


async function login(req, res) {
    try {
        const user = await User.get(req.data.username)
        const isPasswordValid = await comparePassword(req.data.password, user.password)
        if (isPasswordValid) {
            const token = createToken(user.username, user.type)
            const result = {
                username: user?.username,
                token
            }
            responseSender.sendSuccessfulResponse(res, result)
        } else {
            responseSender.sendForbiddenResponse(res, "Your username or password is not valid!")
        }
    } catch (error) {
        responseSender.sendInternalErrorResponse(res, error)
    }
}

async function getUser(req, res) {
    try {
        const user = await User.get(req.params.username);
        delete user.password
        responseSender.sendSuccessfulResponse(res, user)
    } catch (error) {
        responseSender.sendInternalErrorResponse(res, error)
    }
}

async function getUsers(req, res) {
    try {
        const type = req.query?.type
        const users = await User.getAll(type);
        responseSender.sendSuccessfulResponse(res, users)
    } catch (error) {
        responseSender.sendInternalErrorResponse(res, error)
    }
}

function _checkForValidType(req, res) {
    // Only admins can create admins or supporters
    if ((req.data.type === UserTypes.admin || req.data.type === UserTypes.supporter)
        && req.user.type !== UserTypes.admin) {
        responseSender.sendForbiddenResponse(res, "Only admins can create admins or supporters")
    }
}

async function createUser(req, res) {
    try {
        _checkForValidType(req, res);
        const hashedPassword = await hashPassword(req.data.password);
        await User.add({
            ...req.data,
            password: hashedPassword,
        })


        const token = createToken(req.data.username, req.data.type)
        const result = {
            username: req.data.username,
            token
        }

        responseSender.sendSuccessfulResponse(res, result)
    } catch (error) {
        if (parseInt(error.code) === 23505) {
            res.statusCode = StatusCodes.CONFLICT
            res.setHeader('Content-Type', c.contentTypes.JSON);
            return res.end(JSON.stringify({
                message: "A user with this username already exists"
            }));
        } else {
            responseSender.sendInternalErrorResponse(res, error)
        }

    }


}

async function editUser(req, res) {
    try {
        let user = await User.get(req.params.username)
        await User.update({
            ...user,
            ...req.data
        })
        user = await User.get(req.params.username)
        responseSender.sendSuccessfulResponse(res, user)
    } catch (error) {
        responseSender.sendInternalErrorResponse(res, error)
    }
}

async function deleteUser(req, res) {
    try {
        await User.delete(req.params.username);
        responseSender.sendSuccessfulResponse(res)
    } catch (error) {
        responseSender.sendInternalErrorResponse(res, error)
    }
}


module.exports = {
    getUsers,
    createUser,
    login,
    editUser,
    deleteUser,
    getUser
};
