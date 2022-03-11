const query = require('../../../db')

class Message {
    id;
    ticketId;
    senderUsername;
    text;

    constructor() {
        throw new Error('This is class not instantiatable. Please use static methods.')
    }

    static async init() {
        await query(
            `
            CREATE TABLE IF NOT EXISTS public.messages
            (
                id serial NOT NULL,
                ticket_id character varying NOT NULL,
                sender_username character varying NOT NULL,
                text character varying NOT NULL,
                
                PRIMARY KEY (id),
                FOREIGN KEY(sender_username) REFERENCES public.users (username) ON DELETE CASCADE,
                FOREIGN KEY(ticket_id) REFERENCES public.tickets (id) ON DELETE CASCADE
            );
            `
        )
        console.log("Messages table created!")
    }


    /**
     * @param id {number}
     * @returns {Promise<Message>}
     */
    static async get(id) {
        const result = await query(`
            SELECT *
            FROM public.messages
            WHERE id = $1
        `, [id])
        return result.rows[0]
    }


    /**
     * @param ticketId {number}
     * @returns {Promise<*>}
     */
    static async getAll(ticketId) {
        const result = await query(`
            SELECT *
            FROM pubic.messages AS message
            INNER JOIN ticket AS ticket ON message.ticket_id = ticket.id
            WHERE ticket.id = $1
        `, [ticketId])
        return result.rows
    }

    /**
     * @param message {Message}
     * @returns {Promise<void>}
     */
    static async add({ticketId, senderUsername, text}) {
        await query(`
            INSERT INTO public.messages
                (ticket_id, sender_username, text)
                VALUES ($1,$2, $3)
            `, [ticketId, senderUsername, text])
    }


    /**
     * @param message {Message}
     * @returns {Promise<void>}
     */
    static async update({ticketId, senderUsername, text, id}) {
        await query(`
            UPDATE public.messages
            SET ticket_id = $1,
                sender_username = $2,
                text = $3
            WHERE id = $4
            `, [ticketId, senderUsername, text, id])
    }


    /**
     * @param id {number}
     * @returns {Promise<void>}
     */

    static async remove(id) {
        await query(`DELETE FROM "Message" id = $1`, [id])
    }

}

module.exports = Message;