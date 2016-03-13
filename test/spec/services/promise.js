'use strict';

describe('Service: PromiseService', function () {

  // load the service's module
  beforeEach(module('chainApp'));

  var promiseService;

  beforeEach(inject(function($injector) {
    promiseService = $injector.get('PromiseService');
  }));

  it('should do something', function () {
    expect(!!promiseService).toBe(true);
  });

});
