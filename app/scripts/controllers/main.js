'use strict';

/**
 * @ngdoc function
 * @name chainApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chainApp
 */
angular.module('chainApp')
  .controller('MainCtrl', function ($http, $scope, $uibModal, PromiseService) {

    $scope.promises = [];
    $scope.current = [];

    PromiseService.getPromises().then(function(promises){
      $scope.promises = promises;
    });

    $scope.createPromise = function(promise) {
      PromiseService.createPromise(promise).then(function(promises){
        $scope.promises.push(promises);
      });
    };

    $scope.updatePromise = function(promise) {
      PromiseService.updatePromise(promise).then(function(promises){
        // nothing for now, error handling later
      });
    };

    PromiseService.getCurrentPromises().then(function(promises){
      $scope.current = promises;
      console.log($scope.current);
    });

    $scope.addPromiseDialog = function (promise, size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/addPromise.html',
        controller: 'PromiseCtrl',
        size: size,
        resolve: {
          promise: promise
        }
      });

      modalInstance.result.then(function (promise) {
        if(promise._id) {
          $scope.updatePromise(promise);
        }
        else {
          promise.since = new Date();
          $scope.createPromise(promise);
        }
      }, function () {

      });
    };



  });
