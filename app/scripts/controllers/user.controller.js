'use strict';

/**
 * @ngdoc function
 * @name chainApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the chainApp
 */
angular.module('chainApp')
  .controller('UserCtrl', function ($scope, $timeout, AuthService, UserService) {

    if (AuthService.isAuthenticated()) {
      $scope.user = AuthService.getUser();
    }

    $scope.changePassword = function () {
      UserService.changePassword($scope.user).then(function (result) {
        if (result.data.success) {
          $scope.successMsg = result.data.msg;
          $timeout(function() {
            $scope.successMsg = null;
          }, 3000);
        }
        else {
          $scope.errorMsg = result.data.msg;
          $timeout(function() {
            $scope.errorMsg = null;
          }, 3000);
        }
      });
    }

  });
