'use strict';

/* Controllers */

angular.module('myApp.calcontrol', ['myApp.calService', 'firebase'])
  .value('fbURL', "https://blistering-fire-6953.firebaseio.com")
  .value('max_volunteers', { clinical : 3,
                             preclinical : 3,
                             attending : 1 })
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
  .controller('FirebaseCtrl', function($scope, $firebaseArray, $firebaseObject, fbRef, max_volunteers ){
    $scope.firebase_event = $firebaseArray(fbRef.child("events").child($scope.event.id));

    $scope.open = function(clinfilter) {
      if( clinfilter == "ALL" ){
        return true;
      }

      var volunteers = $scope.firebase_event.$getRecord(clinfilter);
      if( !volunteers ){
        // no volunteers for this event yet.
        return true;
      }

      var n_volunteers = 0;

      for( var volunteer in volunteers ){
        if(volunteer.charAt(0) != "$"){
          n_volunteers += 1;
        }
      }

      // use the max_volunteers value object to decide if this is an open event
      return ( n_volunteers < max_volunteers[clinfilter] );
    }

    $scope.volunteer = function(clinfilter){
      var new_user = {"bgunner" : true };

      console.log( $scope.firebase_event );

      $scope.firebase_event[clinfilter]=new_user;

      $scope.firebase_event.$save().then(function(ref) {
        console.log( firebase_event );
      })

      // if( !(clinfilter in $scope.firebase_event ) ){
      //   console.log( $firebaseObject(fbRef.child("events").child($scope.event.id)).$value );
      //   var clin_grps = $firebaseObject(fbRef.child("events").child($scope.event.id));

      //   // clin_grps.$value = { toString(clinfilter) : true };

      //   // clin_grps.$save().then(function(ref) {
      //   //   console.log( clin_grps.$value );
      //   // }, function(error) {
      //   //   console.log("Error:", error);
      //   // });
      // }
      // var volunteers = $firebaseObject(fbRef.child("events").child($scope.event.id));

      // if( !$scope.open(clinfilter) ){
      //   return;
      // } else if( clinfilter == "ALL" || clinfilter == "" ){
      //   alert("You must select a role before volunteering.");
      //   return;
      // }

      // if(!volunteers){        
      //   $scope.firebase_event.$add({ clinfilter : new_user }).then( function(ref) {
      //     var id = ref.key();
      //     console.log( "added id "+id );
      //     $scope.firebase_event.$save();
      //   }).catch(function(error) {
      //     alert("Authentication failed:", error);
      //   });
      // }
    }
  });
