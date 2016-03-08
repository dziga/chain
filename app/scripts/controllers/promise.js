'use strict';

/**
 * @ngdoc function
 * @name chainApp.controller:PromiseCtrl
 * @description
 * # PromiseCtrl
 * Controller of the chainApp
 */
angular.module('chainApp')
  .controller('PromiseCtrl', function ($scope, $uibModalInstance) {
    $scope.promise = {};
    $scope.promise.frequency = 1;
    $scope.promise.duration = 1;

    $scope.ok = function () {
      $scope.promise.since = new Date();
      $uibModalInstance.close($scope.promise);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
