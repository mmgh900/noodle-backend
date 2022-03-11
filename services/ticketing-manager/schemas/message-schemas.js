module.exports = {
    createMessage: {
        type: "object",
        properties: {
            senderUsername: {type: "string"},
            ticketId: {type: "number"},
            text: {type: "string", minLength: 3, maxLength: 200},
        },
        required: ["senderUsername", "ticketId", "text"]
    }
}