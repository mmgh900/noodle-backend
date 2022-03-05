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
            function: userCtrl.getUsers(),
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.admin)]
        },
    },
    '/users/login': {
        POST: {
            function: userCtrl.login,
            middlewares: [dataParser, loginValidator]
        },
    },
    '/employees': {
        GET: {
            function: userCtrl.getUsers(UserTypes.employee),
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.supporter)]
        },
        POST: {
            function: userCtrl.createUser(UserTypes.employee),
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.supporter), dataParser, signupValidator]
        }
    },
    '/supporters': {
        GET: {
            function: userCtrl.getUsers(UserTypes.supporter),
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.admin)]
        },
        POST: {
            function: userCtrl.createUser(UserTypes.supporter),
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.supporter), dataParser, signupValidator]
        }
    },
    '/admins': {
        GET: {
            function: userCtrl.getUsers(UserTypes.admin),
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.admin)]
        },
        POST: {
            function: userCtrl.createUser(UserTypes.admin),
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.admin), dataParser, signupValidator]
        }
    },
    '/test/:id_1/me/:id_2': {
        GET: {
            function: (req, res) => res.end(JSON.stringify(req.params)),
            middlewares: [dataParser]
        }
    }
};