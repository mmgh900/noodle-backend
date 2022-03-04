module.exports = {
    createProperty: {
        type: "object",
        properties: {
            assignedTo: {type: "string"},
            name: {type: "string", minLength: 2, maxLength: 20},
        },
        required: ["name", "assignedTo"]
    },
}