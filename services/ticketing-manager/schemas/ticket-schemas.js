module.exports = {
    createTicket: {
        type: "object",
        properties: {
            propertyId: {type: "number"},
            title: {type: "string", minLength: 3, maxLength: 50},
            description: {type: "string", minLength: 3, maxLength: 200}
        },
        required: ["title", "description", "propertyId"]
    },
    assignTicket: {
        type: "object",
        properties: {
            supporterUsername: {type: "string"}
        },
        required: ["supporterUsername"]
    }
}