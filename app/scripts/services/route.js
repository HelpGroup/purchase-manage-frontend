'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.route
 * @description
 * # route
 * Service in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .service('routeService', function ($location, $rootScope, $state, alertService, config, authorization) {
    this.init = function () {
      $rootScope.$on('$stateChangeStart', function (a, toState) {
        var authorizationValue = authorization.getAuthorization();
        if (authorizationValue) {
          var token = authorizationValue.token; 
          authorization.setHttpAuthorizationHeader(token);
          if ((toState.name === config.path.LOGIN) && !(toState.name !== config.path.AFTER_LOGIN)) {
            $state.go(config.path.AFTER_LOGIN);
          }
        } else {
          if (toState.name !== config.path.LOGIN) {
            $state.go(config.path.LOGIN);
          }
        }
        alertService.init('PATH_CHANGE');
      });
    };
    return this;
  });
