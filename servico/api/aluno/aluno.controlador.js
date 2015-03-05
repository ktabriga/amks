var alunoRepositorio = require('./aluno.repositorio');
var tratamento = require('../../biblioteca/tratamento');
var router = require('express').Router();
var moment = require('moment');

module.exports = function () {
  router.route("/")
    .get(buscar)
    .post(criar);

  router.route('/:id')
    .get(buscarUm)
    .put(atualizar)
    .delete(remover);

  return router;

  function criar(req, res, next) {
    alunoRepositorio.criar(montarAluno(req.body))
      .then(function (aluno) {
        res.status(201)
          .json(aluno);
      }).catch(next);
  }

  function atualizar(req, res, next) {
    var id = req.params.id;
    var dadosAluno = req.body;
    dadosAluno.professor = definirProfessor(req.user, dadosAluno);

    alunoRepositorio.atualizar(id, montarAluno(dadosAluno))
      .then(function () {
        console.log('sucessosss');
        res.end();
      })
      .catch(next);
  }

  function montarFiltro(obj) {
    var filtro = {};

    for(var key in obj) {
      if(obj.hasOwnProperty(key) && obj[key]) {
        filtro[key] = obj[key];
      }
    }
    return filtro;
  }

  function definirProfessor(usuario, aluno) {
    if (usuario.privilegio == 'PROFESSOR') {
      return usuario._id;
    }

    return aluno.professor;
  }

  function buscar(req, res, next) {
    var filtro = req.query;
    var usuario = req.user;

    if (usuario.privilegio == 'PROFESSOR')
      filtro.professor = usuario._id;

    alunoRepositorio.buscar(montarFiltro(filtro))
      .then(tratamento.json(res))
      .catch(next);
  }

  function buscarUm(req, res, next) {
    var id = req.params.id;

    alunoRepositorio.buscarUm(id)
      .then(function (aluno) {
        res.json(aluno);
      })
      .catch(next);
  }

  function remover(req, res, next) {
    var id = req.params.id;
    alunoRepositorio.remover(id)
      .then(function () {
        res.end();
      })
      .catch(next)
  }

  function montarAluno(dadosAluno) {
    dadosAluno.nascimentoLiteral = moment(dadosAluno.nascimento).format('DD/MM/YYYY');
    return dadosAluno;
  }

};