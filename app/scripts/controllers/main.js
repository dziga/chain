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

    PromiseService.getSummary().then(function(promises){
      $scope.promises = promises;
    });

    PromiseService.getCurrent().then(function(promises){
      $scope.current = promises;
    });

    $scope.saveCurrent = function() {
      PromiseService.saveCurrent($scope.current).then(function(promises){
        $scope.current = promises;
      });
    };

    $scope.addPromiseDialog = function (size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/addPromise.html',
        controller: 'PromiseCtrl',
        size: size,
        resolve: {

        }
      });

      modalInstance.result.then(function (promise) {
        console.log(promise);
      }, function () {

      });
    };



  });
