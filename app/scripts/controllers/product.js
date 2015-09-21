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
  .controller('ProductCtrl', function ($state, $scope, $location, alertService, Classify, lodash) {
    var statParams = $state.params;
    var product = this;
    product.createList = []; // 操作过程中创建的数组
    product.deleteList = []; // 操作过程中删除的数组
    product.list = [];
    product.classifyName = $state.params.classifyName;
    var Ingredient = Classify.$new(statParams.classifyId).ingredient;

    product.getEditedList = function () {
      return lodash.filter(product.list, function (item) {
        var foundOriginalProduct = lodash.findWhere(product.originalList, {
          id: item.id
        });
        if (foundOriginalProduct) {
          return foundOriginalProduct.name !== item.name || foundOriginalProduct.unit !== item.unit;
        } else {
          return false;
        }
      });
    };
    product.commitEdit = function () {
      product.editedList = product.getEditedList();
      // TODO 不并发发送
      async.series({
        "delete": function (callback) {
          async.each(product.deleteList, function (deleted, deleteCallback) {
            deleted.$destroy().$then(function () {
              deleteCallback();
            }, function (err) {
              deleteCallback(err.$response.data.message);
            });
          }, function (err) {
            if (err) {
              callback(err);
            } else {
              callback();
            }
          });
        },
        modify: function (callback) {
          async.each(product.editedList, function (edited, editedCallback) {
            edited.$save(['name', 'unit']).$then(function () {
              editedCallback();
            }, function (err) {
              editedCallback(err.$response.data.message);
            });
          }, function (err) {
            if (err) {
              callback(err);
            } else {
              callback();
            }
          });
        },
        create: function (callback) {
          async.each(product.createList, function (create, createCallback) {
            Ingredient.$create(create).$then(function () {
              createCallback();
            }, function (err) {
              createCallback(err.$response.data.message);
            });
          }, function (err) {
            if (err) {
              callback(err);
            } else {
              callback();
            }
          });
        },
      }, function (err) {
        if (err) {
          alertService.alert({
            msg: err,
            type: 'danger'
          });
        } else {
          alertService.alert({
            msg: '修改成功'
          });
          product.initList();
        }
      });
    };
    product.create = function () {
      var newProduct = {
        name: ''
      };
      product.createList.push(newProduct);
      product.list.push(newProduct);
      product.initRenameIndex(product.list.length - 1, 'name');
    };

    product.initList = function () {
      Ingredient.$search().$then(function (list) {
        product.list = list;
        product.initWaitModifyList();
      });
      product.deleteList = [];
      product.createList = [];
    };

    product.initWaitModifyList = function (back) {
      if (back) {
        product.list = angular.copy(product.originalList);
      } else {
        product.originalList = angular.copy(product.list);
      }
      product.modified = false;
    };

    product.initRenameIndex = function (index, type) {
      if (null != index) {
        if (null == product.renameIndex) {
          product.renameIndex = {};
        }
        product.renameIndex.index = index;
        product.renameIndex.type = type;
      } else {
        product.renameIndex = null;
      }
    };
    product.rename = function (index, type) {
      product.renameIndex = product.renameIndex || {};
      product.renameIndex.index = index;
      product.renameIndex.type = type;
    };
    product.showRenameInput = function (index, type) {
      if (product.renameIndex === null) {
        return false;
      }
      return index === product.renameIndex.index && type === product.renameIndex.type;
    };
    product.cancelRename = function ($index, type) {
      product.list[$index][type] = product.originalList[$index][type];
      product.initRenameIndex();
    };
    product.delete = function (item, index) {
      if (null != item.id) {
        product.deleteList.push(item);
      }
      product.list.splice(index, 1);
    };
    product.reset = function () {
      product.initWaitModifyList(true);
    };
    product.confirmRename = function ($event) {
      if ($event) {
        if (13 === $event.charCode) {
          product.initRenameIndex();
        }
      } else {
        product.initRenameIndex();
      }
    };
    product.whetheModified = function () {
      if (product.deleteList.length > 0) {
        return true;
      }
      if (product.createList.length > 0) {
        return true;
      }
      if (product.getEditedList().length > 0) {
        return true;
      }
      return false;
    }

    $scope.$watch(function () {
      return product.list;
    }, function (value) {
      product.modified = product.whetheModified(); 
    }, true);

    product.initRenameIndex();
    product.initList();
  });
