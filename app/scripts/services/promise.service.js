'use strict';

/**
 * @ngdoc service
 * @name chainApp.promise
 * @description
 * # promise
 * Service in the chainApp.
 */
angular.module('chainApp')
  .service('PromiseService', function ($http, ENV) {
    var host = ENV.host;

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

          getAllPromises: function() {
              return $http.get(host + '/public/promises').then(function (response) {
                  var promises = [];
                  angular.forEach(response.data, function (data) {
                    promises.push(data);
                  });
                  return promises;
              });
          },

          getArchivedPromises: function() {
              return $http.get(host + '/archived/promises').then(function (response) {
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
          },

          deletePromise: function (promise) {
            return $http.delete(host + '/promises/' + promise._id).then(function (response) {
              return response.data;
            });
          },

          getCurrentPromises: function() {
              return $http.get(host + '/promise/current').then(function (response) {
                  var promises = [];
                  angular.forEach(response.data, function (data) {
                    promises.push(data);
                  });
                  return promises;
              });
          }
        };
  });
