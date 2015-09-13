'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:UserListCtrl
 * @description
 * # UserListCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('UserListCtrl', function ($location, User, alertService, config) {
    this.userList = [];
    this.modifyPassword = function (user) {
      $location.search({
        successPath: config.path.USER_LIST,
        username: user.username,
        userId: user.id
      })
      .path(config.path.MODIFY_USER_PASSWORD);
    };
    this.create = function (user) {
      $location.path(config.path.CREATE_USER);
    };
    this.delete = function (user) {
      user.$destroy().$then(function () {
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
