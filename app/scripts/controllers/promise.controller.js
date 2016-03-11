'use strict';

/**
 * @ngdoc function
 * @name chainApp.controller:PromiseCtrl
 * @description
 * # PromiseCtrl
 * Controller of the chainApp
 */
angular.module('chainApp')
  .controller('PromiseCtrl', function ($scope) {

    $scope.promise = {}
    $scope.promise.name = "do something";
    $scope.promise.frequency = 1;
    $scope.promise.duration = 1;
    $scope.promise.frequencyType = "day";
    $scope.promise.durationType = "minute";

    $scope.promise.frequencyTypes = [
      {value: "hour", text: "hour"},
      {value: "day", text: "day"},
      {value: "week", text: "week"},
      {value: "month", text: "month"}
    ];

    $scope.promise.durationTypes = [
      {value: "minute", text: "minute"},
      {value: "hour", text: "hour"}
    ];

  });
