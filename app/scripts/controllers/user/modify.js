'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:UserModifyCtrl
 * @description
 * # UserModifyCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('UserModifyCtrl', function ($state, $location, User, alertService) {
    // object {successPath: 成功之后的路由; username: 用户名; userId: 用户id}
    var search = $state.params;
    this.messages = {
      notEqual: false,
      empty: false
    };
    this.user = {
      username: search.username,
      id: search.userId,
      password: ''
    };
    this.cancel = function () {
      $state.go(search.successPath);
    };
    this.modify = function () {
      if (this.validateEmpty()) {
        this.messages.empty = true;
        this.messages.notEqual = false;
        return false;
      }
      if (this.validateNotEqual()) {
        this.messages.notEqual = true;
        this.messages.empty = false;
        return false;
      }
      var user = User.$new(this.user.id)
      user.password = this.user.password;
      user.$save(['password']).$then(function () {
        var alert = {
          msg: '修改成功',
          type: 'success',
          dismissOnTimeout: 3000
        };
        alertService.alert(alert);
        $state.go(search.successPath);  
      }, function () {
        var alert = {
          msg: '修改失败',
          type: 'danger'
        };
        alertService.alert(alert);
      });
    };

    this.validateNotEqual = function () {
      return $.trim(this.user.password) !== $.trim(this.user.repeatPassword);
    };

    this.validateEmpty = function () {
      return '' === $.trim(this.user.password) || '' === $.trim(this.user.repeatPassword);
    };

  });
