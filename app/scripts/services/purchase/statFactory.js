'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.purchase/statProvider
 * @description
 * # purchase/statProvider
 * Provider in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .factory('StatModel', function (restmod, config) {
    return restmod.model(config.host + '/status/admin');
  });
