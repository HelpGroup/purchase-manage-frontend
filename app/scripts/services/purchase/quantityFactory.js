'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.purchase/quantityFactory
 * @description
 * # purchase/quantityFactory
 * Factory in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .factory('PurchaseQuantityModel', function (restmod, config) {
    return restmod.model(config.host + '/amount/branch');
  });
