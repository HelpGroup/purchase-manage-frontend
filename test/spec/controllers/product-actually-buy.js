'use strict';

describe('Controller: ProductActuallyBuyCtrl', function () {

  // load the controller's module
  beforeEach(module('purchaseManageFrontendApp'));

  var ProductActuallyBuyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductActuallyBuyCtrl = $controller('ProductActuallyBuyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProductActuallyBuyCtrl.awesomeThings.length).toBe(3);
  });
});
