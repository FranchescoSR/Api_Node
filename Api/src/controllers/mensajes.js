import { pool } from "../../db/db.js";

export const getAll = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM mensajes');
        const response = {
            data: rows,
            success: true,
            status: 200
        };
        return response
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);

        const response = {
            message: 'Error al obtener los mensajes',
            success: false,
            status: 500
        };

        return response
    }
};


export const getShow = async (id) => {
    try {
        const [rows] = await pool.query('SELECT * FROM mensajes WHERE idTicket = ?', [id]);
        const response = {
            data: rows,
            success: true,
            status: 200,
        };
        return response;
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);

        const response = {
            message: 'Error al obtener los mensajes',
            success: false,
            status: 500
        };

        return response
    }
};


