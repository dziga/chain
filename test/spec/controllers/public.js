'use strict';

describe('Controller: PublicCtrl', function () {

  // load the controller's module
  beforeEach(module('chainApp'));

  var PublicCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PublicCtrl = $controller('PublicCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PublicCtrl.awesomeThings.length).toBe(3);
  });
});
