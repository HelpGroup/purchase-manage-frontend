'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.common/timeService
 * @description
 * # common/timeService
 * Service in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .service('commonTimeService', function (moment) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.init =  function () {
      this.dt = null;
      this.maxDate = null;
      this.minDate = null;
    };
    this.getToday = function () {
      return moment(new Date()).format('YYYY-MM-DD'); 
    };
    this.dt = null; // 日历控件的选中的日期值, js的date对象
    this.chooseDate = function () {}; // 选择日期触发的函数, 等待重写
    return this;
  });

