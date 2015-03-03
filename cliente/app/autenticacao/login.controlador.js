(function () {
  angular.module('amks')
    .controller('Autenticacao', Controlador);

  Controlador.$inject = ['$state', 'autenticacaoServico', 'aplicacaoServico'];

  function Controlador($state, autenticacaoServico) {
    var self = this;

    this.autenticar = function () {
      autenticacaoServico.autenticar(self.dados)
        .then(function () {
          $state.go('principal');
        });
    }
  }
})();