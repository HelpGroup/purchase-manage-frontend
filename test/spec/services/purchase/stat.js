'use strict';

describe('Service: purchase/stat', function () {

  // load the service's module
  beforeEach(module('purchaseManageFrontendApp'));

  // instantiate service
  var purchase/stat;
  beforeEach(inject(function (_purchase/stat_) {
    purchase/stat = _purchase/stat_;
  }));

  it('should do something', function () {
    expect(!!purchase/stat).toBe(true);
  });

});
