'use strict';

describe('SignupCtrl', function() {
  beforeEach(module('chainApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('$scope functions', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('SignupCtrl', { $scope: $scope });
    });

    it('scope defined', function() {
      expect($scope).toBeDefined();
    });

  });
});
