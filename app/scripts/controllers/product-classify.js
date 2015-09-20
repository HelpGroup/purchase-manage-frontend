'use strict';

/**
 * @ngdoc function
 * @name purchaseManageFrontendApp.controller:ProductClassifyCtrl
 * @description
 * # ProductClassifyCtrl
 * Controller of the purchaseManageFrontendApp
 */
angular.module('purchaseManageFrontendApp')
  .controller('ProductClassifyCtrl', function ($scope, $state, Classify, alertService, lodash) {
    var productClassify = this;
    this.readyDeleteIds = [];
    this.list = [];
    this.renameIndex = -1;

    this.initWaitModifyList = function (back) {
      if (back) {
        this.list = lodash.cloneDeep(this.originalList);
      } else {
        this.originalList = lodash.cloneDeep(this.list);
      }
      this.modified = true;
    };
    this.initRenameIndex = function (index) {
      if (null != index) {
        this.renameIndex = index;
      } else {
        this.renameIndex = -1;
      } 
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
      if (null == productClassify.originalList) {
        return false;
      }
      if (productClassify.list.length !== productClassify.originalList.length) {
        return true; 
      }
      var foundNotEqualClassify = lodash.find(productClassify.list, function (classify) {
        var foundOriginalClassify = lodash.findWhere(productClassify.originalList, {
          id: classify.id,
          name: classify.name
        }); 
        if(null == foundOriginalClassify) {
          return true;
        } else {
          return false;
        };
      });
      if (foundNotEqualClassify) {
        return true;
      } else {
        return false;
      }
    }
    productClassify.getModifiedClass = function () {
      return lodash.filter(productClassify.list, function (classify) {
        var foundOriginalClassify = lodash.findWhere(productClassify.originalList, {
          id: classify.id
        });
        if (foundOriginalClassify) {
          return foundOriginalClassify.name !== classify.name;
        } else {
          return false;
        }
      });
    };

    productClassify.getNewClassify = function () {
      return lodash.filter(productClassify.list, function (classify) {
        var foundOriginalClassify = lodash.findWhere(productClassify.originalList, {
          id: classify.id
        });

        if (null == foundOriginalClassify) {
          return true; 
        } else {
          return false;
        };
      });
    };

    productClassify.getDeletedClassifies = function () {
      return lodash.filter(productClassify.originalList, function (originalClassify) {
        var foundClassify = lodash.findWhere(productClassify.list, {
          id: originalClassify.id
        });

        if (null == foundClassify) {
          return true; 
        } else {
          return false;
        };
      });
    };
    this.initList = function () {
      Classify.$search().$then(function (list) {
        productClassify.list = list;
        productClassify.initWaitModifyList();
      });     
    };
    var errFun = function (err, callback) {
      
    };
    productClassify.commitEdit = function () {
      productClassify.initRenameIndex();
      var modifiedClassifies = productClassify.getModifiedClass();
      var newClassifies = productClassify.getNewClassify();
      var deletedClassifies = productClassify.getDeletedClassifies();
      async.series({
        deleting: function (callback) {
          async.each(deletedClassifies, function (deletedClassify, deleteCallback) {
            Classify.$new(deletedClassify.id).$destroy().$then(function () {
              deleteCallback();
            }, function (err) {
              deleteCallback(err);
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
          async.each(modifiedClassifies, function (modifiedClassify, modifyCallback) {
            modifiedClassify.$save(['name']).$then(function () {
              modifyCallback();
            }, function (err) {
              modifyCallback(err);
            });
          }, function (err) {
            if (err) {
              callback(err); 
            } else {
              callback();
            }
          });
        },
        creat: function (callback) {
          async.each(newClassifies, function (newClassify, newCallback) {
            Classify.$create(newClassify).$then(function () {
              newCallback();
            }, function (err) {
              newCallback(err);
            });
          }, function (err) {
            if (err) {
              callback(err); 
            } else {
              callback();
            }
          });
        }
      }, function (err) {
        if (err) {
          alertService.alert({
            msg: '修改失败'
          });
        } else {
          alertService.alert({
            msg: '修改成功'
          });
          $state.reload();
        }
      });
    };
    productClassify.create = function () {
      var newClass = Classify.$build({
        name: ''
      });
      productClassify.list.push(newClass);
      this.initRenameIndex(productClassify.list.length - 1);
    };

    $scope.$watch(function () {
      return productClassify.list;
    }, function (value) {
      productClassify.modified = productClassify.whetheModified(); 
    }, true);

    this.initRenameIndex();
    this.initList()
  });
