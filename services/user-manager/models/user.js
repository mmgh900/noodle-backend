class User {
    username;
    password;
    firstname;
    lastname;
    email;
    type;

    constructor(username, password, type, firstname, lastname, email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    static async getAll() {
        return usersList
    }

    static async add(user) {
        return "user added"
    }

    static async remove(username) {
        return "user deleted"
    }

    static async update(user) {
        return "user updated"
    }

    static async get(username) {
        return new User("mmgh900", "1234", 1, "mahdi", "gheysari", "gheysari.mm@gmail.com",)
    }
}

module.exports = User;