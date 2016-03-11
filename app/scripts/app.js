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
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'xeditable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location, AuthService, editableOptions) {

    //xeditable
    editableOptions.theme = 'bs3';

    //access management
    $rootScope.$on("$routeChangeStart", function(event, next, current) {

      if (!AuthService.isAuthenticated()) {
        if (next.templateUrl !== 'views/login.html' && next.templateUrl !== 'views/signup.html') {
          event.preventDefault();
          $location.path("/login");
        }
      }
    });

  })
  .filter('ordinal', function($filter) {
    var suffixes = ["th", "st", "nd", "rd"];
    return function(number) {
      var remaining = number%100;

      return number + (suffixes[(remaining-20)%10]|| suffixes[remaining]|| suffixes[0]);
    };
  })
  .filter('daysFrom', function($filter) {
    return function(date) {
      var d = new Date(date);
      var today = new Date();
      var result = Math.round(((today.getTime() - d.getTime()) / (1000*60*60*24)) % 7);

      return result + (result > 1 ? " days" : " day");
    };
  })
  .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: "not autorized",
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
