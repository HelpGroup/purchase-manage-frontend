'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.classify/ingredientFactory
 * @description
 * # classify/ingredientFactory
 * Factory in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .factory('ClassifyIngredientModel', function (restmod, config) {
    return restmod.model();
  });
