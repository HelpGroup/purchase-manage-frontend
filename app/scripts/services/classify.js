'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.classify
 * @description
 * # classify
 * Factory in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .factory('Classify', function (restmod) {
    return restmod.model('/category');
  });
