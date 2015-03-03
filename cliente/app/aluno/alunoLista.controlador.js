(function (ng) {
  ng.module('aluno')
    .controller('AlunoListaControlador', Controlador);

  Controlador.$inject = ['Restangular'];

  function Controlador(restangular) {
    var self = this;
    this.buscar = buscar;
    this.remover = remover;
    this.pesquisa = {
      sexo: ''
    };

    buscar();
    buscarProfessores();

    function buscar() {
        restangular.all('alunos')
          .getList(self.pesquisa)
          .then(function (alunos) {
            self.alunos = alunos
          });
    }

    function buscarProfessores() {
      return restangular.all('usuarios')
        .getList()
        .then(function (usuarios) {
          self.professores = usuarios;
        });
    }

    function remover(id) {
      bootbox.dialog({
        title: "Remover Aluno",
        message: "Tem certeza que deseja remover esse aluno?",
        buttons: {
          success: {
            label: "Confirmar",
            className: "btn-success",
            callback: function () {
              restangular.one('alunos', id)
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

})(angular);