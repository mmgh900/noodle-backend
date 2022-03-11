const propertyCtrl = require('./controllers/property');
const {UserTypes, noodleUserAuthorization} =  require('noodle-user-authorization');
const propertiesSchemas  = require('./schemas/properties-schema')
const NoodleDataValidation = require('noodle-data-validation')
const {defaultMiddlewares} = require("../../config");

const createPropertyValidator = new NoodleDataValidation(propertiesSchemas.createProperty)
const assignPropertyValidator = new NoodleDataValidation(propertiesSchemas.assignProperty)

module.exports = {
    '/properties': {
        GET: {
            function: propertyCtrl.getAllProperties,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.supporter)]
        },
        POST: {
            function: propertyCtrl.createProperty,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.supporter), createPropertyValidator]
        },
    },
    '/properties/:propertyId': {
        PATCH: {
            function: propertyCtrl.assignProperty,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.supporter), assignPropertyValidator]
        },
        DELETE: {
            function: propertyCtrl.deleteProperty,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.supporter)]
        },
    },


};