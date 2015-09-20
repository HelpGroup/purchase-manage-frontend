'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.classify
 * @description
 * # classify
 * Factory in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .factory('Classify', function (restmod, config) {
    return restmod.model(config.host + '/category');
  });
