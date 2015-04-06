'use strict';

/* Controllers */

angular.module('myApp.calcontrol', ['myApp.calService', 'firebase'])
  .value('fbURL', "https://blistering-fire-6953.firebaseio.com")
  .service('fbRef', function(fbURL) {
    return new Firebase(fbURL)
  })
  .service('fbo', function( $firebaseObject, fbRef ) {
    return $firebaseObject(fbRef.child("events"));
  })
  .controller('CalCtrl', function($scope, $window, cal_http ) {
    cal_http
    .success(function(data, status, headers, config) {
      $scope.cal_events = [];
      for ( var index in data.items ) {
        // data.times are "events" resources.
        // API doc: https://developers.google.com/google-apps/calendar/v3/reference/events#resource

        // This dictionary is interpreted by the FullCalendar module to render an appropriate calendar.
        // API doc: http://fullcalendar.io/docs/event_data/events_array/
        var event_properties = { title : data.items[index].summary,
                                 start : data.items[index].start.dateTime,
                                 end : data.items[index].end.dateTime,
                                 id : data.items[index].id
                                };
        $scope.cal_events.push( event_properties );
      }
    })
    .error(function(data, status, headers, config) {
      $window.alert("Whoops! We failed to contact the Google Calendar. Response was "+status+". Sorry!");
    });
  })
  .controller('FirebaseCtrl', function($scope, $firebaseArray, fbRef ){
    $scope.firebase_event = $firebaseArray(fbRef.child("events").child($scope.event.id));

    $scope.open = function( clinfilter ) {
      return (clinfilter == "preclinical");
    }

    $scope.volunteer = function(){
      $scope.firebase_event.$loaded().then(function() {
        alert("I don't do anything yet!");
        // console.log( firebase_event.$getRecord('preclinical'));
        // console.log( firebase_event.$getRecord('preclinical')[3]);
      }).catch(function(error) {
        alert('Error!');
      });
    }
  });
