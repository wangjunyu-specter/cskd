// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ngCordova','ionic', 'starter.controllers', 'starter.services','starter.directives'])

  .run(function ($ionicPlatform, $rootScope, $location, $timeout, $ionicHistory, $cordovaToast,$http,locals) {
    $ionicPlatform.ready(function ($rootScope) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      console.log("-----------------------1");
    });
    //
    if(locals.get('name','') && locals.get('pwd','')) {
      $location.path('/main/content/')
    }
    //双击退出
    $ionicPlatform.registerBackButtonAction(function (e) {
      //判断处于哪个页面时双击退出
      if ($location.path() == '/main/content') {
        if ($rootScope.backButtonPressedOnceToExit) {
          ionic.Platform.exitApp();
        } else {
          $rootScope.backButtonPressedOnceToExit = true;
          $cordovaToast.showShortBottom('再按一次退出城市快道');
          setTimeout(function () {
            $rootScope.backButtonPressedOnceToExit = false;
          }, 2000);
        }
        console.log("-----------------------2");
      }
      else if ($ionicHistory.backView()) {
        console.log("-----------------------3");
        $ionicHistory.goBack();

      } else {
        $rootScope.backButtonPressedOnceToExit = true;
        $cordovaToast.showShortBottom('再按一次退出系统');
        setTimeout(function () {
          $rootScope.backButtonPressedOnceToExit = false;
        }, 2000);
        console.log("-----------------------4");
      }
      e.preventDefault();
      return false;
    }, 101);
  })

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('login', {
      url:'/login',
      templateUrl: 'templates/login.html',
      controller: 'login'
    })
    .state('forget', {
      url:'/forget',
      templateUrl: 'templates/forget.html',
      controller: 'forget'
    })
    .state('zhuce', {
      url:'/zhuce',
      templateUrl:'templates/zhuce.html',
      controller: 'register'
    })
    .state('main', {
      url:'/main',
      templateUrl:'templates/main.html',
      controller:'main'
    })

  // Each tab has its own nav history stack:
    .state('main.content',{
      url:'/content/:chatId',
      cache:'false',
      views:{
        'main-content': {
          templateUrl:'templates/content.html',
          controller:'content'
        }
      }
    })
    .state('main.shuru',{
      url:'/shuru/:chatId',
      views:{
        'main-content':{
          templateUrl:'templates/shuru.html',
          controller:'shuru'
        }
      }
    })
    .state('main.ordersuccess',{
      url:'/ordersuccess/:chatId',
      views:{
        'main-content':{
          templateUrl:'templates/ordersuccess.html',
          controller:'ordersuccess'
        }
      }
    })
    .state('main.end',{
      url:'/end/:chatI',
      views:{
        'main-content':{
          templateUrl:'templates/end.html',
          controller:'end'
        }
      }
    })
    .state('main.history',{
      url:'/history',
      views:{
        'main-content':{
          templateUrl:'templates/history.html',
          controller:'history'
        }
      }
    })
    .state('main.modify',{
      url:'/modify',
      views:{
        'main-content':{
          templateUrl:'templates/modify.html',
          controller:'modify'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
