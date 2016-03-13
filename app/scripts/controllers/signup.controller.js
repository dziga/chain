'use strict';

/**
 * @ngdoc function
 * @name chainApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the chainApp
 */
angular.module('chainApp')
  .controller('SignupCtrl', function ($scope, $state, AuthService) {

    $scope.user = {
      name: '',
      password: ''
    };

    $scope.signup = function() {
      AuthService.register($scope.user).then(function(result) {
        if (result.data.success) {
          $state.go('login');
        } else {
          $scope.errorMsg = result.data.msg;
        }
      });
    };
});
