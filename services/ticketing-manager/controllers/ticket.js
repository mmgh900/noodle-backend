const Ticket = require('../models/ticket');
const globalConfig = require('../../../config')
const responseSender = require("gheysari-resposer");
const axios = require("axios");
const {UserTypes} = require("noodle-user-authorization");
const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function getTicket(req, res) {
    try {
        const ticket = await Ticket.get(req.params.ticketId);
        responseSender.sendSuccessfulResponse(res, ticket)
    } catch (error) {
        responseSender.sendInternalErrorResponse(res, error)
    }
}


async function getAllTickets(req, res) {
    try {
        const tickets = await Ticket.getAll();
        responseSender.sendSuccessfulResponse(res, tickets)
    } catch (error) {
        responseSender.sendInternalErrorResponse(res, error)
    }
}

async function createTicket(req, res) {

    try {
        const ticketData = {
            ...req.data,
            openerUsername: req.user.username
        }
        await Ticket.add(ticketData)
        responseSender.sendSuccessfulResponse(res)
    } catch (error) {
        if (parseInt(error.code) === 23503) {
            res.statusCode = StatusCodes.BAD_REQUEST
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({message: "This property doesn't exist!"}));
        } else {
            responseSender.sendInternalErrorResponse(res, error)
        }

    }
}


async function editTicket(req, res) {
    try {
        await _checkBeingSupporter(res, req.data.supporterUsername)
        const ticket = await Ticket.get(req.params.ticketId);
        await Ticket.update({
            propertyId: ticket['property_id'],
            isOpen: req.data.supporterUsername ? req.data.supporterUsername : ticket['is_open'],
            openerUsername: ticket['opener_username'],
            description: ticket['description'],
            title: ticket['title'],
            id: ticket['id'],
            createdAt: ticket['created_at'],
            supporterUsername: req.data.supporterUsername ? req.data.supporterUsername : ticket['supporter_username']
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
async function _checkBeingSupporter(res, username) {
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
    if (userType !== UserTypes.supporter) {
        res.statusCode = StatusCodes.BAD_REQUEST
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({
            message: "Tickets can only be assigned to supporters."
        }));
    }
}


async function deleteTicket(req, res) {
    try {
        await Ticket.remove(req.params.ticketId)
        responseSender.sendSuccessfulResponse(res)
    } catch (error) {
        responseSender.sendInternalErrorResponse(res, error)
    }
}


module.exports = {
    createTicket,
    getAllTickets,
    editTicket,
    deleteTicket,
    getTicket
};