const Message = require('../models/message');
const c = require('../config');
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');


async function getAllMessagesByTicketId(req, res) {
    let tickets = await Message.getAllByTicketId(req.params.ticketId);
    res.statusCode = StatusCodes.OK
    res.setHeader('Content-Type', c.contentTypes.JSON);
    res.end(JSON.stringify({tickets}));
}

async function createMessage(req, res) {
    await Message.add(req.data)
    res.statusCode = StatusCodes.OK
    res.end()
}



module.exports = {
    getAllMessagesByTicketId,
    createMessage
};