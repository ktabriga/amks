(function () {
  angular.module('amks')
    .run(adicioarEvento)
    .service('aplicacaoServico', Servico);

  adicioarEvento.$inject = ['$rootScope', '$state'];

  function adicioarEvento($rootScope, $state) {
    $rootScope.$on('usuario:naoAutorizado', function () {
      $state.go('login');
    });
  }

  Servico.$inject = ['$window'];

  function Servico($window) {

    return {
      definirUsuario: definirUsuario,
      retornarUsuarioLogado: retornarUsuarioLogado,
      sair: sair
    };

    function definirUsuario(usuario) {
      $window.localStorage.usuario = JSON.stringify(usuario);
    }

    function sair() {
      $window.localStorage.usuario = '';
    }

    function retornarUsuarioLogado() {
      return JSON.parse($window.localStorage.usuario);
    }
  }

})();