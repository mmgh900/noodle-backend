const ticketCtrl = require('./controllers/ticket');
const messageCtrl = require('./controllers/message');

const {UserTypes, noodleUserAuthorization} =  require('noodle-user-authorization');


const ticketsSchemas  = require('./schemas/ticket-schemas')
const messageSchemas  = require('./schemas/message-schemas')
const NoodleDataValidation = require('noodle-data-validation')
const {defaultMiddlewares} = require("../../config");

const createTicketValidator = new NoodleDataValidation(ticketsSchemas.createTicket)
const editTicketValidator = new NoodleDataValidation(ticketsSchemas.editTicket)
const createMessageValidator = new NoodleDataValidation(messageSchemas.createMessage)

module.exports = {
    '/tickets': {
        GET: {
            function: ticketCtrl.getAllTickets,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.supporter)]
        },
        POST: {
            function: ticketCtrl.createTicket,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.employee), createTicketValidator]
        },
    },
    '/tickets/:ticketId': {
        GET: {
            function: ticketCtrl.getTicket,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.supporter)]
        },
        PATCH: {
            function: ticketCtrl.editTicket,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.supporter), editTicketValidator]
        },
        DELETE : {
            function: ticketCtrl.deleteTicket,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.supporter)]
        }
    },
    '/tickets/:ticketId/messages': {
        GET: {
            function: messageCtrl.getAllMessagesByTicketId,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.employee)]
        },
        POST: {
            function: messageCtrl.createMessage,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.employee), createMessageValidator]
        },
    }

};