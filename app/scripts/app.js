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
    'ngSanitize',
    'ngTouch',
    'restmod',
    'ui.bootstrap',
    'ngLodash',
    'angularMoment',
    'ui.router',
    'validation'
  ])
  .run(function ($rootScope, $state, $location, authorization, alertService, routeService) {
    // authorization.init('development', 1); // 管理员
    // authorization.init('development', 2); // 普通门店

    // 顶部所有的弹框服务
    $rootScope.alertService = alertService;
    $rootScope.authorization = authorization;
    routeService.init();
    $rootScope.$state = $state;
    $rootScope.$location = $location;
  })
  .config(function ($urlRouterProvider, $stateProvider, $validationProvider, restmodProvider, config) {
    var expression = config.expression; 
    var defaultMsg = config.defaultMsg;
    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);

    $urlRouterProvider
      .otherwise('/login');
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('user', {
        abstract: true,
        url: '/user',
        templateUrl: 'views/user/index.html'
      })
      .state('user.create', {
        url: '/create',
        templateUrl: 'views/user/create.html',
        controller: 'UserCreateCtrl',
        controllerAs: 'userCreate'
      })
      .state('user.list', {
        url: '/list',
        templateUrl: 'views/user/list.html',
        controller: 'UserListCtrl',
        controllerAs: 'userList'
      })
      .state('user.modifyPassword', {
        url: '/{userId:[0-9]+}/modifyPassword?successPath&username',
        templateUrl: 'views/user/modifyPassword.html',
        controller: 'UserModifyCtrl',
        controllerAs: 'userModify'
      })
      .state('classify', {
        abstract: true,
        url: '/classify',
        templateUrl: 'views/classify/index.html'
      })
      .state('classify.list', {
        url: '', 
        templateUrl: 'views/classify/list.html',
        controller: 'ProductClassifyCtrl',
        controllerAs: 'productClassify'
      })
      .state('classify.product', {
        url: '/{classifyId:[0-9]+}/product?classifyName',
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'product'
      })
      .state('purchase', {
        abstract: true,
        url: '/purchase',
        templateUrl: 'views/purchase/index.html',
        controller: 'PurchaseIndexCtrl',
        controllerAs: 'purchaseIndex'
      })
      .state('purchase.quantity', {
        url: '/quantity',
        templateUrl: 'views/purchase/quantity.html',
        controller: 'ProductQuantityCtrl',
        controllerAs: 'productQuantity'
      })
      .state('purchase.stat', {
        url: '/stat',
        templateUrl: 'views/product-stat.html',
        controller: 'ProductStatCtrl',
        controllerAs: 'productStat'
      })
      .state('purchase.actually', {
        url: '/actually',
        templateUrl: 'views/product-actually-buy.html',
        controller: 'ProductActuallyBuyCtrl',
        controllerAs: 'productActuallyBuy'
      })
    // 对于通用的请求返回字段做相对应的处理, 假如返回403, 则表示没有登录; 假如是404, 这表示没有找到url
    restmodProvider.rebase('handleCommonResponseStatus');
  });
