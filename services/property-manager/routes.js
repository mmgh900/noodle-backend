const propertyCtrl = require('./controllers/property');
const dataParser = require('noodle-data-parser');
const Authenticator = require('noodle-user-authentication');
const authorization = require('noodle-user-authorization');
const {authConfig} = require("./config");
const {UserTypes} = require("../../config");

const authenticator = new Authenticator(authConfig)

module.exports = {
    '/properties': {
        GET: {
            function: propertyCtrl.getAllProperties,
            middlewares: [authenticator, authorization(UserTypes.supporter)]
        },
        PUT: {
            function: propertyCtrl.assignProperty,
            middlewares: [authenticator, authorization(UserTypes.supporter), dataParser]
        },
        POST: {
            function: propertyCtrl.createProperty,
            middlewares: [authenticator, authorization(UserTypes.supporter), dataParser]
        },
    },

};