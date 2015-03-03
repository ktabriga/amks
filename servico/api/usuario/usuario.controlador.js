var router = require("express").Router();
var usuarioRepositorio = require('./usuario.repositorio')

module.exports = controlador;

function controlador() {

  router.route('/')
    .post(verificaAdministrador, criar)
    .get(listar);

  router.route('/:id')
    .put(verificaAdministrador, atualizar)
    .get(verificaAdministrador, buscar)
    .delete(verificaAdministrador, remover);

  return router;
}

function verificaAdministrador(req, res, next) {
  if (req.user.privilegio !== 'ADMINISTRADOR') {
    next(Error('Usuário não possui permissão neste serviço.'))
  }
  next();
}

function criar(req, res, next) {
    usuarioRepositorio.salvar(req.body)
    .then(function (usuario) {
      res.json(usuario)
    }).catch(next);
}

function atualizar(req, res, next) {
  var id = req.params.id;
  usuarioRepositorio.atualizar(id, req.body)
    .then(function () {
      res.end();
    }).catch(next);
}

function listar(req, res, next) {
    usuarioRepositorio.listar(req.query)
    .then(function (usuarios) {
      res.json(usuarios);
    }).catch(next);
}

function buscar(req, res, next) {
  usuarioRepositorio.buscar(req.params.id)
    .then(function (usuario) {
      res.json(usuario);
    }).catch(next);
}

function remover(req, res, next) {
  var usuario = req.user;
  var id = req.params.id;

  if (usuario._id === id) {
    return next(Error("Usuário não pode se excluir"));
  }

  usuarioRepositorio.remover()
    .then(function () {
      res.end();
    }).catch(next);
}