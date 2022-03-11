const query = require("../../../db")
const {
    hashPassword,
    comparePassword
} = require('../utils/password-hashing');
const c = require("../config")
const {UserTypes} = require('noodle-user-authorization');
const {primaryAdminConfig} = require("../config");

class User {
    username;
    password;
    firstname;
    lastname;
    email;
    type;

    constructor() {
        throw new Error('This is class not instantiatable. Please use static methods.')
    }

    static async init() {
        await query(
            `
                CREATE TABLE IF NOT EXISTS public.users
                (
                    firstname character varying,
                    lastname character varying,
                    email character varying,
                    username character varying NOT NULL,
                    password character varying NOT NULL,
                    type smallint NOT NULL,
                    created_at timestamp NOT NULL,
                    PRIMARY KEY (username)
                );
            `
        )

        console.log("User table created!")
        // Creating superuser if doesn't exist
        const hashedPassword = await hashPassword(primaryAdminConfig.password);
        await query(`INSERT INTO  users (username, password, type, created_at) 
                            VALUES ($1, $2, 3, CURRENT_TIMESTAMP) ON CONFLICT DO NOTHING;`,
            [c.primaryAdminConfig.username, hashedPassword])
        console.log("SuperUser created!")
    }

    /**
     * @param type {UserTypes}
     * @returns {Promise<User[]>}
     */
    static async getAll(type) {
        let result;
        if (type) {
            result = await query(`SELECT * FROM public.users WHERE type = $1;`, [type])
        } else {
            result = await query(`SELECT * FROM public.users;`)
        }
        return result.rows.map(item => {
            delete item.password
            return item
        })
    }

    /**
     * @param {User} user
     * @returns {Promise<void>}
     */
    static async add({firstname, lastname, email, username, password, type}) {
        const result = await query(`
                INSERT INTO public.users
                (firstname, lastname, email, username, password, type, created_at)
                    VALUES ($1, $2, $3, $4, $5, $6, to_timestamp(${Date.now()} / 1000.0));
         
        `, [firstname, lastname, email, username, password, type])

    }


    /**
     * @param {string} username
     * @returns {Promise<void>}
     */
    static async get(username) {
        const result = await query(`
           SELECT * FROM public.users WHERE username = $1;
        `, [username])
        return result.rows[0]
    }


    /**
     * @param {User} user
     * @returns {Promise<void>}
     */
    static async update({firstname, lastname, email, username, password, type}) {
        const result = await query(`
                UPDATE public.users
                SET firstname = $1,
                    lastname = $2,
                    email = $3,
                    username = $4,
                    password = $5,
                    type = $6
                    WHERE username = $7;
         
        `, [firstname, lastname, email, username, password, type, username])

    }


    /**
     * @param {string} username
     * @returns {Promise<void>}
     */
    static async delete(username) {
        await query(`
           DELETE FROM public.users WHERE username = $1;
        `, [username])

    }
}

module.exports = User;