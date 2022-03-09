const query = require('../../../db')

class Ticket {
    id;
    ticketId;
    assignedTo;
    text;


    constructor(ticketId, assignedTo, text) {
        this.ticketId = ticketId;
        this.assignedTo = assignedTo;
        this.text = text;
    }

    static async init() {
        await query(
            `
            CREATE TABLE IF NOT EXISTS public."Message"
            (
                id serial NOT NULL,
                ticketId character varying NOT NULL,
                assignedTo character varying NOT NULL,
                text character varying NOT NULL,
                PRIMARY KEY (id)
               
                FOREIGN KEY("assignedTo") REFERENCES public."User" (username) ON DELETE CASCADE,
                FOREIGN KEY("ticketId") REFERENCES public."Ticket" (id) ON DELETE CASCADE
            );
            `
        )
        console.log("Message table created!")
    }

    static async getAllByTicketId() {
        const result = await query(`SELECT M.* , T.relatedToProperty , T.createdAt , T.description , T.isOpen
        FROM "Message" AS M
        INNER JOIN ticket AS T ON M."ticketId" = T."id"
        WHERE T."id"=${ticketId}`)
        return result.rows
    }

    /**
     * @param Ticket {Ticket}
     * @returns {Promise<void>}
     */
    static async add({ticketId, assignedTo, text}) {
        await query(`
            INSERT INTO public."Message"
                ("ticketId", "assignedTo", "text")
                VALUES ($1,$2, $3)
                RETURNING "Message"."id" AS id
            `, [ticketId, assignedTo, text])
    }

    /**
     * @param id {number}
     * @returns {Promise<void>}
     */

    static async remove(id) {
        await query(`DELETE FROM "Message" AS U WHERE U."id"=$1`, [id])
    }

}

module.exports = Message;