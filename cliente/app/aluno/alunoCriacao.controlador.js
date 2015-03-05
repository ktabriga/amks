(function (ng) {
  ng.module('aluno')
    .controller('AlunoCriacaoControlador', Controlador);

  Controlador.$inject = ['Restangular', '$state', '$stateParams', 'aplicacaoServico'];

  function Controlador(restangular, $state, $stateParams, aplicacaoServico) {
    var self = this;
    this.salvar = salvar;
    this.cancelar = cancelar;
    this.aluno = {};

    buscarProfessores()
      .then(buscarCidades)
      .then(function () {
        buscarAluno($stateParams.id);
      }).then(definirPrivilegio);

    function definirPrivilegio() {
      var usuario = aplicacaoServico.retornarUsuarioLogado();
      self.possuiPrivilegio = usuario.privilegio === "ADMINISTRADOR";

      if ($stateParams.id) {
        return;
      }
      self.aluno.professor = usuario._id;

    }

    function buscarAluno(id) {
      if (!id) {
        return;
      }

      restangular.one('alunos', id)
        .get()
        .then(function (aluno) {
          console.log(aluno);
          self.aluno = aluno;
          self.aluno.nascimento = new Date(self.aluno.nascimento );
          self.aluno.dataUltimoExame = new Date(self.aluno.dataUltimoExame );
        });
    }

    function buscarCidades() {
      return restangular.all('cidades')
        .getList()
        .then(function (cidades) {
          self.cidades = cidades;
        });
    }

    function buscarNomeProfessor(id) {
      var professor = self.professores
        .filter(function (professor) {
          return professor._id == id;
        })[0];

      if (professor) {
        return professor.nome;
      }
      return '';
    }

    function salvar() {
      self.aluno.nomeProfessor = buscarNomeProfessor(self.aluno.professor);

      if (self.aluno._id) {
        atualizar();
      } else {
        criar();
      }
    }

    function buscarProfessores() {
      return restangular.all('usuarios')
        .getList()
        .then(function (usuarios) {
          self.professores = usuarios;
        });
    }

    function atualizar() {
     self.aluno.save()
       .then(alunoSalvoSucesso);
    }

    function criar() {
      restangular.all('alunos')
        .post(self.aluno)
        .then(alunoSalvoSucesso);
    }

    function alunoSalvoSucesso() {
      toastr.success('Aluno salvo com sucessao');
      $state.go('principal.alunos');
    }

    function cancelar() {
      self.aluno = {};
      $state.go('principal.alunos');
    }



  }
})(angular);