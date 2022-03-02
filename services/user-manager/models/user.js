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
                    username character varying NOT NULL,
                    password character(15) NOT NULL,
                    type smallint NOT NULL,
                    firstname character varying NOT NULL,
                    lastname character varying NOT NULL,
                    email character varying NOT NULL,
                    "createdAt" date NOT NULL,
                    PRIMARY KEY (username)
                );
            end;
            $$
            `
        )
        console.log("User table created!")
      // super user
        console.log("SuperUser created!")
    }

    static addUser(username, type, password) {
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


    static getAllUsers() {
        // TODO: Replace with database queries
        return usersList.map(user => {
            user = JSON.parse(JSON.stringify(user));
            delete user.password;
            return user;
        });
    }

    static deleteUser(){
        //delete
    }

}

module.exports = User;