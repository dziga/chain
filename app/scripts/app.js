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
    'ngMockE2E',
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
  .run(function($httpBackend, editableOptions) {

    editableOptions.theme = 'bs3';

    var promisesSummary = [{name: 'Reading', startDate:'1457274480000', frequency: 'every day', duration:'1h', result: '10'},
    {name: 'Cleaning', startDate:'1457274480000', frequency: '2 times a week', duration:'15 mins', result: '2'}];

    var promisesCurrent = [{name: 'Reading', duration:'1h', done: false},
    {name: 'Cleaning', duration:'15 mins', done: true}];

    $httpBackend.whenGET('/promises/summary').respond(promisesSummary);
    $httpBackend.whenGET('/promises/current').respond(promisesCurrent);

    $httpBackend.whenPOST('/promises/current').respond(function(method, url, data) {
      return [200, promisesCurrent, {}];
    });

    $httpBackend.whenGET(/views\/.*/).passThrough();
    $httpBackend.whenPOST('http://localhost:8080/promises').passThrough();
    $httpBackend.whenGET('http://localhost:8080/promises').passThrough();
    $httpBackend.whenPUT(/promises\/.*/).passThrough();
    $httpBackend.whenGET('http://localhost:8080/promises/.*').passThrough();
    $httpBackend.whenGET('http://localhost:8080/promise/current').passThrough();


    //...

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
