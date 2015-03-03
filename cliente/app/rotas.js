(function () {
  angular.module('amks')
    .config(rotas);

  rotas.$inject = ['$stateProvider', '$urlRouterProvider'];
  function rotas($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
      url: '/login',
      views: {
        master: {
          templateUrl: 'templates/login',
          controller: 'Autenticacao as vm'
        }
      }
    }).state('principal', {
      url: '/principal',
      views: {
        'master@': {
          templateUrl: 'templates/principal',
          controller: 'MenuControlador as vm'
        },
        'conteudo@principal': {
          templateUrl: 'templates/principal-logo'
        }
      }
    }).state('principal.alunos', {
      url: '/alunos',
      views: {
        conteudo: {
          templateUrl: 'templates/alunos',
          controller: 'AlunoListaControlador as vm'
        }
      }
    }).state('principal.alunosCadastro', {
      url: '/alunos-cadastro/:id',
      views: {
        conteudo: {
          templateUrl: 'templates/aluno-cadastro',
          controller: 'AlunoCriacaoControlador as vm'
        }
      }
    }).state('principal.usuarios', {
      url: '/usuarios',
      views: {
        conteudo: {
          templateUrl: 'templates/usuarios',
          controller: 'UsuarioListaControlador as vm'
        }
      }
    }).state('principal.usuarioCadastro', {
      url: '/usuario-cadastro/:id',
      views: {
        conteudo: {
          templateUrl: 'templates/usuario-cadastro',
          controller: 'UsuarioControlador as vm'
        }
      }
    });

    $urlRouterProvider.otherwise('login');
  }
})();