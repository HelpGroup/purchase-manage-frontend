'use strict';

describe('Controller: PurchaseIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('purchaseManageFrontendApp'));

  var PurchaseIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PurchaseIndexCtrl = $controller('PurchaseIndexCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PurchaseIndexCtrl.awesomeThings.length).toBe(3);
  });
});
