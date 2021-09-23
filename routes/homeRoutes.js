const router = require("express").Router();
const { HomeController } = require("../controllers");
router.get('/',HomeController.index);
router.get('/inicioJuego',HomeController.inicioJuego);

module.exports = router;
