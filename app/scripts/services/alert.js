'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.alert
 * @description
 * # alert
 * Service in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .service('alertService', function (lodash) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.alerts = [];
    this.codes = { // alert的所有错误事件代码
      LOGIN_SUCCESS: 1,
      USERNAME_OR_PASSWORD_ERR: 2,
      CREATE_USER_SUCCESS: 3,
      CREATE_USER_ERR: 4,
      GET_USER_LIST_ERR: 5,
      NOT_LOGIN: 6
    };
    this.closeAlert = function(index) {
      this.alerts.splice(index, 1);
    };
    this.addAlert = function (alert) {
      // 相同code的提示不会再出现
      var foundSameCodeAlert = lodash.findWhere(this.alerts, {
        code: alert.code
      });
      if (undefined === foundSameCodeAlert) {
        this.alerts.push(alert);
      }
    };
    /**
     * @ngdoc alert
     * @name 
     * @description
     *
     * @param alert {object} 
     * @param alert.close {function} 参数是要删除的弹窗索引值
     */
    this.alert = function (alert) {
      if (alert.dismissOnTimeout) {
        if (alert.close) {
          alert.close = alert.close.bind(this);
        } else {
          alert.close = this.closeAlert.bind(this);
        }
      } else {
        alert.dismissOnTimeout = false;
        alert.close = this.closeAlert.bind(this);
      }
      this.addAlert(alert);
    };
    return this;
  });
