'use strict';

describe('Service: classify/ingredientFactory', function () {

  // load the service's module
  beforeEach(module('purchaseManageFrontendApp'));

  // instantiate service
  var classify/ingredientFactory;
  beforeEach(inject(function (_classify/ingredientFactory_) {
    classify/ingredientFactory = _classify/ingredientFactory_;
  }));

  it('should do something', function () {
    expect(!!classify/ingredientFactory).toBe(true);
  });

});
