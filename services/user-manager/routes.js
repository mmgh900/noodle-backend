const userCtrl = require('./controllers/user');
const dataParser = require('noodle-data-parser');
const Authenticator = require('noodle-user-authentication');
const {authConfig} = require("./config");

const authenticator = new Authenticator(authConfig)

module.exports = {
    '/users': {
        GET: {
            function: userCtrl.getUsers,
            middlewares: [authenticator]
        },
        POST: {
            function: userCtrl.createUser,
            middlewares: [dataParser]
        }
    }
};