'use strict';

/**
 * @ngdoc function
 * @name chainApp.controller:PromiseCtrl
 * @description
 * # PromiseCtrl
 * Controller of the chainApp
 */
angular.module('chainApp')
  .controller('PromiseCtrl', function ($scope, $http, $filter, PromiseService, AuthService) {

    $scope.promise = {};
    $scope.promise.name = 'do something';
    $scope.promise.frequency = 1;
    $scope.promise.duration = 1;
    $scope.promise.frequencyType = 'day';
    $scope.promise.durationType = 'minute';

    var user = AuthService.getUser();
    if (user) {
      $scope.promise.user = user._id;
    }

    $scope.promise.frequencyTypes = [
      {value: 'hour', text: 'hour'},
      {value: 'day', text: 'day'},
      {value: 'week', text: 'week'},
      {value: 'month', text: 'month'}
    ];

    $scope.promise.durationTypes = [
      {value: 'minute', text: 'minute'},
      {value: 'hour', text: 'hour'}
    ];

    $scope.promises = [];
    $scope.current = [];


    function getPromises() {
        PromiseService.getPromises().then(function(promises){
        $scope.promises = promises;
      });
    }

    getPromises();

    $scope.createPromise = function(promise) {
      PromiseService.createPromise(promise).then(function(promises){
        $scope.promises.push(promises);
        getCurrentPromises();
      });
    };

    $scope.updatePromise = function(promise) {
      PromiseService.updatePromise(promise).then(function(){
        // nothing for now, error handling later
        getCurrentPromises();
      });
    };

    $scope.deletePromise = function(promise) {
      PromiseService.deletePromise(promise).then(function(){
        getPromises();
        getCurrentPromises();
      });
    };

    function getCurrentPromises() {
        PromiseService.getCurrentPromises().then(function(promises){
        $scope.current = promises;
      });
    }

    getCurrentPromises();

  });
