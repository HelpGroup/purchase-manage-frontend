'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.route
 * @description
 * # route
 * Service in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .service('routeService', function ($location, $rootScope, alertService, config, authorization) {
    this.init = function () {
      $rootScope.$on('$routeChangeStart', function () {
        var authorizationValue = authorization.getAuthorization();
        if (authorizationValue) {
          var token = authorizationValue.token; 
          authorization.setHttpAuthorizationHeader(token);
          if ($location.path() === config.path.LOGIN) {
            $location.path(config.path.AFTER_LOGIN);
          }
        } else {
          // $location.path(config.path.LOGIN);
        }
        alertService.init('PATH_CHANGE');
      });
    };
    return this;
  });
