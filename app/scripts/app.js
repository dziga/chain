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
    'ui.bootstrap'
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
  .run(function($httpBackend) {

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

  });
