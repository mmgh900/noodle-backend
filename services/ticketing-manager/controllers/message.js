const Message = require('../models/message');
const responseSender = require("gheysari-resposer");
const {StatusCodes} = require("http-status-codes");


async function getAllMessagesByTicketId(req, res) {
    try {
        const messages = await Message.getAll(req.params.ticketId);
        responseSender.sendSuccessfulResponse(res, messages)
    } catch (error) {
        responseSender.sendInternalErrorResponse(res, error)
    }
}

async function createMessage(req, res) {
    try {
        await Message.add({
            ...req.data,
            ticketId: req.params.ticketId,
            senderUsername: req.user.username
        })
        responseSender.sendSuccessfulResponse(res)
    } catch (error) {
        if (parseInt(error.code) === 23503) {
            res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({
                message: "The ticket that you are trying to add message to does not exist!"
            }));
        } else {
            responseSender.sendInternalErrorResponse(res, error)
        }

    }
}

module.exports = {
    getAllMessagesByTicketId,
    createMessage
};