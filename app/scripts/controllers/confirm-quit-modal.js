'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:ConfirmQuitModalCtrl
 * @description
 * # ConfirmQuitModalCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('ConfirmQuitModalCtrl', function ($scope, $modalInstance) {
    $scope.ok = function () {
      $modalInstance.close();
    };
    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
