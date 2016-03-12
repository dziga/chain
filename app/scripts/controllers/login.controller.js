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

    $scope.errorMsg;

    $scope.login = function() {
      AuthService.login($scope.user).then(function(result) {
        if (result.data.success) {
          $location.path("/");
        } else {
          $scope.errorMsg = result.data.msg;
        }
      });
    };
});
