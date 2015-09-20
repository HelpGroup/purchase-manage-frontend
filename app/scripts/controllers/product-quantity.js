'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:ProductQuantityCtrl
 * @description
 * # ProductQuantityCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('ProductQuantityCtrl', function ($scope, lodash) {
    var productQuantity = this;
    productQuantity.list = [{       
      id: 1,
      name: '蔬菜',
      items: [{
        name: '青菜',
        id: 1,
        unit: 'g'
      }, {
        name: '白萝卜',
        id: 2,
        unit: 'g'
      }]
    }];
    productQuantity.readyForCommit = false;

    $scope.$watch(function () {
      return productQuantity.list;  
    }, function (list) {
      productQuantity.readyForCommit = lodash.every(list, function (classify) {
        return lodash.every(classify.items, function (item) {
          return null != item.quantity  && item.quantity.trim() !== '';
        }); 
      });
    }, true);
  });
