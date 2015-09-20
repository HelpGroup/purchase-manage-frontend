'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.User
 * @description
 * # User
 * Factory in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .factory('User', function (restmod, config) {
    var host = config.host;
    return restmod.model(host + '/user');
  });
