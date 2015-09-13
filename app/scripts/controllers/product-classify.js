'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:ProductClassifyCtrl
 * @description
 * # ProductClassifyCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('ProductClassifyCtrl', function ($scope, Classify, lodash) {
    var productClassify = this;
    this.readyDeleteIds = [];
    this.list = [{
      id: 1,
      name: '蔬菜'
    }, {
      id: 2,
      name: '菠菜'
    }];

    this.initWaitModifyList = function (back) {
      if (back) {
        this.list = angular.copy(this.originalList);
      } else {
        this.originalList = angular.copy(this.list);
      }
      this.modified = true;
    };
    this.initRenameIndex = function () {
      this.renameIndex = -1;
    };
    this.rename = function (index) {
      this.renameIndex = index;
    };
    this.showRenameInput = function (index) {
      return index === this.renameIndex;
    };
    this.cancelRename = function ($index) {
      this.list[$index] = this.originalList[$index];
      this.initRenameIndex();
    };
    this.delete = function (index) {
      this.readyDeleteIds.push(index);
      this.list.splice(index, 1);
    };
    this.reset = function () {
      this.initWaitModifyList(true);
    };
    this.confirmRename = function (index, $event) {
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
      return productClassify.list[0].name;
    }, function (value) {
      productClassify.modified = productClassify.whetheModified(); 
    });

    this.initRenameIndex();
    this.initWaitModifyList();
  });
