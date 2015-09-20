'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:ProductStatCtrl
 * @description
 * # ProductStatCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('ProductStatCtrl', function (StatModel, $modal, moment, alertService, commonTimeService) {
    var productStat = this;
    productStat.shops = [{
      username: '001店',
      id: 1
    }, {
      username: '002店',
      id: 2
    }];

    productStat.list = [
      {
        "id": 2,
        "name": "海产品",
        "ingredientList": [
          {
            "id": 4,
            "name": "基围虾",
            "unit": "g",
            "categoryId": 2,
            "amount": 40,
            "amounts": [
              {
                "id": 12,
                "ingredientId": 4,
                "userId": 2,
                "amount": 30
              },
              {
                "id": 14,
                "ingredientId": 4,
                "userId": 3,
                "amount": 10
              }
            ]
          },
          {
            "id": 5,
            "name": "牡蛎",
            "unit": "g",
            "categoryId": 2,
            "amount": 70,
            "amounts": [
              {
                "id": 13,
                "ingredientId": 5,
                "userId": 2,
                "amount": 20
              },
              {
                "id": 15,
                "ingredientId": 5,
                "userId": 3,
                "amount": 50
              }
            ]
          }
        ]
      }
    ];

    productStat.lock = function (day) {
      var modalInstance = $modal.open({
        templateUrl: 'views/confirm-modal.html',
        controller: 'ConfirmModalCtrl',
        resolve: {
          message: function () {
            return '是否截取日期为' + commonTimeService.getToday() + '的单?';
          }
        }
      });
      modalInstance.result.then(function () {
        var stat = StatModel.$new(commonTimeService.getToday())
        stat.lock = true;
        stat.$save(['lock']).$then(function () {
          alertService.alert({
            message: '截单成功!'
          });
        }, function () {
          alertService.alert({
            msg: '截单失败!'
          });
        });
      });
    };

  });
