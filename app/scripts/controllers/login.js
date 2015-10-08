'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('LoginCtrl', function ($http, $state, $location, $timeout, authorization, Login, config, alertService, routeService) {
    var self = this;
    this.username = '';
    this.password = '';
    this.login = function () {
      var password;
      Login.$create({
        username: this.username,
        password: this.password
      }).$then(function (data) {
        if (self.rememberMe) {
          password = this.password;
        } else {
          password = null; 
        }
        authorization.setAuthorization(data.token, data.username, data.roleId, data.id, password);
        authorization.setHttpAuthorizationHeader(data.token);
        if (1 === data.roleId) {
          $state.go(config.path.AFTER_LOGIN); 
        } else {
          $state.go(config.path.PURCHASE_QUANTITY);
        }
      }, function() {
        var alert = {
          type: 'danger',
          msg: '用户名或者密码错误',
          code: alertService.codes.USERNAME_OR_PASSWORD_ERR,
        };
        alertService.alert(alert);
      });
    };
    if (authorization.isRememberMe()) {
      self.autoLogining = true;
      $timeout(function () {
        authorization.autoLogin().then(function () {
          routeService.go('AFTER_LOGIN');
        }, function () {
          $state.reload();
        });
      }, 500);
    }
  });
