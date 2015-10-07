'use strict';

/**
 * @ngdoc service
 * @name purchaseManageFrontendApp.common/confirm
 * @description
 * # common/confirm
 * Service in the purchaseManageFrontendApp.
 */
angular.module('purchaseManageFrontendApp')
  .service('commonConfirmService', function ($modal) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = this;
    self.confirm = function (message, cb) {
      var modalInstance = $modal.open({
        templateUrl: 'views/confirm-modal.html',
        controller: 'ConfirmModalCtrl',
        resolve: {
          message: function () {
            return message;
          }
        }
      });
      modalInstance.result.then(cb);
    };
    return self;
  });
