'use strict';

describe('Service: admin/stat', function () {

  // load the service's module
  beforeEach(module('purchaseManageFrontendApp'));

  // instantiate service
  var admin/stat;
  beforeEach(inject(function (_admin/stat_) {
    admin/stat = _admin/stat_;
  }));

  it('should do something', function () {
    expect(!!admin/stat).toBe(true);
  });

});
