'use strict';

/* Controllers */

var dateController = angular.module('myApp.datelist', []);

myApp.controller('DateListCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('https://www.google.com/calendar/feeds/7eie7k06g255baksfshfhp0m28%40group.calendar.google.com/public/basic?orderby=starttime&sortorder=ascending&futureevents=true&alt=json&singleevents=true&max-results=30').success(function(data) {
    $scope.phones = data.feed.entry;
  });
}]);

myApp.filter('unmangle', function() {
  return function(input) {
    input = input || '';
    // Just hack this and hope to God google never changes this API. When they do, maybe
    // they'll provide better access to this info?
    var nbsp = input.indexOf("&nbsp");
    var begin = 5;
    var rawdate = input.slice(begin,nbsp);
    var splitdate = rawdate.split(" ")
    if (splitdate.length = 11) {
        var firstpart = splitdate.splice(0,6)
        var lastpart = splitdate.splice(4,1)
    }
    return firstpart.concat(lastpart).join(" ")
  };
})

  
