var router = require("express").Router();
var autenticacaoServico = require("./autenticacao.servico");

module.exports = contolador;

function contolador(configuracao) {
  router.post('/', autenticao);

  return router;

  function autenticao(req, res, next) {
    autenticacaoServico(configuracao)
      .autenticar(req.body)
      .then(function (token) {
        res.json(token)
      }).catch(next);
  }

}