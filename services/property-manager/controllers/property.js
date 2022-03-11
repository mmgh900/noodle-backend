const Property = require('../models/property');
const responseSender = require("gheysari-resposer");
const globalConfig = require("../../../config");
const axios = require("axios");
const {UserTypes} = require("noodle-user-authorization");
const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");


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
        await _checkBeingEmployee(res, req.data.employeeUsername)
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
/**
 * @param res
 * @param username {string}
 * @private
 */
async function _checkBeingEmployee(res, username) {
    const token = jwt.sign(
        {
            username: "admin",
            type: 3
        },
        globalConfig.authConfig.TOKEN_KEY,
        {
            expiresIn: "1s",
        }
    )
    const result = await axios.get(`${globalConfig.serverConfig.getUrl()}/users/${username}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    const userType = result.data.type
    if (userType !== UserTypes.supporter){
        res.statusCode = StatusCodes.BAD_REQUEST
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({
            message: "Properties can only be assigned to employees."
        }));
    }
}

async function deleteProperty(req, res) {
    try {
        await Property.remove(req.params.propertyId);
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