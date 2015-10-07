'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:UserCreateCtrl
 * @description
 * # UserCreateCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('UserCreateCtrl', function ($window, $state, User, config, alertService) {
    this.messages = {
      notEqual: false,
      empty: false
    };

    this.validateNotEqual = function () {
      return $.trim(this.password) !== $.trim(this.repeatPassword);
    };

    this.validateEmpty = function () {
      return '' === $.trim(this.password) || '' === $.trim(this.repeatPassword);
    };

    this.create = function () {
      if (this.validateEmpty()) {
        this.messages.empty = true;
        this.message.notEqual = false;
        return false;
      }
      if (this.validateNotEqual()) {
        this.messages.notEqual = true;
        this.messages.empty = false;
        return false;
      }
      User.$create({
        username: this.username,
        password: this.password
      }).$then(function () {
        var alert = {
          type: 'success',
          dismissOnTimeout: 1000,
          code: alertService.codes.CREATE_USER_SUCCESS,
          msg: '创建成功',
          close: function (index) {
            alertService.closeAlert(index); 
          }
        };
        alertService.alert(alert); 
        $state.go(config.path.USER_LIST);
      }, function (res) {
        var alert = {
          type: 'danger',
          msg: '',
          code: alertService.codes.CREATE_USER_ERR,
        };
        if (422 === res.$response.status) {
          alert.msg = '用户名已存在, 请换一个用户名重试';
        } else if (400 === res.$response.status) {
          alert.msg = '网络异常, 请稍候重试';
        } else if (500 === res.$response.status) {
          alert.msg = '服务器出错了, 请联系开发人员';
        } else {
          alert.msg = '未知的错误, 错误代码:' + res.$response.status;
        }
        alertService.alert(alert);
      }); 
    };
    this.cancel = function () {
      $window.history.back();
    };
  });
