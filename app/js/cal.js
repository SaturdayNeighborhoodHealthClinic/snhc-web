'use strict';

/* Controllers */

angular.module('myApp.calcontrol', ['myApp.calService'])
  .controller('CalCtrl', function($scope, $document, $http, $window, google_key, calendar_id, getCal ) {
    getCal( $http, google_key, calendar_id )
      .success(function(data, status, headers, config) {

        var myFirebaseRef = new Firebase("https://blistering-fire-6953.firebaseio.com");

        $scope.data = data;

        var event_list = [];
        //TODO: limit the number of times this is done (currently list length is the default, whatever that is.)
        for ( var index in data.items ) {
          // data.times are "events" resources.
          // API doc: https://developers.google.com/google-apps/calendar/v3/reference/events#resource

          // This dictionary is interpreted by the FullCalendar module to render an appropriate calendar.
          // API doc: http://fullcalendar.io/docs/event_data/events_array/
          var event_properties = { title : data.items[index].summary,
                                   start : data.items[index].start.dateTime,
                                   end : data.items[index].end.dateTime,
                                   color : "purple",
                                   id : data.items[index].id
                                   // rendering : "background"
                                  };

          event_list.push( event_properties );
        }

        $('#calendar').fullCalendar({
          events: event_list,
          eventClick : function( calEvent, jsEvent, view ) {

            myFirebaseRef.child("volunteers").child(calEvent.id)
            myFirebaseRef.child("volunteers").set({
              "event_id" : calEvent.title
            });

            var clindate = new Date(calEvent.start);
            $window.alert( "You've signed up for " + calEvent.title + " on " + clindate );

          }
        })
      })
      .error(function(data, status, headers, config) {
        $scope.status = status;
        $window.alert("Whoops! We failed to contact the Google Calendar. Response was "+status+". Sorry!");
      });
  });