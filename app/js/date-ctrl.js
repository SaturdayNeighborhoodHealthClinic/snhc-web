'use strict';

/* Controllers */

var dateController = angular.module('myApp.datelist', []);

myApp.controller('DateListCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('https://www.google.com/calendar/feeds/7eie7k06g255baksfshfhp0m28%40group.calendar.google.com/public/basic?orderby=starttime&sortorder=ascending&futureevents=true&alt=json&singleevents=true&max-results=30').success(function(data) {
    $scope.phones = data.feed.entry;
  });
}]);
