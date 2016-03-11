'use strict';

/**
 * @ngdoc function
 * @name chainApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the chainApp
 */
angular.module('chainApp')
  .controller('SignupCtrl', function ($scope, $location, AuthService) {

    $scope.user = {
      name: '',
      password: ''
    };

    $scope.signup = function() {
      AuthService.register($scope.user).then(function(msg) {
        $location.path('/login');
      }, function(errMsg) {
        
      });
    }
});
