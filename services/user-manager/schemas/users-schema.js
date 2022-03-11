module.exports = {
    createUser: {
        type: "object",
        properties: {
            type: {type: "integer", minimum: 1, maximum: 3},
            username: {type: "string", minLength: 3, maxLength: 20},
            firstname: {type: "string", minLength: 2, maxLength: 20},
            lastname: {type: "string", minLength: 2, maxLength: 20},
            email: {description: "Email of the user", type: "string", format: "email", maxLength: 50},
            password: {type: "string", minLength: 6, maxLength: 20},
        },
        required: ["username", "firstname", "lastname", "email", "password", "type"]
    },
    login: {
        type: "object",
        properties: {
            username: {type: "string"},
            password: {type: "string"},
        },
        required: ["username", "password"]
    },
    editUser: {
        type: "object",
        properties: {
            type: {type: "integer", minimum: 1, maximum: 3},
            firstname: {type: "string", minLength: 2, maxLength: 20},
            lastname: {type: "string", minLength: 2, maxLength: 20},
            email: {description: "Email of the user", type: "string", format: "email", maxLength: 50},
            password: {type: "string", minLength: 6, maxLength: 20},
        },
    }
}