var jwt = require('jsonwebtoken');
var usuarioRepositorio = require('./../autenticacao/usuario.repositorio.js');
var Q = require('Q');

module.exports = servico;

function servico(configuracao) {

  return {
    autenticar: autenticar,
    salvarUsuario: salvarUsuario,
    listarUsuarios: listarUsuarios
  };

  function autenticar(dados) {
    var q = Q.defer();
    var mensagem = "usuário ou senha inválidos";

    usuarioRepositorio.buscarPorUsuario(dados.usuario)
      .then(function (usuarioEncontrado) {
        if (!validar(usuarioEncontrado)) {
          return q.reject(Error(mensagem));
        }

        var usuario = usuarioEncontrado.toObject();
        delete usuario.senha;
        q.resolve(gerarToken(usuario));
      }).catch(function (erro) {
        console.log(erro);
        q.reject(Error(mensagem));
      });

    return q.promise;

    function gerarToken(usuario) {
      return jwt.sign(usuario, configuracao.SECRET, {expireInMinutes: 60 * 5});
    }

    function validar(usuario) {
      return dados.senha === usuario.senha;
    }
  }

  function salvarUsuario(dadosUsuario) {
    var q = Q.defer();

    usuarioRepositorio.buscarPorUsuario(dadosUsuario.usuario)
      .then(function () {
        q.reject(Error('Já existe usuário com este nome'));
      }).catch(function () {
        usuarioRepositorio.salvar(dadosUsuario)
          .then(q.resolve)
          .catch(q.reject);
      });

    return q.promise;
  }

  function listarUsuarios() {
    return usuarioRepositorio.listar();
  }

}
