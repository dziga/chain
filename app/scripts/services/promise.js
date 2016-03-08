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
    return {
          getSummary: function() {
              return $http.get('/promises/summary').then(function (response) {
                  var promises = [];
                  angular.forEach(response.data, function (data) {
                    promises.push(data);
                  });
                  return promises;
              });
          },

          getCurrent: function () {
            return $http.get('/promises/current').then(function (response) {
                var promises = [];
                angular.forEach(response.data, function (data) {
                  promises.push(data);
                });
                return promises;
            });
          },

          saveCurrent: function (promises) {
            return $http.post('/promises/current', promises).then(function (response) {
              console.log(response);
              var promises = [];
              angular.forEach(response.data, function (data) {
                promises.push(data);
              });
              return promises;
            });
          }
        }
  });
