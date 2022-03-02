const query = require('../../../db')

class Property {

    static async init() {
        await query(
            `
            do $$
            begin 
                //created table
            end;
            $$
            `
        )
        console.log("Property table created!")
    }

    static addProprty(username, type, password) {
        query(`
            do $$
            begin
            
            end;
            $$
        `, [username, type, password])

    }


    static getAllProprties() {
        // TODO: Replace with database queries
        return usersList.map(user => {
            user = JSON.parse(JSON.stringify(user));
            delete user.password;
            return user;
        });
    }

    static deleteProperty(){
        //delete
    }

}

module.exports = Property;