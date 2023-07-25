import { getAll, getShow } from "../controllers/mensajes.js";

export const mensajes = (io, namespace) => {
  const mensajesNamespace = io.of(namespace);

  mensajesNamespace.on('connection', (socket) => {
    console.log("Nuevo cliente conectado");

    socket.on('disconnect', () => {
      console.log("Cliente desconectado");
    });

    socket.on("getAll", async () => {
      try {
        const messages = await getAll();
        socket.emit("getAll", messages);
      } catch (error) {
        console.error("Error al obtener los mensajes:", error);
      }
    });

    socket.on("getShow", async (id) => {
      try {
        const message = await getShow(id);
        socket.emit("getShow", message);
      } catch (error) {
        console.error("Error al obtener el mensaje:", error);
      }
    });

  });
};