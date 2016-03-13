'use strict';

/**
 * @ngdoc service
 * @name chainApp.promise
 * @description
 * # promise
 * Service in the chainApp.
 */
angular.module('chainApp')
  .service('UserService', function ($http) {
    var host = 'http://localhost:8080';

    return {
          changePassword: function(user) {
              return $http.post(host + '/password', user).then(function (response) {
                  return response;
              });
          }
        }
  });
