'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:ProductActuallyBuyCtrl
 * @description
 * # ProductActuallyBuyCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('ProductActuallyBuyCtrl', function ($scope, PurchaseChargeModel, commonTimeService, moment, lodash) {
    var productActuallyBuy = this;
    commonTimeService.dt = moment(new Date()).add(-1 , 'd').toDate();
    commonTimeService.maxDate = moment(new Date()).add(-1 , 'd').toDate();

    productActuallyBuy.instance = {
      list: [{       
        id: 1,
        name: '蔬菜',
        items: [{
          name: '青菜',
          id: 1,
          unit: 'g',
          quantity: 1,
          actuallyAmount: '',
          actuallyExpense: ''
        }, {
          name: '白萝卜',
          id: 2,
          unit: 'g',
          quantity: 1,
          actuallyAmount: '',
          actuallyExpense: ''
        }]
      }] 
    };
    productActuallyBuy.readyForCommit = true;
  
    productActuallyBuy.initInstance = function () {
      PurchaseChargeModel.$fetch().$then(function (purchaseChangeInstance) {
        productActuallyBuy.instance = purchaseChangeInstance;
      });
    };

    productActuallyBuy.export = function () {
      PurchaseChargeModel.$new()
    };

    productActuallyBuy.commitEdit = function () {
      PurchaseChargeModel.instance.$save().$then(function () {
        alert('提交成功!');
      }, function () {
        alert('提交失败!');
      });
    };
    $scope.$watch(function () {
      return productActuallyBuy.list
    }, function (list) {
      productActuallyBuy.readyForCommit = lodash.every(list, function (classify) {
        return lodash.every(classify.items, function (item) {
          return item.actuallyAmount != null && item.actuallyAmount.trim() !== '' && item.actuallyExpense != null && item.actuallyExpense.trim() !== ''
        });
      });
    }, true);

  });
