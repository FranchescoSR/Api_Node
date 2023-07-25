import { pool } from "../../db/db.js";
import crypto from 'crypto';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Consultar la base de datos para verificar si el usuario existe
        const [rows] = await pool.query('SELECT Token FROM usuario WHERE Email = ? AND Contrasena = ?', [email, password]);

        const user = rows[0];

        if (user.Token === null) {
            // Usuario no encontrado o el campo Token es NULL, generar un nuevo token único de 16 bits
            const newToken = generateUniqueToken(16);

            try {
                // Si el usuario existe pero el campo Token es NULL, actualizar el token en la base de datos
                await pool.query('UPDATE usuario SET Token = ? , SesionEstado = 1 WHERE Email = ? AND Contrasena = ?', [newToken, email, password]);

                const responseJSON = {
                    data: {
                        "Token": newToken,
                    },
                    success: true,
                    status: 200
                };

                return res.status(200).json(responseJSON);

            } catch (error) {
                console.error('Error al actualizar el token en la base de datos:', error);
                return res.status(500).json({
                    message: 'Error al actualizar el token en la base de datos',
                    success: false,
                    status: 500
                });
            }
        }

        const responseJSON = {
            data: {
                "Token": user.Token,
            },
            success: true,
            status: 200
        };

        res.status(200).json(responseJSON);

    } catch (error) {
        console.error('Error en la autentificacion:', error);
        res.status(500).json({
            message: 'Error en la autentificacion',
            success: false,
            status: 500
        });
    }
};

export const logout = async (req, res) => {
}

function generateUniqueToken(length) {
    return crypto.randomBytes(length).toString('hex');
}

