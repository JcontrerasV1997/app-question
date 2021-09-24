const router = require("express").Router();
const { HomeController } = require("../controllers");
router.get('/',HomeController.index);
router.get('/inicioJuego',HomeController.inicioJuego);
router.get('/finJuego',HomeController.finJuego);
router.get('/historial',HomeController.historialJuego);

module.exports = router;
