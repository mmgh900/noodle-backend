const query = require('../../../db')

class Ticket {
    id;
    title;
    supporterUsername;
    propertyId;
    openerUsername;
    createdAt;
    description;
    isOpen;

    constructor() {
        throw new Error('This is class not instantiatable. Please use static methods.')
    }

    static async init() {
        await query(
            `
            CREATE TABLE IF NOT EXISTS public.tickets
            (
                id serial NOT NULL,
                title character varying NOT NULL,
                supporter_username character varying,
                opener_username character varying,
                property_id integer NOT NULL,
                created_at timestamp NOT NULL,
                is_open boolean NOT NULL DEFAULT true,
                description character varying,
                
                PRIMARY KEY (id),
                FOREIGN KEY(supporter_username) REFERENCES public.users (username) ON DELETE CASCADE,
                FOREIGN KEY(opener_username) REFERENCES public.users (username) ON DELETE CASCADE,
                FOREIGN KEY(property_id) REFERENCES public.properties (id) ON DELETE CASCADE
            );
            `
        )
        console.log("Tickets table created!")
    }

    /**
     * @param id {number}
     * @returns {Promise<Ticket>}
     */
    static async get(id) {
        const result = await query('SELECT * FROM public.tickets WHERE id = $1', [id])
        return result.rows[0]
    }

    /**
     * @param supporterUsername {string}
     * @param propertyId {number}
     * @param openerUsername {string}
     * @param startDate {string}
     * @param endDate {string}
     * @param isOpen {boolean}
     * @returns {Promise<Ticket[]>}
     */
    static async getAll(supporterUsername, propertyId, openerUsername, startDate, endDate, isOpen) {
        // TODO: Apply filters
        const result = await query(`
            SELECT * FROM public.tickets
            WHERE 
        `)
        return result.rows
    }

    /**
     * @param Ticket {Ticket}
     * @returns {Promise<void>}
     */
    static async add({title, description, propertyId, openerUsername}) {
        const result = await query(`
            INSERT INTO public.tickets
                (title, description, property_id, opener_username, created_at)
                VALUES ($1,$2, $3, $4, CURRENT_TIMESTAMP)
                RETURNING public.tickets."id" AS id
            `, [title, description, propertyId, openerUsername])
    }


    /**
     * @param Ticket {Ticket}
     * @returns {Promise<void>}
     */
    static async update({id, title, description, propertyId, openerUsername, isOpen, supporterUsername}) {
        const result = await query(`
            UPDATE public.tickets
            SET title = $1,
                description = $2,
                property_id = $3,
                opener_username = $4,
                supporter_username = $5,
                is_open = $6
            WHERE id = $7
            `, [title, description, propertyId, openerUsername, supporterUsername, isOpen, id])
    }


    /**
     * @param id {number}
     * @returns {Promise<void>}
     */
    static async remove(id) {
        await query(`DELETE FROM public.tickets id = $1`, [id])
    }

}

module.exports = Ticket;