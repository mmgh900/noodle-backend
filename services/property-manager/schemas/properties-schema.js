module.exports = {
    createProperty: {
        type: "object",
        properties: {
            supporterUsername: {type: "string"},
            name: {type: "string", minLength: 2, maxLength: 20},
        },
        required: ["name", "supporterUsername"]
    },
}