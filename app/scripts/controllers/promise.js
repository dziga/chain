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
    $scope.promise;

    $scope.ok = function () {
      $uibModalInstance.close($scope.promise);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
