var router = require('express').Router();
var templates = require('./template/templateControlador');
var autenticacao = require('./usuario/autenticacao.controlador');
var usuario = require('./usuario/usuario.controlador');
var aluno = require('./aluno/aluno.controlador');
var cidade = require('./localizacao/localizacao.controlador');
var expressJwt = require('express-jwt');
var autenticacaoServico = require('./usuario/autenticacao.servico')

/*
  configuração é um objeto com valos definidos no arquivo servico/configuracao/padrao
 */
module.exports = function (configuracao) {
  autenticacaoServico(configuracao).inserirUsuarioPadrao();

  var restrito = expressJwt({secret: configuracao.SECRET});
  router.use(templates());
  router.use('/api/autenticacao', autenticacao(configuracao));
  router.use('/api/alunos', restrito, aluno());
  router.use('/api/usuarios', restrito, usuario());
  router.use('/api/cidades', restrito, cidade());
  return router;
};