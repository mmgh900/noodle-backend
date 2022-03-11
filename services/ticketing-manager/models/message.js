const query = require('../../../db')

class Message {
    id;
    ticketId;
    senderUsername;
    text;


    constructor(ticketId, senderUsername, text) {
        this.ticketId = ticketId;
        this.senderUsername = senderUsername;
        this.text = text;
    }

    static async init() {
        await query(
            `
            CREATE TABLE IF NOT EXISTS public."Message"
            (
                id serial NOT NULL,
                "ticketId" character varying NOT NULL,
                "senderUsername" character varying NOT NULL,
                "text" character varying NOT NULL,
                
                PRIMARY KEY (id),
                FOREIGN KEY("senderUsername") REFERENCES public."User" (username) ON DELETE CASCADE,
                FOREIGN KEY("ticketId") REFERENCES public."Ticket" (id) ON DELETE CASCADE
            );
            `
        )
        console.log("Message table created!")
    }

    /**
     * @param ticketId {number}
     * @returns {Promise<*>}
     */
    static async getAllByTicketId(ticketId) {
        const result = await query(`
            SELECT *
            FROM "Message" AS M
            INNER JOIN ticket AS T ON M."ticketId" = T."id"
            WHERE T."id"=${ticketId}
        `)
        return result.rows
    }

    /**
     * @param message {Message}
     * @returns {Promise<void>}
     */
    static async add({ticketId, senderUsername, text}) {
        await query(`
            INSERT INTO public."Message"
                ("ticketId", "senderUsername", "text")
                VALUES ($1,$2, $3)
                RETURNING "Message"."id" AS id
            `, [ticketId, senderUsername, text])
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