'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:ProductStatCtrl
 * @description
 * # ProductStatCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('ProductStatCtrl', function (PurchaseAmountModel, StatModel, $modal, $window, config, moment, alertService, commonTimeService) {
    commonTimeService.dt = new Date();
    commonTimeService.maxDate = new Date();
    commonTimeService.chooseDate = function () {
      productStat.getInstance(commonTimeService.dt);
    };
    var productStat = this;
    productStat.instance = null;

    productStat.export = function () {
      $window.open(config.host + '/amount/' + moment(new Date(commonTimeService.dt)).format('YYYY-MM-DD') + '/csv');
    };

    productStat.toggleLock = function (day) {
      var lockText = '';
      if (productStat.instance.lock) {
        lockText = '取消截';
      } else {
        lockText = '截';
      }
      var modalInstance = $modal.open({
        templateUrl: 'views/confirm-modal.html',
        controller: 'ConfirmModalCtrl',
        resolve: {
          message: function () {
            return '是否'+ lockText +'日期为' + moment(commonTimeService.dt).format('YYYY-MM-DD') + '的单?';
          }
        }
      });
      modalInstance.result.then(function () {
        var productStatInstance = productStat.instance;
        productStatInstance.lock = !productStatInstance.lock;
        productStatInstance.$save(['lock']).$then(function () {
          alertService.alert({
            msg: lockText + '单成功!'
          });
        }, function () {
          alertService.alert({
            msg: lockText + '单失败!'
          });
          productStatInstance.lock = !productStatInstance.lock;
        });
      });
    };

    productStat.getInstance = function (date) {
      var date = date || null;
      if (null != date) {
        date = moment(date).format('YYYY-MM-DD'); 
      } else {
        date = commonTimeService.getToday();
      }
      PurchaseAmountModel.$new(date).$fetch().$then(function (statInstance) {
        productStat.instance = statInstance;
      }, function () {
        alertService.alert({
          msg: '获取统计数据错误'
        });
      });
    };
    
    productStat.getInstance();
  });
