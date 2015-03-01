'use strict';

/* Controllers */

var dateController = angular.module('myApp.datelist', []);

myApp.controller('DateListCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('cal.json').success(function(data) {
    $scope.phones = data.feed.entry;
  });
}]);
