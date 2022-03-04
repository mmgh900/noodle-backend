const query = require("../../../db")
const {UserTypes} = require("../../../config")

class User {
    username;
    password;
    firstname;
    lastname;
    email;
    type;

    constructor(firstname, lastname, email, username, password, type) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.type = type;
    }

    static async init() {
        await query(
            `
            DO $$
            BEGIN 
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
            END;
            $$
            `
        )
        console.log("User table created!")
        // Creating superuser if doesn't exist
        await query(`INSERT INTO  public."User" (username, password, type, createdAt) VALUES ('admin', 'admin', 3, CURRENT_TIMESTAMP) ON CONFLICT DO NOTHING;`)
        console.log("SuperUser created!")
    }

    static async getAll() {
        return usersList
    }

    static async add(firstname, lastname, email, username, password, type) {
        const p = query(`
        
                INSERT INTO public."User"
                (firstname, lastname, email, username, password, type, createdAt)
                    VALUES ($1, $2, $3, $4, $5, $6, to_timestamp(${Date.now()} / 1000.0));
         
        `, [firstname, lastname, email, username, password, type])
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