'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.authorization
 * @description
 * # authorization
 * Service in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .service('authorization', function ($cookies, $http, $location, $state, $modal, config, moment) {
    var COOKIE_NAME = 'authorization';
    var self = this;
    this.setAuthorization = function (token, username, roleId, userId) {
      $cookies.put(COOKIE_NAME, JSON.stringify({
        token: token,
        username: username,
        roleId: roleId,
        userId: userId
      }));
    };
    this.getAuthorization = function () {
      return $cookies.getObject(COOKIE_NAME);
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
      $cookies.remove(COOKIE_NAME);
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
    return this;
  });
