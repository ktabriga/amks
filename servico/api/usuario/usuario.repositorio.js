var mongoose = require('mongoose');
var Q = require("q");
var tratamento = require('./../../biblioteca/tratamento');
var Schema = mongoose.Schema;

var UsuarioSchema = mongoose.Schema({
  usuario: {
    type: String,
    required: "Usuário é obrigatório",
    trim: true,
    unique: true
  },
  senha: {
    type: String,
    required: "Senha é obrigatório"
  },
  privilegio: {
    type: String,
    enum: ['ADMINISTRADOR', 'PROFESSOR'],
    default: 'PROFESSOR'
  },
  professor: {
    type: String,
    required: 'Professor é obrigatório',
    unique: true,
    trim: true
  },
  nome: String
});

module.exports = {
  salvar: salvar,
  atualizar: atualizar,
  buscarPorUsuario: buscarPorUsuario,
  listar: listar,
  remover: remover,
  buscar: buscar
};

var Usuario = mongoose.model('Usuario', UsuarioSchema);

function salvar(usuario) {
  var q = Q.defer();
  var novoUsuario = new Usuario(usuario);
  novoUsuario.save(tratarValorUnico(tratamento.tratarErro(q.resolve, q.reject)));
  return q.promise;
}

function tratarValorUnico(proximo) {
  return function (erro, usuario) {
    if (erro && (erro.code === 11000 || erro.code === 11001) ) {
      var path = '';



      return proximo(Error(path + " já exitente, "+ path +" deve ser unico"));
    }
    proximo(erro, usuario);
  }

}

function atualizaUsuario(novosDados) {
  return function (usuarioSalvo) {
    var q = Q.defer();
    usuarioSalvo.nome = novosDados.nome;
    usuarioSalvo.professor = novosDados.professor;
    usuarioSalvo.usuario = novosDados.usuario;
    if (novosDados.senha) {
      usuarioSalvo.senha = novosDados.senha;
    }
    usuarioSalvo.privilegio = novosDados.privilegio;
    usuarioSalvo.save(tratarValorUnico(tratamento.tratarErro(q.resolve, q.reject)));

    return q.promise;
  }
}

function atualizar(id, usuario) {
  return buscar(id)
    .then(atualizaUsuario(usuario));
}

function buscarPorUsuario(usuario) {
  var q = Q.defer();
  Usuario.findOne({usuario: usuario}, tratamento.tratarErro(q.resolve, q.reject));
  return q.promise;
}

function remover(id) {
  var q = Q.defer();
  Usuario.remove({_id: id}, tratamento.tratarErro(q.resolve, q.reject));
  return q.promise;
}

function listar(filtro) {
  var q = Q.defer();
  filtro.usuario = new RegExp(filtro.usuario, 'i');
  Usuario.find(filtro || {}, tratamento.tratarErro(q.resolve, q.reject));
  return q.promise;
}

function buscar(id) {
  var q = Q.defer();
  Usuario.findOne({_id: id}, {senha: 0}, tratamento.tratarErro(q.resolve, q.reject));
  return q.promise;
}
