'use strict';

angular.module('myApp.routing', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/medstudents', {
    templateUrl: 'volunteers/medstudents.html',
    controller: 'RoutingCtrl'
  });
  $routeProvider.when('/physicians', {
    templateUrl: 'volunteers/physicians.html',
    controller: 'RoutingCtrl'
  });
  $routeProvider.when('/socialwork', {
    templateUrl: 'volunteers/socialwork.html',
    controller: 'RoutingCtrl'
  });
  $routeProvider.when('/occupationaltherapy', {
    templateUrl: 'volunteers/occupationaltherapy.html',
    controller: 'RoutingCtrl'
  });
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'RoutingCtrl'
  });
  $routeProvider.when('/about', {
    templateUrl: 'about/services.html',
    controller: 'RoutingCtrl'
  });
  $routeProvider.when('/contact', {
    templateUrl: 'about/contact.html',
    controller: 'RoutingCtrl'
  });
  $routeProvider.when('/legal', {
    templateUrl: 'about/legal.html',
    controller: 'RoutingCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/home'});
}])

.controller('RoutingCtrl', [function() {
}]);