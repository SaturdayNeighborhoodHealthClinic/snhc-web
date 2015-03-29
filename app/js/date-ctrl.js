'use strict';

/* Controllers */

var dateController = angular.module('myApp.datelist', []);

myApp.controller('DateListCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

  var google_key = 'AIzaSyDllIaMvMrMYrTxHRTzR9R9Ze23-Cf8iRU'; // public-access API key
  var calendarid = '7eie7k06g255baksfshfhp0m28%40group.calendar.google.com'; // calendar id from Google

  $http({
    url: "https://www.googleapis.com/calendar/v3/calendars/" + calendarid+ '/events',
    method: "GET",
    params: { key : google_key,
              "singleEvents" : true,
              "timeMin" : new Date(),
              "orderBy" : "startTime"  }
  }).success(function(data, status, headers, config) {

    $scope.data = data;

  }).error(function(data, status, headers, config) {
    $scope.status = status;
    $window.alert("Whoops! We failed to contact the Google Calendar. Response was "+status+". Sorry!");
  });
}]);

myApp.filter('unmangle', function() {
  return function(input) {
    input = input || '';
    // Just hack this and hope to God google never changes this API. When they do, maybe
    // they'll provide better access to this info?
    var nbsp = input.indexOf("&nbsp");
    var begin = 5;
    return input.slice(begin,nbsp);
  };
})

  