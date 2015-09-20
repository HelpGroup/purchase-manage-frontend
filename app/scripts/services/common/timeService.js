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
    this.getToday = function () {
      return moment(new Date()).format('YYYY-MM-DD'); 
    };
    return this;
  });