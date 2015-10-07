'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:UserListCtrl
 * @description
 * # UserListCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('UserListCtrl', function ($modal, $state, $scope, User, alertService, config, userBaseService) {
    this.userList = [];
    $scope.userBaseService = userBaseService;
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
      var modalInstance = $modal.open({
        templateUrl: 'views/confirm-modal.html',
        controller: 'ConfirmModalCtrl',
        resolve: {
          message: function () {
            return '确认删除该用户?';
          }
        }
      });
      modalInstance.result.then(function () {
        user.$destroy().$then(function () {
          var alert = {
            msg: '用户删除成功',
            type: 'success',
            dismissOnTimeout: 3000
          };
          alertService.alert(alert);
        });
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
