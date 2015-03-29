'use strict';

/* Controllers */

var calController = angular.module('myApp.calcontrol', []);

myApp.controller('CalCtrl', ['$scope', '$document', '$http', '$window', function($scope, $document, $http, $window) {

  // this public-access API key is owned by Justin Porter at https://console.developers.google.com/project/810603352299
  var google_key = 'AIzaSyDllIaMvMrMYrTxHRTzR9R9Ze23-Cf8iRU'; // public-access API key
  var calendarid = '7eie7k06g255baksfshfhp0m28%40group.calendar.google.com'; // calendar id from Google

  $http({
    url: "https://www.googleapis.com/calendar/v3/calendars/" + calendarid+ '/events',
    method: "GET",
    params: { key : google_key,
              "singleEvents" : true }
  }).success(function(data, status, headers, config) {

    $scope.data = data;

    var event_list = [];
    for ( var index in data.items ) {
      event_list.push( { start : data.items[index].start.dateTime,
                         end : data.items[index].end.dateTime,
                         // rendering : "background"
                       });
    }

    $('#calendar').fullCalendar({
      events: event_list
    })
  }).error(function(data, status, headers, config) {
    $scope.status = status;
    $window.alert("Whoops! We failed to contact the Google Calendar. Response was "+status+". Sorry!");
  });

}]);