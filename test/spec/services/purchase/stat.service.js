'use strict';

describe('Service: purchase/stat.service', function () {

  // load the service's module
  beforeEach(module('purchaseManageFrontendApp'));

  // instantiate service
  var purchase/stat.service;
  beforeEach(inject(function (_purchase/stat.service_) {
    purchase/stat.service = _purchase/stat.service_;
  }));

  it('should do something', function () {
    expect(!!purchase/stat.service).toBe(true);
  });

});
