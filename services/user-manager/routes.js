const userCtrl = require('./controllers/user');
const dataParser = require('noodle-data-parser');
const Authenticator = require('noodle-user-authentication');

const {authConfig} = require("./config");
const {UserTypes, noodleUserAuthorization} =  require('noodle-user-authorization');
const authenticator = new Authenticator(authConfig)
const usersSchemas  = require('./schemas/users-schema')
const NoodleDataValidation = require('noodle-data-validation')

const signupValidator = new NoodleDataValidation(usersSchemas.createUser)
const loginValidator = new NoodleDataValidation(usersSchemas.login)



module.exports = {
    '/users': {
        GET: {
            function: userCtrl.getUsers,
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.admin), dataParser]
        },
        POST: {
            function: userCtrl.createUser,
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.supporter), dataParser, signupValidator]
        }
    },
    '/users/login': {
        POST: {
            function: userCtrl.login,
            middlewares: [dataParser, loginValidator]
        },
    },
    '/users/:username': {
        GET: {
            function: userCtrl.getUser,
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.supporter), dataParser]
        },
        PATCH: {
            function: userCtrl.editUser,
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.admin), dataParser]
        },
        DELETE: {
            function: userCtrl.deleteUser,
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.admin), dataParser]
        }
    },

};