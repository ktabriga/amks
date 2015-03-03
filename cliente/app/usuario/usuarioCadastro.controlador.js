(function () {
  angular.module('amks')
    .controller('UsuarioControlador', controlador);

  controlador.$inject = ['Restangular', '$stateParams', '$state'];

  function controlador(restangular, $stateParams, $state) {
    var self = this;
    this.salvarUsuarioForm = salvarUsuarioForm;
    this.cancelar = cancelar;
    this.usuario = {};

    buscarAlunos();

    function salvarUsuarioForm() {
      var professor = _.findWhere(self.alunos, {_id: self.usuario.professor});
      if (professor) {
        self.usuario.nome = professor.nome;
      }

      salvar(self.usuario);
    }

    function cancelar() {
      self.usuario = {};
      $state.go('principal.usuarios');
    }

    if ($stateParams.id) {
      buscarUsuario($stateParams.id)
        .then(function (usuario) {
          self.usuario = usuario;
        });
    }

    function buscarUsuario(id) {
      return restangular.one('usuarios', id)
        .get();
    }

    function validarUsuario(usuario) {
      if (usuario.senha !== usuario.senha2) {
        throw Error('Senhas devem ser iguais');
      }
    }

    function buscarAlunos() {
      restangular.all('alunos')
        .getList()
        .then(function (alunos) {
          self.alunos = alunos;
        })
    }

    function salvar(usuario) {
      try {
        validarUsuario(usuario);
        if (usuario._id) {
          return usuario.save()
            .then(usuarioSalvoSucesso)
        }
        return restangular.all('usuarios')
          .post(usuario)
          .then(usuarioSalvoSucesso);
      } catch (e) {
        toastr.warning(e.message);
      }

    }

    function usuarioSalvoSucesso() {
      toastr.success('Usuário salvo com sucesso.');
      $state.go('principal.usuarios');
    }

  }
})();