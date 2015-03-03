var configuracaoPadrao = require('./configuracao/padrao'),
	api = require('./api/rotas'),
	aplicacao = require('./biblioteca/aplicacao'),
	bancoDados = require('./biblioteca/conexaoMongo');

module.exports = function () {
	bancoDados(configuracaoPadrao);
	var app = aplicacao(configuracaoPadrao, api);	
	return app;
};

