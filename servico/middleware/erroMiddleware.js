module.exports = function () {



  function tratar(erro) {
    var tratadores = {

      ValidationError: {
        executar : function (erro) {
          var erros = Object.keys(erro.errors)
            .map(function (campo) {
              return erro.errors[campo].message;
            });
          return erros.join(', ');
        }
      }

    };

    var tratadorErro = tratadores[erro.name];

    if (!tratadorErro) {
      return erro.message;
    }

    return tratadorErro.executar(erro);
  }

  function tratarErro(erro, req, res, next) {
    console.log(erro.stack);
    console.log(erro.message);
    console.log(erro);

    res.status(erro.status || 400)
      .json({
        mensagem: tratar(erro)
      });
  }

  return tratarErro;

};
