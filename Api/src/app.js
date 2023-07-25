import express from "express";
import { Server } from "socket.io";
import http from "http"; 

import employees from './routes/usuarios.routes.js'
import authentication from './routes/authentication.routes.js'
import proyectos from './routes/proyectos.routes.js'
import { mensajes } from './routes/mensajes.routes.js';

const app = express();
const server = http.createServer(app); // Crear el servidor HTTP utilizando Express app
const io = new Server(server); // Adjuntar socket.io al servidor HTTP

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/proteo', employees);
app.use('/proteo', proyectos);
app.use('/proteo', authentication);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Ruta no encontrada',
        success: false,
        status: 404
    })
})

// Inicio del servidor en el puerto 3000
server.listen(3000, () => {
    console.log('API ejecutandose en el puerto 3000');
});

mensajes(io, '/proteo/mensajes'); 