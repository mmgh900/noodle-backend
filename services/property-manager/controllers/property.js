const Property = require('../models/property');
const responseSender = require("gheysari-resposer");


async function getAllProperties(req, res) {
    try {
        const properties = await Property.getAll();
        responseSender.sendSuccessfulResponse(res, properties)
    } catch (error) {
        responseSender.sendInternalErrorResponse(res, error)
    }
}

async function createProperty(req, res) {
    try {
        await Property.add(req.data)
        responseSender.sendSuccessfulResponse(res)
    } catch (error) {
        responseSender.sendInternalErrorResponse(res, error)
    }
}

async function assignProperty(req, res) {
    try {
        const property = await Property.get(req.params.propertyId);
        await Property.update({
            ...property,
            employeeUsername: req.data.employeeUsername
        })
        responseSender.sendSuccessfulResponse(res)
    } catch (error) {
        responseSender.sendInternalErrorResponse(res, error)
    }
}

async function deleteProperty(req, res) {
    try {
        const property = await Property.remove(req.params.propertyId);
        responseSender.sendSuccessfulResponse(res)
    } catch (error) {
        responseSender.sendInternalErrorResponse(res, error)
    }
}

module.exports = {
    createProperty,
    getAllProperties,
    assignProperty,
    deleteProperty
};