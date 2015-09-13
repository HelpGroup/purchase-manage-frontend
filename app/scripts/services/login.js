'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.Login
 * @description
 * # Login
 * Factory in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .factory('Login', function (restmod, config) {
    var host = config.host;
    // Service logic
    // ...
    // Public API here
    return restmod.model(host + '/login');
  });
