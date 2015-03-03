(function () {
  angular.module("amks", ['ui.router', 'restangular', 'aluno'])
    .run(congiruarApp)
    .factory('authInterceptor', Interceptador)
    .config(adicionarInterceptador);

  congiruarApp.$inject = ['Restangular'];

  function congiruarApp(restangular) {
    restangular.setBaseUrl('/api');
    restangular.setRestangularFields({
      id: '_id'
    });
  }

  Interceptador.$inject = ["$q", "$window", "$rootScope"];

  function Interceptador($q, $window, $rootScope) {
    return {
      request: function (config) {
        config.headers = config.headers || {};

        if ($window.localStorage.token) {
          config.headers['Authorization'] = 'Bearer '+$window.localStorage.token;
        }
        return config;
      },
      responseError: function (response) {
        if (response.status === 401) {
          console.log("Usuário não autenticado.");
          toastr.error('Usuário não autenticado.');
          $rootScope.$emit("usuario:naoAutorizado");
        } else {
          toastr.warning(response.data.mensagem);
        }

        return $q.reject(response.data.mensagem);
      }
    };
  }


  adicionarInterceptador.$inject = ["$httpProvider"];

  function adicionarInterceptador($httpProvider) {
    $httpProvider.interceptors.push("authInterceptor");
  }
})();