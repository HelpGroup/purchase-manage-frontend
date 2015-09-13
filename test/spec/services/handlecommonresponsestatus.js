'use strict';

describe('Service: handleCommonResponseStatus', function () {

  // load the service's module
  beforeEach(module('purchaseManageFrontendApp'));

  // instantiate service
  var handleCommonResponseStatus;
  beforeEach(inject(function (_handleCommonResponseStatus_) {
    handleCommonResponseStatus = _handleCommonResponseStatus_;
  }));

  it('should do something', function () {
    expect(!!handleCommonResponseStatus).toBe(true);
  });

});
