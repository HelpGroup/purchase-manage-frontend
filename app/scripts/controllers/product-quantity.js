'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:ProductQuantityCtrl
 * @description
 * # ProductQuantityCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('ProductQuantityCtrl', function ($scope, PurchaseQuantityModel, commonTimeService, moment, lodash, alertService, config) {
    commonTimeService.dt = moment(new Date()).toDate();
    commonTimeService.maxDate = moment(new Date()).toDate();
    var productQuantity = this;
    productQuantity.instance = {
      categories: [{       
        id: 1,
        name: '蔬菜',
        ingredientList: [{
          name: '青菜',
          id: 1,
          unit: 'g',
          amount: ''
        }, {
          name: '白萝卜',
          id: 2,
          unit: 'g',
          amount: ''
        }]
      }],
      lock: false
    };
    productQuantity.readyForCommit = false;

    productQuantity.commitEdit = function () {
      productQuantity.instance.$save().$then(function () {
        alertService.alert({
          msg: '录入成功'
        });
      }, function () {
        alert('录入失败');
      });
    };

    productQuantity.clear = function () {
      lodash.each(productQuantity.instance.categories, function (classify) {
        lodash.each(classify.ingredientList, function (item) {
          item.amount = 0; 
        });
      });
    };
    productQuantity.getInstance = function () {
      PurchaseQuantityModel.$search(function (purchaseQuantityInstance) {
        productQuantity.instance = purchaseQuantityInstance;
      }, function (err) {
        alert(err.$response.data.message);
      }); 
    };

    $scope.$watch(function () {
      return productQuantity.instance.categories;  
    }, function (list) {
      productQuantity.readyForCommit = lodash.every(list, function (classify) {
        return lodash.every(classify.ingredientList, function (item) {
          return config.expression.quantity.test(item.amount);
        }); 
      });
    }, true);

    productQuantity.getInstance();
  });
