'use strict';

angular.module('myApp.medstudents', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/medstudents', {
    templateUrl: 'medstudents/medstudents.html',
    controller: 'MedstudentsCtrl'
  });
}])

.controller('MedstudentsCtrl', [function() {

}]);