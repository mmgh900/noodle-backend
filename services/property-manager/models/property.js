const query = require('../../../db')

class Property {
    name;
    employeeUsername;
    createdAt
    id;

    constructor() {
        throw new Error('This is class not instantiatable. Please use static methods.')
    }

    /**
     * @returns {Promise<void>}
     */
    static async init() {
        await query(
            `
            CREATE TABLE IF NOT EXISTS public.properties
            (
                id serial NOT NULL,
                name character varying NOT NULL,
                employee_username character varying NOT NULL,
                
                PRIMARY KEY (id),
                FOREIGN KEY(employee_username) REFERENCES public.users (username) ON DELETE CASCADE
            );
            `
        )
        console.log("Property table created!")
    }

    /**
     * @returns {Promise<Property[]>}
     */
    static async getAll() {
        const result = await query(`SELECT * FROM public.properties`)
        return result.rows
    }

    /**
     * @param name {string}
     * @param employeeUsername {string}
     * @returns {Promise<void>}
     */
    static async add({name, employeeUsername}) {
        await query(`
            INSERT INTO public.properties
                (name, employee_username)
                VALUES ($1,$2)
                RETURNING public.properties."id" AS id
            `, [name, employeeUsername])
    }

    /**
     * @param id {number}
     * @returns {Promise<User>}
     */
    static async get(id) {
        const result = await query(`SELECT * FROM public.properties WHERE id = $1`, [id])
        return result.rows[0]
    }

    /**
     * @param id {number}
     * @returns {Promise<void>}
     */
    static async remove(id) {
        await query(`DELETE FROM public.properties WHERE id = $1`, [id])
    }

    /**
     * @param id {number}
     * @param name {string}
     * @param employeeUsername {string}
     * @returns {Promise<void>}
     */
    static async update({id, name, employeeUsername}) {
        const result = await query(`
            UPDATE public.properties
            SET name = $1,
                employee_username = $2
            WHERE id = $3   
        `, [name, employeeUsername, id])
        return result
    }

}

module.exports = Property;