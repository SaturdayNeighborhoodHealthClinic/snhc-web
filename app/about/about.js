'use strict';

angular.module('myApp.about', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: 'about/services.html',
    controller: 'AboutCtrl'
  });
  $routeProvider.when('/contact', {
    templateUrl: 'about/contact.html',
    controller: 'AboutCtrl'
  });
}])

.controller('AboutCtrl', [function() {

}]);