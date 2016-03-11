'use strict';

/**
 * @ngdoc function
 * @name chainApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the chainApp
 */
angular.module('chainApp')
  .controller('LoginCtrl', function ($scope, $location, AuthService) {

    $scope.user = {
      name: '',
      password: ''
    };

    $scope.login = function() {
      AuthService.login($scope.user).then(function(msg) {
        $location.path("/");
      }, function(errMsg) {

      });
    };
});
