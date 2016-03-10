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

    function countNextTime(date, frequency, frequencyType) {
      var nextDate = new Date(date);
      switch (frequencyType) {
        case 'month'  :  nextDate.setMonth(date.getMonth() + frequency);  return nextDate;
        case 'week'   :  nextDate.setDate(date.getDate() + 7*frequency);  return nextDate;
        case 'day'    :  nextDate.setDate(date.getDate() + frequency);  return nextDate;
        case 'hour'   :  nextDate.setTime(date.getTime() + frequency*3600000);  return nextDate;
      }
    }

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

            promise.history = {};
            promise.history.atTime = countNextTime(promise.since, promise.frequency, promise.frequencyType);
            promise.history.done = false;

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
        }
  });
