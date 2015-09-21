'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('LoginCtrl', function ($http, $state, $location, authorization, Login, config, alertService, $log) {
    var login = this;
    this.username = '';
    this.password = '';
    this.login = function () {
      Login.$create({
        username: this.username,
        password: this.password
      }).$then(function (data) {
        authorization.setAuthorization(data.token, data.username, data.roleId, data.id);
        authorization.setHttpAuthorizationHeader(data.token);
        if (1 === data.roleId) {
          $state.go(config.path.AFTER_LOGIN); 
        } else {
          $state.go(config.path.PURCHASE_QUANTITY);
        }
      }, function($response) {
        var alert = {
          type: 'danger',
          msg: '用户名或者密码错误',
          code: alertService.codes.USERNAME_OR_PASSWORD_ERR,
        };
        alertService.alert(alert);
      });
    };
  });
