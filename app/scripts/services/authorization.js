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
    this.setAuthorization = function (token, username, roleId) {
      $cookies.put(COOKIE_NAME, JSON.stringify({
        token: token,
        username: username,
        roleId: roleId
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
        templateUrl: '/views/confirm-quit-modal.html',
        controller: 'ConfirmQuitModalCtrl'
      });
      modalInstance.result.then(function () {
        $cookies.remove(COOKIE_NAME);
        $state.go(config.path.LOGIN);
      });
    };
    this.init = function (type) {
      if ('development' === type) {
        this.setAuthorization('', 'lxc', 1);
      };
    };
    return this;
  });
