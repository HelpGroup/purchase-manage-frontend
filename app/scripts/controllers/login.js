'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('LoginCtrl', function ($http, authorization, Login, alertService, $log) {
    var login = this;
    this.username = '';
    this.password = '';
    this.login = function () {
      Login.$create({
        username: this.username,
        password: this.password
      }).$then(function (data) {
        // TODO 放到alert服务里面作为alert的例子, 然后删除这段代码改为页面跳转
        var alert = {
          type: 'success',
          dismissOnTimeout: 1000,
          code: alertService.codes.LOGIN_SUCCESS,
          msg: '登录成功',
          close: function (index) {
            alertService.closeAlert(index); 
          }
        };
        alertService.alert(alert);
        
        authorization.setAuthorization(data.token, login.username);
        authorization.setHttpAuthorizationHeader(data.token);
      }, function($response) {
        // TODO common handle response
        var alert = {
          type: 'danger',
          msg: '用户名或者密码错误',
          code: alertService.codes.USERNAME_OR_PASSWORD_ERR,
        };
        alertService.alert(alert);
      }); 
    };
  });
