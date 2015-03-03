(function () {
  angular.module('amks')
    .controller('UsuarioListaControlador', controlador);

  controlador.$inject = ['Restangular'];

  function controlador(restangular) {
    var self = this;
    this.buscar = buscar;
    this.remover = remover;

    buscar();

    function buscar() {
      restangular.all('usuarios')
        .getList(self.pesquisa)
        .then(function (usuarios) {
          self.usuarios = usuarios;
        });
    }

    function remover(id) {
      bootbox.dialog({
        title: "Remover Usuário",
        message: "Tem certeza que deseja remover esse usuário?",
        buttons: {
          success: {
            label: "Confirmar",
            className: "btn-success",
            callback: function () {
              restangular.one('usuarios', id)
                .remove()
                .then(buscar);
            }
          },
          danger: {
            label: "Cancelar",
            className: "btn-default"
          }
        }
      });
    }
  }
})();