'use strict';

/**
 * @ngdoc function
 * @name chainApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chainApp
 */
angular.module('chainApp')
  .controller('MainCtrl', function ($http, $scope, $filter, PromiseService) {

    $scope.promises = [];
    $scope.current = [];


    PromiseService.getPromises().then(function(promises){
      $scope.promises = promises;
    });

    $scope.createPromise = function(promise) {
      promise.since = new Date();
      PromiseService.createPromise(promise).then(function(promises){
        $scope.promises.push(promises);
      });
    };

    $scope.updatePromise = function(promise) {
      console.log(promise);
      PromiseService.updatePromise(promise).then(function(promises){
        // nothing for now, error handling later
      });
    };

    PromiseService.getCurrentPromises().then(function(promises){
      $scope.current = promises;
    });

  });
