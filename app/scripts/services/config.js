'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.config
 * @description
 * # config
 * Constant in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .constant('config', {
    host: 'http://10.10.10.149:8083/purchase',
    path: {
      LOGIN: '/login',
      CREATE_USER: '/user/create',
      MODIFY_USER_PASSWORD: '/user/modify',
      USER_LIST: '/user/list',
      AFTER_LOGIN: '/product-stat'
    }
  });
