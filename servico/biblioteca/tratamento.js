module.exports = {
  tratarErro: tratarErro,
  json: json
};

function tratarErro(sucessoCallback, erroCallback) {
  return function (erro, objeto) {
    if (erro) {
      return erroCallback(erro);
    }

    if (!objeto) {
      return erroCallback(Error("Objeto não encontrado"));
    }

    sucessoCallback(objeto);
  }
}

function json(response) {
  return function (data) {
    response.json(data);
  }
}