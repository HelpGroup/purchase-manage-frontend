'use strict';

describe('Service: common/confirm', function () {

  // load the service's module
  beforeEach(module('purchaseManageFrontendApp'));

  // instantiate service
  var common/confirm;
  beforeEach(inject(function (_common/confirm_) {
    common/confirm = _common/confirm_;
  }));

  it('should do something', function () {
    expect(!!common/confirm).toBe(true);
  });

});
