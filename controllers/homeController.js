const path = require("path");

// metodo para renderizar la vista con path y dirname
const render = (file, res) => {

  return res.sendFile(path.join(__dirname + `/../views/${file}.html`));
};
// clase controlador con sus metodos async
class HomeController {
  async index(req, res) {
    return render("home", res);
  }
  async inicioJuego(req, res) {
    return render("inicioJuego", res);
  }

  async finJuego(req, res) {
    return render("finJuego", res);
  }

  async historialJuego(req, res) {
    return render("historialJuego", res);
  }
}

module.exports = new HomeController();
