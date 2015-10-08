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
    /** eg.
     *  var alert = {
     *    type: 'success',
     *    dismissOnTimeout: 1000,
     *    code: alertService.codes.LOGIN_SUCCESS,
     *    msg: '登录成功',
     *    close: function (index) {
     *      alertService.closeAlert(index); 
     *    }
     *  };
     *  alertService.alert(alert);   // AngularJS will instantiate a singleton by calling "new" on this function
     */
    this.alerts = [];
    this.codes = { // alert的所有错误事件代码
      USERNAME_OR_PASSWORD_ERR: {
        removeEvents: ['PATH_CHANGE']
      },
      CREATE_USER_SUCCESS: {
        removeEvents: ['PATH_CHANGE']
      },
      CREATE_USER_ERR: {
        removeEvents: ['PATH_CHANGE']
      },
      GET_USER_LIST_ERR: {
        removeEvents: ['PATH_CHANGE']
      },
      NOT_LOGIN: {
        removeEvents: ['PATH_CHANGE']
      }
    };
    this.removeAlert = function (code) {
      lodash.remove(this.alerts, function (alert) {
        return alert.code === code;
      });
    };
    this.closeAlert = function(index) {
      this.alerts.splice(index, 1);
    };
    this.addAlert = function (alert) {
      // 相同code的提示不会再出现
      lodash.remove(this.alerts, { code: alert.code
      });
      this.alerts.push(alert);
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
      this.alerts = [alert];
    };

    this.init = function (event) {
      this.alerts = [];
      // lodash.remove(this.alerts, function (alert) {
      //   return (null == alert.code) || alert.code.removeEvents !== undefined && alert.code.removeEvents.lastIndexOf(event) >= 0;
      // });
    };
    return this;
  });
