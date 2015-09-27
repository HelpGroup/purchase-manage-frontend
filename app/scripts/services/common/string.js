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
    this.toCDB = function (str) { 
      var tmp = ""; 
      for(var i=0;i<str.length;i++) { 
        if(str.charCodeAt(i)>65248&&str.charCodeAt(i)<65375) { 
          tmp += String.fromCharCode(str.charCodeAt(i)-65248); 
        } 
        else { 
          tmp += String.fromCharCode(str.charCodeAt(i)); 
        } 
      } 
      return tmp 
    };
    return this;
  });

