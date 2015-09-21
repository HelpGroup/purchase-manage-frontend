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
    // host: 'http://10.10.10.223:8083/purchase',
    host: 'http://localhost:9000/purchase',
    path: {
      LOGIN: 'login',
      CREATE_USER: 'user.create',
      MODIFY_USER_PASSWORD: 'user.modifyPassword',
      USER_LIST: 'user.list',
      AFTER_LOGIN: 'purchase.stat',
      PURCHASE_QUANTITY: 'purchase.quantity'
    },
    expression: {
      quantity: /^[1-9]\d*$|^0$/
    },
    defaultMsg: {
      quantity: {
        error: '只允许非负整数'
      }
    }
  });
