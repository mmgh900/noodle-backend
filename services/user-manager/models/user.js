let usersList = [];

class User {
    constructor(user) {
        this._username = user.username;
        this._password = user.password || null;
        this._name = user.name || null;
    }

    static init() {
        // TODO: Creating users table if not exists
    }


    save() {
        // TODO: Replace with database queries
        let user = {
            username: this._username,
            name: this._name,
            password: this._password
        };
        usersList.push(user);
    }

    static getAll() {
        // TODO: Replace with database queries
        return usersList.map(user => {
            user = JSON.parse(JSON.stringify(user));
            delete user.password;
            return user;
        });
    }

}

module.exports = User;