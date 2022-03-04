const Property = require('../models/property');
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');


async function getAllProperties(req, res) {
    let properties = await Property.getAll();
    res.statusCode = StatusCodes.OK
    res.setHeader('Content-Type', c.contentTypes.JSON);
    res.end(JSON.stringify({properties}));
}

async function createProperty(req, res) {
    await Property.add(req.data)
    res.statusCode = StatusCodes.OK
    res.end()
}

async function assignProperty(req, res) {
    await Property.update({
        id: req.data.id,
        assignedTo: req.data.assignedTo
    })
}


module.exports = {
    createProperty,
    getAllProperties,
    assignProperty
};