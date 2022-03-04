const query = require("../../../db")
const {UserTypes} = require("../../../config")

class User {
    username;
    password;
    firstname;
    lastname;
    email;
    type;

    /**
     * @param username {string}
     * @param password {string}
     * @param type {UserTypes}
     * @param firstname {string}
     * @param lastname {string}
     * @param email {string}
     */
    constructor(username, password, type, firstname, lastname, email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    static async init() {
        await query(
            `
                CREATE TABLE IF NOT EXISTS public."User"
                (
                    firstname character varying,
                    lastname character varying,
                    email character varying,
                    username character varying NOT NULL,
                    password character(15) NOT NULL,
                    type smallint NOT NULL,
                    createdAt timestamp NOT NULL,
                    PRIMARY KEY (username)
                );
            `
        )
        console.log("User table created!")
        // Creating superuser if doesn't exist
        await query(`INSERT INTO  public."User" (username, password, type, createdAt) VALUES ('admin', 'admin', 3, CURRENT_TIMESTAMP) ON CONFLICT DO NOTHING;`)
        console.log("SuperUser created!")
    }

    /**
     * @param type {UserTypes}
     * @returns {Promise<*>}
     */
    static async getAll(type) {
        return usersList
    }

    /**
     * @param {User} user
     * @returns {Promise<void>}
     */
    static async add(user) {
        const {firstname, lastname, email, username, password, type} = user
        const p = await query(`
                INSERT INTO public."User"
                (firstname, lastname, email, username, password, type, createdAt)
                    VALUES ($1, $2, $3, $4, $5, $6, to_timestamp(${Date.now()} / 1000.0));
         
        `, [firstname, lastname, email, username, password, type])
    }

    /**
     * @param {string} username
     * @returns {Promise<void>}
     */
    static async remove(username) {
        return "user deleted"
    }

    /**
     * @param {User} user
     * @returns {Promise<void>}
     */
    static async update(user) {
        return "user updated"
    }

    /**
     * @param {string} username
     * @returns {Promise<void>}
     */
    static async get(username) {
        const result = await query(`
           SELECT * FROM "User" WHERE username = $1;
        `, [username])
        return result.rows[0]
    }
}

module.exports = User;