const User = require('../models/user');
const c = require('../config');
const jwt = require('jsonwebtoken');
const {
    hashPassword,
    comparePassword
} = require('../../utils/bcryptFun');
const msgConfig = require("../../config/msgConfig")
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');

const registerUser = async (req, res) => {
    try {
        // 1) Get Imformation From Client | Hash Password
        const {
            firstname,
            lastname,
            email,
            username,
            password,
            createdAt,
        } = req.body
        const hashedPassword = await hashPassword(password)
        // 2 ) Create new User Model And Set Arguments | Handdle Errors 
        const newUser = await userModel.registerUser(firstname, lastname, email, username, hashedPassword, createdAt)
        // register user and send response
        message = msgConfig.successMsgs._createSuccessfullyMsg
        res.send(msgConfig.successMsgs._successMsg,
            msgConfig.successMsgs._successCreateStatusCode, message)
    } catch (err) {
        console.log("THIS IS FROM REGISTER HANDDLER CATCH ERROR", err); // For Developer
        message = msgConfig.internalServerErr._internalServerErr
        res.send(msgConfig.badRequestesMsgs._failMsg, 500, message)
    }
};


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