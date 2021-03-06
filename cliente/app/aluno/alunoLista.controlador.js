(function (ng) {
  ng.module('aluno')
    .controller('AlunoListaControlador', Controlador);

  Controlador.$inject = ['Restangular', '$scope', '$location', '$window', '$filter'];

  function Controlador(restangular, $scope, $location, $window, $filter) {
    var self = this;
    var professor;
    this.pequisar = pequisar;
    this.remover = remover;
    this.limpar = limpar;
    this.imprimir = imprimir;
    this.marcarItens = marcarItens;

    deserializarPesquisa();
    buscarAlunos();
    buscarProfessores();

    function buscarAlunos() {
      self.pesquisa = $location.search();
      professor = self.pesquisa.professor;
      serializarPesquisa();
      restangular.all('alunos')
        .getList($location.search())
        .then(function (alunos) {
          $location.search(self.pesquisa)
          self.alunos = alunos
        });
    }

    function marcarItens() {
      self.alunos.forEach(function (aluno) {
        aluno.marcado = self.todos;
      })
    }

    function imprimir() {
      var doc = new jsPDF();
      var linha = 10;
      var nome = prompt("Escolha o nome para o relatório:");

      if(!nome) {
        toastr.warning('Nome do relatório é obrigatório');
        return;
      }

      if (!self.alunos) {
        return;
      }

      var alunosMarcados = self.alunos.filter(function (aluno) {
        return aluno.marcado;
      });

      if (alunosMarcados.length == 0) {
        toastr.warning('Relatório não possui registros');
        return;
      }

      var alunos = _.sortBy(alunosMarcados, function (aluno) {
        return aluno.nome;
      });

      doc.setFontSize(22);
      doc.text(10, linha += 10, nome);
      doc.setFontSize(12);
      alunos.forEach(function (aluno) {
        var documento = aluno.cpf ? ',cpf: '+ aluno.cpf : ', rg: '+ aluno.rg;
        doc.text(10, linha += 10,aluno.nome + documento + ', nascimento: '+ $filter('date')(aluno.nascimento, 'dd/MM/yyyy'));

        if (linha % 280 == 0) {
          doc.addPage();
          linha = 10;
        }
      });

      doc.save(nome);
    }

    function pequisar() {
      $location.search(self.pesquisa);
      buscarAlunos();
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
                .then(buscarAlunos);
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