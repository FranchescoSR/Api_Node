import { pool } from "../../db/db.js";

export const getAll = async (req, res) => {

    try {
        const [rows] = await pool.query('SELECT * FROM usuario');
        res.status(200).json({
            data: rows,
            success: true,
            status: 200
        });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({
            message: 'Error al obtener los usuarios',
            success: false,
            status: 500
        });
    }

};

export const getShow = async (req, res) => {

    try {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE idUsuario = ?', [req.params.id]);

        if (rows.length === 0) {
            return res.json({
                message: 'Usuario no encontrado',
                success: false,
                status: 200
            });
        }

        const user = rows[0];

        const responseJSON = {
            data: {
                "id_Usuario": user.idUsuario,
                "Nombre": user.Nombre,
                "Email": user.Email,
                "Avatar": user.Avatar,
                "id_Empresa": user.idEmpresa,
                "Color": user.Color,
            },
            success: true,
            status: 200
        };

        res.status(200).json(responseJSON);

    } catch (error) {

        console.error('Error al obtener el usuario:', error);
        res.status(500).json({
            message: 'Error al obtener el usuario',
            success: false,
            status: 500
        });

    }

};