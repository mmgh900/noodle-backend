const query = require('../../../db')

class Ticket {
    id;
    title;
    supporterUsername;
    relatedToProperty;
    openerUsername;
    createdAt;
    description;
    isOpen;


    constructor(title, description, relatedToProperty, openerUsername) {
        this.title = title;
        this.description = description;
        this.relatedToProperty = relatedToProperty;
        this.openerUsername = openerUsername
    }

    static async init() {
        await query(
            `
            CREATE TABLE IF NOT EXISTS public."Ticket"
            (
                "id" serial NOT NULL,
                "title" character varying NOT NULL,
                "supporterUsername" character varying,
                "openerUsername" character varying,
                "relatedToProperty" integer NOT NULL,
                "createdAt" timestamp NOT NULL,
                "isOpen" boolean NOT NULL DEFAULT true,
                "description" character varying,
                
                PRIMARY KEY (id),
                FOREIGN KEY("supporterUsername") REFERENCES public."User" (username) ON DELETE CASCADE,
                FOREIGN KEY("openerUsername") REFERENCES public."User" (username) ON DELETE CASCADE,
                FOREIGN KEY("relatedToProperty") REFERENCES public."Property" (id) ON DELETE CASCADE
            );
            `
        )
        console.log("Ticket table created!")
    }

    static async getAll() {
        const result = await query(`SELECT * FROM "Ticket"`)
        return result.rows
    }

    /**
     * @param Ticket {Ticket}
     * @returns {Promise<void>}
     */
    static async add({title, description, relatedToProperty, openerUsername}) {
        await query(`
            INSERT INTO public."Ticket"
                ("title", "description", "relatedToProperty", "openerUsername", "createdAt")
                VALUES ($1,$2, $3, $4, CURRENT_TIMESTAMP)
                RETURNING "Ticket"."id" AS id
            `, [title, description, relatedToProperty, openerUsername])
    }

    /**
     * @param id {number}
     * @returns {Promise<void>}
     */
    static async remove(id) {
        await query(`DELETE FROM "Ticket" AS P WHERE P."id"=$1`, [id])
    }

}

module.exports = Ticket;