const propertyCtrl = require('./controllers/property');
const dataParser = require('noodle-data-parser');
const Authenticator = require('noodle-user-authentication');
const authorization = require('noodle-user-authorization');

const authenticator = new Authenticator(authConfig)

module.exports = {
    '/properties': {
        GET: {
            function: propertyCtrl.getAllProperties,
            middlewares: [authenticator, authorization(2)]
        },
        PUT: {
            function: propertyCtrl.assignProperty,
            middlewares: [authenticator, authorization(2), dataParser]
        },
        POST: {
            function: propertyCtrl.createProperty,
            middlewares: [authenticator, authorization(2), dataParser]
        },
    },

};