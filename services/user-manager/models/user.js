const query = require('../../../db')

class User {

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
            end;
            $$
            `
        )
        console.log("User table created!")
        // super user
        this.add(null, null, null, "admin", "admin", this.UserTypes.admin)
        console.log("SuperUser created!")
    }

    static async add(firstname, lastname, email, username, password, type) {
         const p = query(`
        
                INSERT INTO public."User"
                (firstname, lastname, email, username, password, type, createdAt)
                    VALUES ($1, $2, $3, $4, $5, $6, to_timestamp(${Date.now()} / 1000.0));
         
        `, [firstname, lastname, email, username, password, type])
        // .then(error => console.log)
        // .catch(error => console.log)

    }


    static async getAll() {
        // TODO: Replace with database queries
    }

    static async delete() {
        //delete
    }

}

module.exports = User;