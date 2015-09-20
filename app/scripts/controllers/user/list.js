'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:UserListCtrl
 * @description
 * # UserListCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('UserListCtrl', function ($state, User, alertService, config) {
    this.userList = [{
      username: 'lxc',
      id: 1
    }];
    this.modifyPassword = function (user) {
      $state.go(config.path.MODIFY_USER_PASSWORD, {
        successPath: config.path.USER_LIST,
        username: user.username,
        userId: user.id
      });
    };
    this.create = function (user) {
      $state.go(config.path.CREATE_USER);
    };
    this.delete = function (user) {
      User.$destroy().$then(function () {
        var alert = {
          msg: '用户删除成功',
          type: 'success'
        };
        alertService.alert(alert);
      });
    };
    User.$search().$then(function (userList) {
      this.userList = userList;
    }.bind(this), function () {
      var alert = {
        msg: '获取用户列表失败',
        type: 'danger',
        code: alertService.codes.GET_USER_LIST_ERR
      };
      alertService.alert(alert);
    });
  });
