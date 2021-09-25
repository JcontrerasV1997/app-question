const express = require("express");
const cors = require("cors");
// const {HomeRoutes} =require("../routes/routeIndex");
const {NotFoundMiddleware} =require("../middlewares");
// Creacion del server junto sus metodos
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.homePath = "/";
    // Middlewares()
    this.routes();
    this.middlewares();
  }
  middlewares() {
    // coors para evitar cualquier bloqueo
    this.app.use(cors());
    // lectura y parseo del body

    this.app.use(express.json());
    // Directorio Publico
    this.app.use(express.static("public"));
    this.app.use(NotFoundMiddleware);
  }
// llamado de rutas
  routes() {
    this.app.use(this.homePath, require("../routes/homeRoutes"));
  }
  // metodo de escucha para el puerto
  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo", this.port);
    });
  }
}

module.exports = Server;