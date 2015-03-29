'use strict';

/* Controllers */

var calController = angular.module('myApp.calcontrol', []);

myApp.controller('CalCtrl', ['$scope', '$document', '$http', '$window', function($scope, $document, $http, $window) {

  var mykey = 'AIzaSyDllIaMvMrMYrTxHRTzR9R9Ze23-Cf8iRU'; // public-access API key
  var calendarid = '7eie7k06g255baksfshfhp0m28%40group.calendar.google.com'; // calendar id from Google

  $http({
    url: "https://www.googleapis.com/calendar/v3/calendars/" + calendarid+ '/events?key=' + mykey,
    method: "GET"
  }).success(function(data, status, headers, config) {

    $scope.data = data;

    $('#calendar').fullCalendar({
        // put your options and callbacks here
    })
  }).error(function(data, status, headers, config) {
    $scope.status = status;
    $window.alert("Whoops! We failed to contact Google Calendar. Response was "+status+". Sorry!");
  });

}]);