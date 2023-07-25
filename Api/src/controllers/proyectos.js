import { pool } from "../../db/db.js";

export const getAll = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM proyectos');
        const proyectos = rows;

        const response = await Promise.all(
            proyectos.map(async (proyecto) => {
                const [rows_tag] = await pool.query('SELECT idTag AS id_Tag, Nombre FROM tag WHERE idProyectos = ?', [proyecto.idProyectos]);
                const [rows_colaboradores] = await pool.query('SELECT B.idUsuario AS id_Usuario, B.Nombre, B.Email FROM colaboradores A INNER JOIN usuario B ON A.idUsuario = B.idUsuario WHERE idProyectos = ?', [proyecto.idProyectos]);
                const [rows_tickets] = await pool.query('SELECT A.idTicket,A.Titulo,A.Descripcion,A.Dia,A.Hora,A.Estado FROM tickets A INNER JOIN usuario B ON A.idUsuario = B.idUsuario WHERE A.idProyectos = ?', [proyecto.idProyectos]);
                return {
                    "id_Proyectos": proyecto.idProyectos,
                    "Nombre": proyecto.Nombre ,
                    "Descripcion": proyecto.Descripcion ,
                    "Fecha_Inicio": proyecto.FechaInicio,
                    "Fecha_Fin": proyecto.FechaFin,
                    "Estado": proyecto.Estado,
                    "Tag": rows_tag,
                    "Colaboradores": rows_colaboradores,
                    "Tickets": rows_tickets
                };
            })
        );

        const responseJSON = {
            data: response,
            success: true,
            status: 200
        };

        res.status(200).json(responseJSON);
    } catch (error) {
        console.error('Error al obtener los proyectos:', error);
        res.status(500).json({
            message: 'Error al obtener los proyectos',
            success: false,
            status: 500
        });
    }
};

export const getShow = async (req, res) => {

    try {
        const [rows] = await pool.query('SELECT * FROM proyectos WHERE idProyectos = ?', [req.params.id]);

        if (rows.length === 0) {
            return res.json({
                message: 'Proyecto no encontrado',
                success: false,
                status: 200
            });
        }

        const proyecto = rows[0];

        const [rows_tag] = await pool.query('SELECT idTag AS id_Tag, Nombre FROM tag WHERE idProyectos = ?', [proyecto.idProyectos]);
        const [rows_colaboradores] = await pool.query('SELECT B.idUsuario AS id_Usuario, B.Nombre, B.Email FROM colaboradores A INNER JOIN usuario B ON A.idUsuario = B.idUsuario WHERE idProyectos = ?', [proyecto.idProyectos]);
        const [rows_tickets] = await pool.query('SELECT A.idTicket,A.Titulo,A.Descripcion,A.Dia,A.Hora,A.Estado FROM tickets A INNER JOIN usuario B ON A.idUsuario = B.idUsuario WHERE A.idProyectos = ?', [proyecto.idProyectos]);

        const responseJSON = {
            data: {
                "id_Proyectos": proyecto.idProyectos,
                "Nombre": proyecto.Nombre,
                "Descripcion": proyecto.Descripcion,
                "Fecha_Inicio": proyecto.FechaInicio,
                "Fecha_Fin": proyecto.FechaFin,
                "Estado": proyecto.Estado,
                "Tag": rows_tag,
                "Colaboradores": rows_colaboradores,
                "Tickets": rows_tickets
            },
            success: true,
            status: 200
        };

        res.status(200).json(responseJSON);

    } catch (error) {

        console.error('Error al obtener el Proyecto:', error);
        res.status(500).json({
            message: 'Error al obtener el Proyecto',
            success: false,
            status: 500
        });
    }

};
