'user strict';
angular.module('purchaseManageFrontendApp').service('userBaseService', function () {
  this.isAdmin = function (user) {
    return user.roleId === 1; 
  };
  return this;
});
