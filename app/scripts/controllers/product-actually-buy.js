'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:ProductActuallyBuyCtrl
 * @description
 * # ProductActuallyBuyCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('ProductActuallyBuyCtrl', function ($scope, $window, config, PurchaseChargeModel, commonTimeService, moment, lodash, alertService) {
    var productActuallyBuy = this;
    commonTimeService.dt = moment(new Date()).add(-1 , 'd').toDate();
    commonTimeService.maxDate = moment(new Date()).add(-1 , 'd').toDate();
    commonTimeService.chooseDate = function () {
      productActuallyBuy.initInstance();
    };

    productActuallyBuy.instance = null;
    productActuallyBuy.readyForCommit = true;
  
    productActuallyBuy.initInstance = function () {
      var dateMoment = moment(new Date(commonTimeService.dt));
      var date = dateMoment.format('YYYY-MM-DD');
      var dateLocal = dateMoment.format('YYYY年MM月DD日');
      PurchaseChargeModel.$new(date).$fetch().$then(function (purchaseChangeInstance) {
        if (2 === purchaseChangeInstance.status) {
          alertService.alert({
            msg: dateLocal + '未截单',
            code: 'NOT_LOCK'
          });
          productActuallyBuy.instance = null;
        } else {
          productActuallyBuy.instance = purchaseChangeInstance;
          alertService.removeAlert('NOT_LOCK');
        }
      });
    };

    productActuallyBuy.export = function () {
      var date = moment(new Date(commonTimeService.dt)).format('YYYY-MM-DD');
      $window.open(config.host + '/charge/admin/' + date + '/csv');
    };

    productActuallyBuy.allColCount = function (finances, key) {
      var result = 0;
      lodash.each(finances, function (finance){
        result += finance[key];
      });
      return result;
    };

    productActuallyBuy.allRowCount = function () {
      productActuallyBuy.rowCount = {}
      if (!productActuallyBuy.instance) {
        return false; 
      }
      lodash.each(productActuallyBuy.instance.chargeList, function (charge) {
        lodash.each(charge.ingredients, function (ingredient) {
          lodash.each(ingredient.finances, function (finance) {
            if (!productActuallyBuy.rowCount[finance.userId]) {
              productActuallyBuy.rowCount[finance.userId] = {
                amount: 0,
                actualBuy: 0,
                totalCharge: 0
              };
            }
            productActuallyBuy.rowCount[finance.userId]['amount'] += finance.amount;
            productActuallyBuy.rowCount[finance.userId]['actualBuy'] += finance.actualBuy;
            productActuallyBuy.rowCount[finance.userId]['totalCharge'] += finance.totalCharge;
          });
        });
      });
    };

    productActuallyBuy.allCount = function (key) {
      var result = 0;
      if (!productActuallyBuy.rowCount) {
        return false;
      }
      lodash.each(productActuallyBuy.rowCount, function (user) {
        result += user[key];
      });
      return result;
    };

    productActuallyBuy.commitEdit = function () {
      productActuallyBuy.instance.$save(['chargeList']).$then(function () {
        $window.alert('提交成功!');
      }, function () {
        $window.alert('提交失败!');
      });
    };
    $scope.$watch(function () {
      return productActuallyBuy.instance;
    }, function (list) {
      productActuallyBuy.allRowCount();
      // productActuallyBuy.readyForCommit = lodash.every(list, function (classify) {
      //   return lodash.every(classify.finances, function (item) {
      //     return item.actualBuy !== undefined && item.actualBuy !== null && item.actualBuy.trim() !== '' && item.totalCharge !== undefined && item.totalCharge !== null && item.totalCharge.trim() !== '';
      //   });
      // });
    }, true);

    productActuallyBuy.initInstance();

  });
