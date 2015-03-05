(function (ng) {
  ng.module('aluno')
    .controller('AlunoListaControlador', Controlador);

  Controlador.$inject = ['Restangular', '$location', '$window'];

  function Controlador(restangular, $location, $window) {
    var self = this;
    this.pequisar = pequisar;
    this.remover = remover;
    this.limpar = limpar;
    deserializarPesquisa();
    buscar();
    buscarProfessores();

    function buscar() {
      self.pesquisa = $location.search();
      serializarPesquisa();
      restangular.all('alunos')
        .getList($location.search())
        .then(function (alunos) {
          $location.search(self.pesquisa)
          self.alunos = alunos
        });
    }

    function pequisar() {
      $location.search(self.pesquisa);
      buscar();
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

    function limpar() {
      var novaPequisa = {sexo: ''};
      this.pesquisa = novaPequisa;
      $location.search(novaPequisa);
    }

    function serializarPesquisa() {
      $window.localStorage.pesquisa = JSON.stringify(self.pesquisa);
    }

    function deserializarPesquisa() {
      var pesquisaSerializada = $window.localStorage.pesquisa;
      var pesquisa = JSON.parse(pesquisaSerializada || "{\"sexo\": \"\"}");
      $location.search(pesquisa);
      this.pesquisa = pesquisa;
    }

  }


})(angular);