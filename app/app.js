'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.routing',
  'myApp.datelist',
  'myApp.mailchimp',
  'ui.bootstrap',
  'mailchimp'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
