const Ticket = require('../models/ticket');
const c = require('../config');
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');


async function getAllTickets(req, res) {
    let tickets = await Ticket.getAll();
    res.statusCode = StatusCodes.OK
    res.setHeader('Content-Type', c.contentTypes.JSON);
    res.end(JSON.stringify({tickets}));
}

async function createTicket(req, res) {
    await Ticket.add({
        ...req.data,
        openerUsername: req.user.username
    })
    res.statusCode = StatusCodes.OK
    res.end()
}

// TODO: Write update method in the model
async function assignTicket(req, res) {
    await Ticket.update({
        id: req.data.id,
        supporterUsername: req.data.supporterUsername
    })
}


module.exports = {
    createTicket,
    getAllTickets,
    assignTicket
};