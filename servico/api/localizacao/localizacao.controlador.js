var cidadesRepositorio = require('./cidadesPR.json');
var router = require('express').Router();

module.exports = controlador;

function controlador() {
  router.get('/', listar);

  return router;

  function listar(req, res) {
    res.json(cidadesRepositorio.cidades);
  }
}