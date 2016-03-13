'use strict';

describe('Service: authService', function () {

  // load the service's module
  beforeEach(module('chainApp'));

  var authService;

  beforeEach(inject(function($injector) {
    authService = $injector.get('AuthService');
  }));

  it('should do something', function () {
    expect(!!authService).toBe(true);
  });

});
