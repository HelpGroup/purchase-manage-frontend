'use strict';

describe('Service: purchase/statService', function () {

  // load the service's module
  beforeEach(module('purchaseManageFrontendApp'));

  // instantiate service
  var purchase/statService;
  beforeEach(inject(function (_purchase/statService_) {
    purchase/statService = _purchase/statService_;
  }));

  it('should do something', function () {
    expect(!!purchase/statService).toBe(true);
  });

});
