const userCtrl = require('./controllers/user');
const dataParser = require('noodle-data-parser');
const Authenticator = require('noodle-user-authentication');
const authorization = require('noodle-user-authorization');
const {authConfig} = require("./config");
const {UserTypes} = require("../../config");

const authenticator = new Authenticator(authConfig)

module.exports = {
    '/users': {
        GET: {
            function: userCtrl.getUsers(),
            middlewares: [authenticator, authorization(UserTypes.admin)]
        },
    },
    '/users/login': {
        POST: {
            function: userCtrl.login,
            middlewares: [dataParser]
        },
    },
    '/employees': {
        GET: {
            function: userCtrl.getUsers(UserTypes.employee),
            middlewares: [authenticator, authorization(UserTypes.supporter)]
        },
        POST: {
            function: userCtrl.createUser(UserTypes.employee),
            middlewares: [authenticator, authorization(UserTypes.supporter), dataParser]
        }
    },
    '/supporters': {
        GET: {
            function: userCtrl.getUsers(UserTypes.supporter),
            middlewares: [authenticator, authorization(UserTypes.admin)]
        },
        POST: {
            function: userCtrl.createUser(UserTypes.supporter),
            middlewares: [authenticator, authorization(UserTypes.supporter), dataParser]
        }
    },
    '/admins': {
        GET: {
            function: userCtrl.getUsers(UserTypes.admin),
            middlewares: [authenticator, authorization(UserTypes.admin)]
        },
        POST: {
            function: userCtrl.createUser(UserTypes.admin),
            middlewares: [authenticator, authorization(UserTypes.admin), dataParser]
        }
    }
};