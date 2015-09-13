'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.authorization
 * @description
 * # authorization
 * Service in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .service('authorization', function ($cookies, $http, moment) {
    this.setAuthorization = function (token, name) {
      $cookies.put('authorization', JSON.stringify({
        token: token,
        name: name
      }));
    };
    this.getAuthorization = function () {
      return $cookies.getObject('authorization');
    };
    this.setHttpAuthorizationHeader = function (token) {
      $http.defaults.headers.common.token = token;
    };
    return this;
  });
