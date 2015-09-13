'use strict';

describe('Service: classify', function () {

  // load the service's module
  beforeEach(module('purchaseManageFrontendApp'));

  // instantiate service
  var classify;
  beforeEach(inject(function (_classify_) {
    classify = _classify_;
  }));

  it('should do something', function () {
    expect(!!classify).toBe(true);
  });

});
