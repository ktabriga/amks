var mongoose = require('mongoose');

module.exports = function (configuracao) {
	mongoose.connect(configuracao.mongodb.uri);

	var db = mongoose.connection;

	db.once('open', function () {
		console.log('Conexão aberta');
	});

	db.on('error', function (erro) {
		console.log('Erro de conexão', erro);
	});
};