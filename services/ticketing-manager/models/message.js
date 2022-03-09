const query = require('../../../db')

class Message {
    id;
    ticketId;
    senderId;
    text;


    constructor(ticketId, senderId, text) {
        this.ticketId = ticketId;
        this.senderId = senderId;
        this.text = text;
    }

    static async init() {
        await query(
            `
            CREATE TABLE IF NOT EXISTS public."Message"
            (
                'id' serial NOT NULL,
                'ticketId' character varying NOT NULL,
                'senderId' character varying NOT NULL,
                'text' character varying NOT NULL,
                
                PRIMARY KEY (id)
                FOREIGN KEY("senderId") REFERENCES public."User" (username) ON DELETE CASCADE,
                FOREIGN KEY("ticketId") REFERENCES public."Ticket" (id) ON DELETE CASCADE
            );
            `
        )
        console.log("Message table created!")
    }

    /**
     * @param messageId {number}
     * @returns {Promise<*>}
     */
    static async getAllByMessageId(messageId) {
        const result = await query(`
            SELECT *
            FROM "Message" AS M
            INNER JOIN ticket AS T ON M."ticketId" = T."id"
            WHERE T."id"=${messageId}
        `)
        return result.rows
    }

    /**
     * @param message {Message}
     * @returns {Promise<void>}
     */
    static async add({ticketId, senderId, text}) {
        await query(`
            INSERT INTO public."Message"
                ("ticketId", "senderId", "text")
                VALUES ($1,$2, $3)
                RETURNING "Message"."id" AS id
            `, [ticketId, senderId, text])
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