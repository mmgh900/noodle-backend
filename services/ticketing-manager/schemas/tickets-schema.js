module.exports = {
    createTicket: {
        type: "object",
        properties: {
            relatedToProperty: {type: "string"},
            title: {type: "string", minLength: 3, maxLength: 50},
            description: {type: "string", minLength: 3, maxLength: 200}
        },
        required: ["title", "description", "relatedToProperty"]
    },
}