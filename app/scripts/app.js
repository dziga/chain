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
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function(editableOptions) {
    editableOptions.theme = 'bs3';
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
  });
