var mongoose = require('mongoose');
var Q = require("q");
var tratamento = require('./../../biblioteca/tratamento');
var Schema = mongoose.Schema;
var _ = require('underscore');

var AlunoSchema = Schema({
  nome: {
    type: String,
    required: 'Nome é obrigatório',
    trim: true
  },
  nascimento: {
    type: Date,
    required: 'Data de nascimento é obrigatório'
  },
  nascimentoLiteral: String,
  telefone: {
    type: String,
    required: 'Telefone é obrigatório'
  },
  celular: String,
  email: String,
  rg: {
    type: String,
    required: 'Rg é obrigatório'
  },
  local: String,
  cpf: String,
  endereco: String,
  bairro: String,
  cidade: String,
  cep: String,
  graduacao: String,
  dataUltimoExame: Date,
  ativo: Boolean,
  peso: Number,
  altura: Number,
  professor: String,
  nomeProfessor: String,
  sexo: String
});

var Aluno = mongoose.model('Aluno', AlunoSchema);

module.exports = {
  criar: criar,
  atualizar: atualizar,
  buscar: buscar,
  buscarUm: buscarUm,
  remover: remover
};

function criar(aluno) {
  var q = Q.defer();
  var novoAluno = new Aluno(aluno);
  novoAluno.save(tratamento.tratarErro(q.resolve, q.reject));
  return q.promise;
}

function atualizar(id, aluno) {
  var q = Q.defer();

  buscarUm(id)
    .then(function (alunoEncontrado) {
      var alunoAtualizado = _.extend(alunoEncontrado, aluno);
      return alunoAtualizado.save(tratamento.tratarErro(q.resolve, q.reject));
    }).catch(q.reject);

  return q.promise;
}

function buscar(filtro) {
  var q = Q.defer();

  filtro.nome = new RegExp(filtro.nome, 'i');

  if (filtro.nascimentoLiteral)
    filtro.nascimentoLiteral = new RegExp(filtro.nascimentoLiteral.replace('/', '\/'));

  console.log('consulta', filtro);

  Aluno.find(filtro, tratamento.tratarErro(q.resolve, q.reject));
  return q.promise;
}

function buscarUm(id) {
  var q = Q.defer();
  Aluno.findOne({_id: id}, tratamento.tratarErro(q.resolve, q.reject));
  return q.promise;
}

function remover(id) {
  var q = Q.defer();
  Aluno.remove({_id: id}, tratamento.tratarErro(q.resolve, q.reject));
  return q.promise;
}