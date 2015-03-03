(function () {
  angular.module('amks')
    .controller('MenuControlador', Controlador);

  Controlador.$inject = ['aplicacaoServico', '$state'];

  function Controlador(aplicacaoServico, $state) {
    this.usuario = aplicacaoServico.retornarUsuarioLogado();
    this.sair = sair;
    console.log(this.usuario);

    function sair() {
      window.localStorage.token = '';
      aplicacaoServico.sair();
      $state.go('login');
    }
  }

})();