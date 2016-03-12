'use strict';

/**
 * @ngdoc service
 * @name chainApp.auth
 * @description
 * # auth
 * Service in the chainApp.
 */
angular.module('chainApp')
  .service('AuthService', function ($q, $http) {
    var API_ENDPOINT = "http:localhost:8080"
    var LOCAL_TOKEN_KEY = 'ya';
    var isAuthenticated = false;
    var authToken;

    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }

    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }

    function useCredentials(token) {
      isAuthenticated = true;
      authToken = token;

      $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common.Authorization = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    loadUserCredentials();

    return {
      login: function (user) {
        return $http.post('http://localhost:8080/auth', user).then(function(result) {
          if (result.data.success) {
            storeUserCredentials(result.data.token);
          }
          return result;
        })
      },
      register: function(user) {
        return $http.post('http://localhost:8080/signup', user).then(function(result) {
          return result;
        });
      },
      logout: function() {
        destroyUserCredentials();
      },
      isAuthenticated: function() {return isAuthenticated;},
    };
  })

  .factory('AuthInterceptor', function ($rootScope, $q) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: "Not auth",
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
