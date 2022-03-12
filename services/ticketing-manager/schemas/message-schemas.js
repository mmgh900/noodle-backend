module.exports = {
    createMessage: {
        type: "object",
        properties: {
            text: {type: "string", minLength: 3, maxLength: 200},
        },
        required: ["text"]
    }
}