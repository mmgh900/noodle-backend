const query = require('../../../db')

class Property {
    name;
    assignedTo;
    id;

    constructor(id, name, assignedTo) {
        this.id = id
        this.name = name
        this.assignedTo = assignedTo
    }

    static async init() {
        await query(
            `
            CREATE TABLE IF NOT EXISTS public."Property"
            (
                id serial NOT NULL,
                name character varying NOT NULL,
                assignedTo character varying NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY(assignedTo) REFERENCES public."User" (username) ON DELETE CASCADE
            );
            `
        )
        console.log("Property table created!")
    }

    static async getAll() {
        const result = await query(`SELECT * FROM "Property"`)
        return result.rows
    }

    static async add({name, assignedTo}) {
        await query(`
            INSERT INTO public."Property"
                (name, assignedTo)
                VALUES ($1,$2)
                RETURNING "Property"."id" AS id
            `, [name, assignedTo])
    }

    static async remove(id) {
        await query(`DELETE FROM "Property" AS P WHERE P."id"=$1`, [id])
    }

    static async update(property) {
        return "property updated"
    }

}

module.exports = Property;