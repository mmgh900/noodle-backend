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
    
    editTicket: {
        type: "object",
        properties: {
            supporterUsername: {type: "string"},
            isOpen: {type: "boolean"}
        },
        required: []
    }
}