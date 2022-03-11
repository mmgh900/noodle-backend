module.exports = {
    createProperty: {
        type: "object",
        properties: {
            supporter_username: {type: "string"},
            name: {type: "string", minLength: 2, maxLength: 20},
        },
        required: ["name", "supporter_username"]
    },
}