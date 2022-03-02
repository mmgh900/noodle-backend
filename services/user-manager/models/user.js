let usersList = [];
const query = require('../../../db')

class User {
    constructor(user) {
        this._username = user.username;
        this._password = user.password || null;
        this._name = user.name || null;
    }

    /**
     * Different types of user
     * @type {{admin: number, employee: number, supporter: number}}
     */
    static UserTypes = {
        "employee": 1,
        "supporter": 2,
        "admin": 3
    }

    static async init() {
        await query(
            `
            do $$
            begin 
                CREATE TABLE IF NOT EXISTS "User"(
                    username character varying NOT NULL,
                    type smallint NOT NULL DEFAULT 1,
                    password character varying NOT NULL,
                    PRIMARY KEY (username)
                );
            end;
            $$
            `
        )
        console.log("User table created!")
    }

    addUser(username, type, password) {
        query(`
            do $$
            begin
                INSERT INTO User
                    username, type, password)
                    VALUES ($1, $2, $3);
            end;
            $$
        `, [username, type, password])

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