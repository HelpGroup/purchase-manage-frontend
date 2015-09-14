'use strict';

/**
 * @ngdoc overview
 * @name purchaseManageFrontendApp
 * @description
 * # purchaseManageFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('purchaseManageFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restmod',
    'ui.bootstrap',
    'ngLodash',
    'angularMoment'
  ])
  .run(function ($rootScope, alertService, routeService) {
    // 顶部所有的弹框
    $rootScope.alertService = alertService;
    routeService.init();
  })
  .config(function ($routeProvider, restmodProvider, config) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when(config.path.CREATE_USER, {
        templateUrl: 'views/user/create.html',
        controller: 'UserCreateCtrl',
        controllerAs: 'userCreate'
      })
      .when('/user/list', {
        templateUrl: 'views/user/list.html',
        controller: 'UserListCtrl',
        controllerAs: 'userList'
      })
      .when('/user/modify', {
        templateUrl: 'views/user/modify.html',
        controller: 'UserModifyCtrl',
        controllerAs: 'userModify'
      })
      .when('/product-classify', {
        templateUrl: 'views/product-classify.html',
        controller: 'ProductClassifyCtrl',
        controllerAs: 'productClassify'
      })
      .when('/product-classify/:id/product', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'product'
      })
      .otherwise({
        redirectTo: '/'
      });
    // 对于通用的请求返回字段做相对应的处理, 假如返回403, 则表示没有登录; 假如是404, 这表示没有找到url
    restmodProvider.rebase('handleCommonResponseStatus');
  });
