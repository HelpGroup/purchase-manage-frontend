'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.handleCommonResponseStatus
 * @description
 * # handleCommonResponseStatus
 * Factory in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .factory('handleCommonResponseStatus', function ($cookies, restmod, $location, $state, config, alertService) {
    // Service logic
    // Public API here
    return restmod.mixin({
      $hooks: {
        'after-request-error': function () {
          // 假如是401, 那么就跳转到登录页面
          // TODO 由于这个事件周期不能退出, 导致也会进入到每一个实例的错误里面, 还要想办法才行
          if (401 === this.$response.status) {
            var alert = {
              type: 'warning',
              msg: '会话过期, 请重新登录',
              code: alertService.codes.NOT_LOGIN
            };
            alertService.alert(alert);
            if ($cookies.getObject(config.COOKIE_NAME) && $cookies.getObject(config.COOKIE_NAME).password) {
            } else {
              $cookies.remove(config.COOKIE_NAME);
            }
            $state.go(config.path.LOGIN);
          }
        },
        'after-request': function () {
          this.$response.data = this.$response.data.item;
        }
      }
    });
  });
