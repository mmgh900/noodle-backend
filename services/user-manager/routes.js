const userCtrl = require('./controllers/user');
const {UserTypes, noodleUserAuthorization} =  require('noodle-user-authorization');
const usersSchemas  = require('./schemas/users-schema')
const NoodleDataValidation = require('noodle-data-validation')
const {defaultMiddlewares} = require("../../config");

const signupValidator = new NoodleDataValidation(usersSchemas.createUser)
const loginValidator = new NoodleDataValidation(usersSchemas.login)



module.exports = {
    '/users': {
        GET: {
            function: userCtrl.getUsers,
            middlewares: [...defaultMiddlewares,  noodleUserAuthorization(UserTypes.admin)]
        },
        POST: {
            function: userCtrl.createUser,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.supporter), signupValidator]
        }
    },
    '/users/login': {
        POST: {
            function: userCtrl.login,
            middlewares: [defaultMiddlewares[1], loginValidator]
        },
    },
    '/users/:username': {
        GET: {
            function: userCtrl.getUser,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.supporter)]
        },
        PATCH: {
            function: userCtrl.editUser,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.admin)]
        },
        DELETE: {
            function: userCtrl.deleteUser,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.admin)]
        }
    },

};