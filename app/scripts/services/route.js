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
    var route = this;
    route.init = function () {
      $rootScope.$on('$stateChangeStart', function (event, toState) {
        $rootScope.modifyUserUrl = route.getModifyUserUrl();

        var authorizationValue = authorization.getAuthorization();
        if (authorizationValue) {
          var token = authorizationValue.token; 
          authorization.setHttpAuthorizationHeader(token);
          if (toState.name === config.path.LOGIN) {
            if (authorizationValue.roleId === 1) {
              $state.go(config.path.AFTER_LOGIN);
            } else {
              $state.go(config.path.PURCHASE_QUANTITY);
            }
          }
        } else {
          if (toState.name !== config.path.LOGIN) {
            $state.go(config.path.LOGIN);
          }
        }
        alertService.init('PATH_CHANGE');
      });
    };
    route.getModifyUserUrl = function () {
      if (authorization.isLogined()) {
        var userId = authorization.getAuthorization().userId;
        var username = authorization.getAuthorization().username;
        var currentUrl = $location.url();
        return '#/user/' + userId +'/modifyPassword?username=' +username+ '&successPath=' + currentUrl;
      } else {
        return '';
      }
    };
    return route;
  });
