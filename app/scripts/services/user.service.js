'use strict';

/**
 * @ngdoc service
 * @name chainApp.promise
 * @description
 * # promise
 * Service in the chainApp.
 */
angular.module('chainApp')
  .service('UserService', function ($http, ENV) {
    var host = ENV.host;

    return {
          changePassword: function(user) {
              return $http.post(host + '/password', user).then(function (response) {
                  return response;
              });
          }
        };
  });
