const query = require('../../../db')

class Property {
    name;
    supporterUsername;
    id;

    constructor(id, name, supporterUsername) {
        this.id = id
        this.name = name
        this.supporterUsername = supporterUsername
    }

    static async init() {
        await query(
            `
            CREATE TABLE IF NOT EXISTS public."Property"
            (
                id serial NOT NULL,
                name character varying NOT NULL,
                supporterUsername character varying NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY(supporterUsername) REFERENCES public."User" (username) ON DELETE CASCADE
            );
            `
        )
        console.log("Property table created!")
    }

    static async getAll() {
        const result = await query(`SELECT * FROM "Property"`)
        return result.rows
    }

    static async add({name, supporterUsername}) {
        await query(`
            INSERT INTO public."Property"
                (name, supporterUsername)
                VALUES ($1,$2)
                RETURNING "Property"."id" AS id
            `, [name, supporterUsername])
    }

    static async remove(id) {
        await query(`DELETE FROM "Property" AS P WHERE P."id"=$1`, [id])
    }

    static async update(property) {
        return "property updated"
    }

}

module.exports = Property;