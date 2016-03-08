'use strict';

describe('Service: PromiseService', function () {

  // load the service's module
  beforeEach(module('chainApp'));

  // instantiate service
  var promise;
  beforeEach(inject(function (_promise_) {
    promise = _promise_;
  }));

  it('should do something', function () {
    expect(!!promise).toBe(true);
  });

});
