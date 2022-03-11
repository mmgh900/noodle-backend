const ticketCtrl = require('./controllers/ticket');

const {UserTypes, noodleUserAuthorization} =  require('noodle-user-authorization');


const ticketsSchemas  = require('./schemas/ticket-schemas')
const messageSchemas  = require('./schemas/message-schemas')
const NoodleDataValidation = require('noodle-data-validation')
const {defaultMiddlewares} = require("../../config");

const createTicketValidator = new NoodleDataValidation(ticketsSchemas.createTicket)
const assignTicketValidator = new NoodleDataValidation(ticketsSchemas.assignTicket)
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
            function: ticketCtrl.assignTicket,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.supporter), assignTicketValidator]
        },
        DELETE : {
            function: ticketCtrl.deleteTicket,
            middlewares: [...defaultMiddlewares, noodleUserAuthorization(UserTypes.supporter)]
        }
    }

};