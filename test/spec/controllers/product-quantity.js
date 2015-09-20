'use strict';

describe('Controller: ProductQuantityCtrl', function () {

  // load the controller's module
  beforeEach(module('purchaseManageFrontendApp'));

  var ProductQuantityCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductQuantityCtrl = $controller('ProductQuantityCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProductQuantityCtrl.awesomeThings.length).toBe(3);
  });
});
