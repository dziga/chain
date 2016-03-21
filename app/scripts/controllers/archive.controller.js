'use strict';

/**
 * @ngdoc function
 * @name chainApp.controller:ArchiveCtrl
 * @description
 * # ArchiveCtrl
 * Controller of the chainApp
 */
angular.module('chainApp')
  .controller('ArchiveCtrl', function ($scope, PromiseService) {

      $scope.promises = [];

      function getArchivedPromises() {
        PromiseService.getArchivedPromises().then(function(promises){
          $scope.promises = promises;
        });
      }

      $scope.deletePromise = function(promise) {
        PromiseService.deletePromise(promise).then(function(){
          getArchivedPromises();
        });
      };

      getArchivedPromises();
});
