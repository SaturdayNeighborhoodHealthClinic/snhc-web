'use strict';

/* Controllers */

angular.module('myApp.calcontrol', ['myApp.calService'])
  .controller('CalCtrl', function($scope, $document, $http, $window, google_key, calendar_id, getCal ) {
    getCal( $scope, $http, $window, google_key, calendar_id )
      .success(function(data, status, headers, config) {

        $scope.data = data;

        var event_list = [];
        for ( var index in data.items ) {
          event_list.push({ start : data.items[index].start.dateTime,
                             end : data.items[index].end.dateTime,
                             // rendering : "background"
                          });
        }

        $('#calendar').fullCalendar({
          events: event_list
        })
      })
      .error(function(data, status, headers, config) {
        $scope.status = status;
        $window.alert("Whoops! We failed to contact the Google Calendar. Response was "+status+". Sorry!");
      });
  });