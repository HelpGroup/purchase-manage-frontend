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
    commonTimeService.minDate = moment(new Date()).toDate();

    var productQuantity = this;
    productQuantity.instance = {
      categories: [],
      lock: false
    };
    productQuantity.readyForCommit = false;

    productQuantity.commitEdit = function () {
      if (!productQuantity.readyForCommit) {
        return false;
      }
      productQuantity.instance.$save().$then(function () {
        alertService.alert({
          msg: '录入成功'
        });
        productQuantity = readyForCommit = false;
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
      var date = moment(new Date(commonTimeService.dt)).format('YYYY-MM-DD'); 
      PurchaseQuantityModel.$new(date).$fetch().$then(function (purchaseQuantityInstance) {
        productQuantity.instance = purchaseQuantityInstance;
      }, function (err) {
        alert(err.$response.data.message);
      }); 
    };

    $scope.$watch(function () {
      return productQuantity.instance.categories;  
    }, function (list, oldList) {
      if (0 === oldList.length) {
        return false; 
      }
      productQuantity.readyForCommit = lodash.every(list, function (classify) {
        return lodash.every(classify.ingredientList, function (item) {
          return config.expression.quantity.test(item.amount);
        }); 
      });
    }, true);

    productQuantity.getInstance();
  });
