'use strict';

describe('Service: route', function () {

  // load the service's module
  beforeEach(module('purchaseManageFrontendApp'));

  // instantiate service
  var route;
  beforeEach(inject(function (_route_) {
    route = _route_;
  }));

  it('should do something', function () {
    expect(!!route).toBe(true);
  });

});
