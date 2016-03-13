'use strict';

/**
 * @ngdoc overview
 * @name chainApp
 * @description
 * # chainApp
 *
 * Main module of the application.
 */
angular
  .module('chainApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'xeditable',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('main', {
      abstract: true,
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      ontrollerAs: 'main'
    })
    .state('main.overview', {
      url: '',
      templateUrl: 'views/overview.html'
    })
    .state('main.user', {
      url: 'user',
      templateUrl: 'views/user.html',
      controller: 'UserCtrl',
      controllerAs: 'user'
    })
    .state('main.public', {
      url: 'public',
      templateUrl: 'views/public.html',
      controller: 'PublicCtrl',
      controllerAs: 'public'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      ontrollerAs: 'login'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'SignupCtrl',
      ontrollerAs: 'signup'
    });

  })
  .run(function($rootScope, $state, AuthService, editableOptions) {

    //xeditable
    editableOptions.theme = 'bs3';

    //access management
    $rootScope.$on('$stateChangeStart', function(event,next) {

      if (!AuthService.isAuthenticated()) {
        if (next.name !== 'login' && next.name !== 'signup') {
          event.preventDefault();
          $state.go('login');
        }
      }
    });

  })
  .filter('ordinal', function() {
    var suffixes = ['th', 'st', 'nd', 'rd'];
    return function(number) {
      var remaining = number%100;

      return number + (suffixes[(remaining-20)%10]|| suffixes[remaining]|| suffixes[0]);
    };
  })
  .filter('daysFrom', function() {
    return function(date) {
      var d = new Date(date);
      var today = new Date();
      var result = Math.round(((today.getTime() - d.getTime()) / (1000*60*60*24)) % 7);

      return result + (result > 1 ? ' days' : ' day');
    };
  })
  .factory('AuthInterceptor', function ($rootScope, $q) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: 'not autorized',
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
