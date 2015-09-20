'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:ConfirmQuitModalCtrl
 * @description
 * # ConfirmQuitModalCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('ConfirmModalCtrl', function ($scope, $modalInstance, message) {
    $scope.message = message;
    $scope.ok = function () {
      $modalInstance.close();
    };
    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
