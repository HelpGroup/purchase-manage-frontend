'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.route
 * @description
 * # route
 * Service in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .service('routeService', function ($location, $rootScope, config, authorization) {
    this.init = function () {
      $rootScope.$on('$routeChangeStart', function () {
        var authorizationValue = authorization.getAuthorization();
        if (authorizationValue) {
          var token = authorizationValue.token; 
          authorization.setHttpAuthorizationHeader(token);
        } else {
          $location.path(config.path.LOGIN);
        }
      });
    };
    return this;
  });
