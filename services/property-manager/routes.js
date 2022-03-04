const propertyCtrl = require('./controllers/property');
const dataParser = require('noodle-data-parser');
const Authenticator = require('noodle-user-authentication');
const {authConfig} = require("./config");
const {UserTypes, noodleUserAuthorization} =  require('noodle-user-authorization');

const authenticator = new Authenticator(authConfig)
const propertiesSchemas  = require('./schemas/properties-schema')
const NoodleDataValidation = require('noodle-data-validation')

const createPropertyValidator = new NoodleDataValidation(propertiesSchemas.createProperty)

module.exports = {
    '/properties': {
        GET: {
            function: propertyCtrl.getAllProperties,
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.supporter)]
        },
        PUT: {
            function: propertyCtrl.assignProperty,
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.supporter), dataParser]
        },
        POST: {
            function: propertyCtrl.createProperty,
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.supporter), dataParser, createPropertyValidator]
        },
    },

};