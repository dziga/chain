'use strict';

/**
 * @ngdoc service
 * @name chainApp.promise
 * @description
 * # promise
 * Service in the chainApp.
 */
angular.module('chainApp')
  .service('PromiseService', function ($http) {
    var host = 'http://localhost:8080';
    return {
          getPromises: function() {
              return $http.get(host + '/promises').then(function (response) {
                  var promises = [];
                  angular.forEach(response.data, function (data) {
                    promises.push(data);
                  });
                  return promises;
              });
          },

          createPromise: function (promise) {
            return $http.post(host + '/promises', promise).then(function (response) {
              return response.data;
            });
          },

          updatePromise: function (promise) {
            return $http.put(host + '/promises/' + promise._id, promise).then(function (response) {
              return response.data;
            });
          }
        }
  });
