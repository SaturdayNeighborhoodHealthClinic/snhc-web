'use strict';

angular.module('myApp.volunteers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/medstudents', {
    templateUrl: 'volunteers/medstudents.html',
    controller: 'VolunteersCtrl'
  });
  $routeProvider.when('/physicians', {
    templateUrl: 'volunteers/physicians.html',
    controller: 'VolunteersCtrl'
  });
  $routeProvider.when('/socialwork', {
    templateUrl: 'volunteers/socialwork.html',
    controller: 'VolunteersCtrl'
  });
  $routeProvider.when('/occupationaltherapy', {
    templateUrl: 'volunteers/occupationaltherapy.html',
    controller: 'VolunteersCtrl'
  });
}])

.controller('VolunteersCtrl', [function() {

}]);