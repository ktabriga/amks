var servico = require('./servico'),
	http = require('http'),
	app = servico();

var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port    = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8080;

http.createServer(app).listen(port, ipaddr, function () {
	console.log('Aplicação escutando na porta', app.get('porta'));
});