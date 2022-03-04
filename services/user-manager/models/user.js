let usersList = [];

class User {
    static async getAll() {
        return usersList
    }

    static async add() {
        return "user added"
    }

    static async remove() {
        return "user deleted"
    }

    static async update() {
        return "user updated"
    }
}

module.exports = User;