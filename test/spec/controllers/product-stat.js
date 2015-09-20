'use strict';

describe('Controller: ProductStatCtrl', function () {

  // load the controller's module
  beforeEach(module('purchaseManageFrontendApp'));

  var ProductStatCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductStatCtrl = $controller('ProductStatCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProductStatCtrl.awesomeThings.length).toBe(3);
  });
});
