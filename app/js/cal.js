'use strict';

/* Controllers */

angular.module('myApp.calcontrol', ['myApp.calService'])
  .controller('CalCtrl', function($scope, $document, $http, $window, google_key, calendar_id, getCal ) {
    getCal( $http, google_key, calendar_id )
      .success(function(data, status, headers, config) {

        $scope.data = data;

        var event_list = [];
        for ( var index in data.items ) {
          // data.times are "events" resources.
          // API doc: https://developers.google.com/google-apps/calendar/v3/reference/events#resource

          // This dictionary is interpreted by the FullCalendar module to render an appropriate calendar.
          // API doc: http://fullcalendar.io/docs/event_data/events_array/
          event_list.push({ 
            title : data.items[index].summary,
            start : data.items[index].start.dateTime,
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