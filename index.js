require('dotenv').config();
const Server = require('./server/Server');
const server = new Server();
server.listen();





// const express= require('express');
// const server = express();
// const {PORT} =require("./config/port");
// const {HomeRoutes} =require("./routes/routeIndex");
// const {NotFoundMiddleware} =require("./middlewares")

// server.use(express.static('./public'));
// server.use(express.json());

// server.use("/", HomeRoutes);
// server.use(NotFoundMiddleware);
// server.listen(PORT, () => {
//     console.log(`APPLICATION RUNNIG ON PORT ${PORT}`);
// });