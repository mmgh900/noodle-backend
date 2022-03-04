const userCtrl = require('./controllers/user');
const dataParser = require('noodle-data-parser');
const Authenticator = require('noodle-user-authentication');
const authorization = require('noodle-user-authorization');
const {authConfig} = require("./config");

const authenticator = new Authenticator(authConfig)

module.exports = {
    '/users': {
        GET: {
            function: userCtrl.getUsers(),
            middlewares: [authenticator, authorization(3)]
        },
    },
    '/users/login': {
        POST: {
            function: userCtrl.login,
            middlewares: [authenticator]
        },
    },
    '/employees': {
        GET: {
            function: userCtrl.getUsers(1),
            middlewares: [authenticator, authorization(2)]
        },
        POST: {
            function: userCtrl.createUser,
            middlewares: [authenticator, authorization(2), dataParser]
        }
    },
    '/supporters': {
        GET: {
            function: userCtrl.getUsers(2),
            middlewares: [authenticator, authorization(3)]
        },
        POST: {
            function: userCtrl.createUser,
            middlewares: [authenticator, authorization(2), dataParser]
        }
    },
    '/admins': {
        GET: {
            function: userCtrl.getUsers(3),
            middlewares: [authenticator, authorization(3)]
        },
        POST: {
            function: userCtrl.createUser,
            middlewares: [authenticator, authorization(3), dataParser]
        }
    }
};