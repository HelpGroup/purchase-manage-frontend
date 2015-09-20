'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:ProductActuallyBuyCtrl
 * @description
 * # ProductActuallyBuyCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('ProductActuallyBuyCtrl', function ($scope, lodash) {
    var productActuallyBuy = this;
    productActuallyBuy.list = [{       
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
    }];
    productActuallyBuy.readyForCommit = true;

    productActuallyBuy.export = function () {
      // TODO
    };
    productActuallyBuy.commitEdit = function () {
      // TODO
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
