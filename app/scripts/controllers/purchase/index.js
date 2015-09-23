'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:PurchaseIndexCtrl
 * @description
 * # PurchaseIndexCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('PurchaseIndexCtrl', function (commonTimeService) {
    var purchaseIndex = this;
    purchaseIndex.commonTimeService = commonTimeService;
  });
