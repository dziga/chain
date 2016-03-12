'use strict';

/**
 * @ngdoc function
 * @name chainApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chainApp
 */
angular.module('chainApp')
  .controller('MainCtrl', function ($scope, $location, AuthService) {

    if (AuthService.isAuthenticated()) {
      $scope.user = AuthService.getUser();
    }

    $scope.logout = function () {
      AuthService.logout();
      $location.path("/login");
    }

  });
