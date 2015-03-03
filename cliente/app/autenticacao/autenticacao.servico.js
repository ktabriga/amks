(function () {
  angular.module('amks')
    .service('autenticacaoServico', Servico);

  Servico.$inject = ['$window', 'Restangular', 'aplicacaoServico'];

  function Servico($window, restangular, aplicacaoServico) {

    return {
      autenticar: autenticar
    };

    function autenticar(usuario) {
      return restangular.all('autenticacao')
        .post(usuario)
        .then(function (resultado) {
          $window.localStorage.token = resultado.token;
          aplicacaoServico.definirUsuario(resultado.usuario);
        });
    }

  }

})();