'use strict';

describe('Service: purchaseStat', function () {

  // instantiate service
  var purchaseStat,
    init = function () {
      inject(function (_purchaseStat_) {
        purchaseStat = _purchaseStat_;
      });
    };

  // load the service's module
  beforeEach(module('purchaseManageFrontendApp'));

  it('should do something', function () {
    init();

    expect(!!purchaseStat).toBe(true);
  });

  it('should be configurable', function () {
    module(function (purchaseStatProvider) {
      purchaseStatProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(purchaseStat.greet()).toEqual('Lorem ipsum');
  });

});
