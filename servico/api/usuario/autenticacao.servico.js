var jwt = require('jsonwebtoken');
var usuarioRepositorio = require('./usuario.repositorio');
var Q = require('q');

module.exports = servico;

function servico(configuracao) {

  return {
    autenticar: autenticar,
    inserirUsuarioPadrao: inserirUsuarioPadrao
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
        q.resolve({
          token: gerarToken(usuario),
          usuario: usuario
        });
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


  function inserirUsuarioPadrao() {
    var usuario = {
      usuario: "ADMIN",
      senha: "Rt123Xzy",
      privilegio: "ADMINISTRADOR",
      nome: "ADMINISTRADOR-SISTEMA",
      professor: "0"
    };

    return usuarioRepositorio.buscarPorUsuario(usuario.usuario)
      .then(function () {
        console.log("Usuario Padrão Existente")
      }).catch(function () {
        console.log("Usuario Padrão Criado");
        return usuarioRepositorio.salvar(usuario);
      }).catch(function (erro) {
        console.log(erro);
      });
  }
}
