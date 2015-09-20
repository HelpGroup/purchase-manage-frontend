'use strict';

describe('Service: purchase/statProvider', function () {

  // instantiate service
  var purchase/statProvider,
    init = function () {
      inject(function (_purchase/statProvider_) {
        purchase/statProvider = _purchase/statProvider_;
      });
    };

  // load the service's module
  beforeEach(module('purchaseManageFrontendApp'));

  it('should do something', function () {
    init();

    expect(!!purchase/statProvider).toBe(true);
  });

  it('should be configurable', function () {
    module(function (purchase/statProviderProvider) {
      purchase/statProviderProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(purchase/statProvider.greet()).toEqual('Lorem ipsum');
  });

});
