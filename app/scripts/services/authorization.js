'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.authorization
 * @description
 * # authorization
 * Service in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .service('authorization', function ($cookies, $http, $q, $location, $state, $modal, Login, config, moment) {
    var self = this;
    this.setAuthorization = function (token, username, roleId, userId, password) {
      $cookies.put(config.COOKIE_NAME, JSON.stringify({
        token: token,
        username: username,
        roleId: roleId,
        userId: userId,
        password: password
      }));
    };
    this.getAuthorization = function () {
      return $cookies.getObject(config.COOKIE_NAME);
    };
    this.setHttpAuthorizationHeader = function (token) {
      $http.defaults.headers.common.token = token;
    };
    this.isLogined = function () {
      return this.getAuthorization() !== undefined;
    };
    this.logout = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/confirm-modal.html',
        controller: 'ConfirmModalCtrl',
        resolve: {
          message: function () {
            return '确认退出?';
          }
        }
      });
      modalInstance.result.then(function () {
        self.removeLocalAuthorization();
      });
    };
    this.removeLocalAuthorization = function () {
      $cookies.remove(config.COOKIE_NAME);
      $state.go(config.path.LOGIN);
    };
    this.init = function (type, admin) {
      if ('development' === type) {
        this.setAuthorization('', 'lxc', 1, admin);
      };
    };
    this.isAdmin = function () {
      if (null == this.getAuthorization()) {
        return false;
      }
      return this.getAuthorization().roleId === 1;
    };
    // 假如登录的时候选择"记住我", 密码会放在cookie里面, 那么页面打开的时候就会自动产生一次自动登录, 更新本地cookie存放的用户信息
    this.isRememberMe = function () {
      var authorizationValue = this.getAuthorization();
      if (authorizationValue && authorizationValue.password) {
        return true;
      } else {
        return false;
      }
    };
    this.autoLogin = function () {
      var authorizationValue = this.getAuthorization();
      var deferred = $q.defer();
      Login.$create({
        username: authorizationValue.username,
        password: authorizationValue.password
      }).$then(function (data) {
        self.setAuthorization(data.token, authorizationValue.username, data.roleId, data.id, authorizationValue.password);
        self.setHttpAuthorizationHeader(data.token);
        deferred.resolve();
      }, function () {
        self.removeLocalAuthorization();
        deferred.reject();
      });
      return deferred.promise; 
    };
    return this;
  });
