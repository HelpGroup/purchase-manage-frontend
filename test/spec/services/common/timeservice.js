'use strict';

describe('Service: common/timeService', function () {

  // load the service's module
  beforeEach(module('purchaseManageFrontendApp'));

  // instantiate service
  var common/timeService;
  beforeEach(inject(function (_common/timeService_) {
    common/timeService = _common/timeService_;
  }));

  it('should do something', function () {
    expect(!!common/timeService).toBe(true);
  });

});
