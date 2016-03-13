'use strict';

/**
 * @ngdoc function
 * @name chainApp.controller:PublicCtrl
 * @description
 * # PublicCtrl
 * Controller of the chainApp
 */
angular.module('chainApp')
  .controller('PublicCtrl', function ($scope, PromiseService) {

      $scope.promises = [];

      PromiseService.getAllPromises().then(function(promises){
        $scope.promises = promises;
      });
});
