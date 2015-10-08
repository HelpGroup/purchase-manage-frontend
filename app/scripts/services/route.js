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
    route.init = function (event, toState) {
      $rootScope.modifyUserUrl = route.getModifyUserUrl();

        var authorizationValue = authorization.getAuthorization();
        if (authorizationValue) {
          var token = authorizationValue.token; 
          authorization.setHttpAuthorizationHeader(token);
          if (toState.name === config.path.LOGIN) {
            if (!authorization.isRememberMe()) {
              event.preventDefault();
              route.go('AFTER_LOGIN');   
            }
          }
        } else {
          if (toState.name !== config.path.LOGIN) {
            event.preventDefault();
            $state.go(config.path.LOGIN);
          }
        }
        alertService.init();
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
    route.go = function (path) {
      switch(path) {
        case 'AFTER_LOGIN':
          var authorizationValue = authorization.getAuthorization();
          if (authorizationValue.roleId === 1) {
            $state.go(config.path.AFTER_LOGIN);
          } else {
            $state.go(config.path.PURCHASE_QUANTITY);
          }
      } 
    };
    return route;
  });
