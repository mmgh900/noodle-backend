const ticketCtrl = require('./controllers/ticket');
const dataParser = require('noodle-data-parser');
const Authenticator = require('noodle-user-authentication');
const {authConfig} = require("./config");
const {UserTypes, noodleUserAuthorization} =  require('noodle-user-authorization');

const authenticator = new Authenticator(authConfig)
const ticketsSchemas  = require('./schemas/tickets-schema')
const NoodleDataValidation = require('noodle-data-validation')

const createTicketValidator = new NoodleDataValidation(ticketsSchemas.createTicket)

module.exports = {
    '/tickets': {
        GET: {
            function: ticketCtrl.getAllTickets,
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.supporter)]
        },
        PUT: {
            function: ticketCtrl.assignTicket,
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.supporter), dataParser]
        },
        POST: {
            function: ticketCtrl.createTicket,
            middlewares: [authenticator, noodleUserAuthorization(UserTypes.employee), dataParser, createTicketValidator]
        },
    },

};