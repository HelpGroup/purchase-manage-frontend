'use strict';

describe('Service: purchase/quantityFactory', function () {

  // load the service's module
  beforeEach(module('purchaseManageFrontendApp'));

  // instantiate service
  var purchase/quantityFactory;
  beforeEach(inject(function (_purchase/quantityFactory_) {
    purchase/quantityFactory = _purchase/quantityFactory_;
  }));

  it('should do something', function () {
    expect(!!purchase/quantityFactory).toBe(true);
  });

});
