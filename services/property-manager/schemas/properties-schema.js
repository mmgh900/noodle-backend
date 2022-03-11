module.exports = {
    createProperty: {
        type: "object",
        properties: {
            employeeUsername: {type: "string"},
            name: {type: "string", minLength: 2, maxLength: 20},
        },
        required: ["name", "employeeUsername"]
    },
    assignProperty: {
        type: "object",
        properties: {
            employeeUsername: {type: "string"},
        },
        required: ["employeeUsername"]
    }
}