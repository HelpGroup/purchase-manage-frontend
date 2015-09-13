'use strict';

describe('Controller: UserModifyCtrl', function () {

  // load the controller's module
  beforeEach(module('purchaseManageFrontendApp'));

  var UserModifyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserModifyCtrl = $controller('UserModifyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserModifyCtrl.awesomeThings.length).toBe(3);
  });
});
