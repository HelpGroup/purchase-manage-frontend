'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .directive('focusMe', function($timeout) {
    return {
      scope: { trigger: '@focusMe' },
      link: function(scope, element) {
        scope.$watch('trigger', function(value) {
          if(value === "true") { 
            $timeout(function() {
              element[0].focus(); 
            });
          }
        });
      }
    };
  })
  .controller('ProductCtrl', function ($scope, $location, Classify, lodash) {
    var product = this;
    this.readyDeleteIds = [];
    this.list = [{
      id: 1,
      name: '海带',
      unit: 'g'
    }, {
      id: 2,
      name: '鲫鱼',
      unit: '条'
    }];
    product.classifyName = $location.search().classifyName;

    this.initWaitModifyList = function (back) {
      if (back) {
        this.list = angular.copy(this.originalList);
      } else {
        this.originalList = angular.copy(this.list);
      }
      this.modified = true;
    };
    this.initRenameIndex = function () {
      this.renameIndex = null;
    };
    this.rename = function (index, type) {
      this.renameIndex = this.renameIndex || {};
      this.renameIndex.index = index;
      this.renameIndex.type = type;
    };
    this.showRenameInput = function (index, type) {
      if (this.renameIndex === null) {
        return false;
      }
      return index === this.renameIndex.index && type === this.renameIndex.type;
    };
    this.cancelRename = function ($index, type) {
      this.list[$index][type] = this.originalList[$index][type];
      this.initRenameIndex();
    };
    this.delete = function (index) {
      this.readyDeleteIds.push(index);
      this.list.splice(index, 1);
    };
    this.reset = function () {
      this.initWaitModifyList(true);
    };
    this.confirmRename = function ($event) {
      if ($event) {
        if (13 === $event.charCode) {
          this.initRenameIndex();
        }
      } else {
        this.initRenameIndex();
      }
    };
    this.whetheModified = function () {
      for (var listIndex = 0; listIndex < this.list.length; listIndex++) {
        if (this.list[listIndex].name !== this.originalList[listIndex].name) {
          return true;
        }
        if (this.list[listIndex].id !== this.originalList[listIndex].id) {
          return true;
        }
      }
      return false;
    }

    $scope.$watch(function () {
      return product.list;
    }, function (value) {
      product.modified = product.whetheModified(); 
    }, true);

    this.initRenameIndex();
    this.initWaitModifyList();
  });
