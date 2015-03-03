var servico = require('./servico'),
	http = require('http'),
	app = servico();

http.createServer(app).listen(app.get('porta'), function () {
	console.log('Aplicação escutando na porta', app.get('porta'));
});