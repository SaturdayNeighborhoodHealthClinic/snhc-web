'use strict';

/* Controllers */

angular.module('myApp.calcontrol', ['myApp.calService', 'firebase'])
  .value('fbURL', "https://blistering-fire-6953.firebaseio.com")
  .service('fbRef', function(fbURL) {
    return new Firebase(fbURL)
  })
  .controller('CalCtrl', function($scope, $window, $firebaseObject, fbRef, cal_http ) {

    cal_http
    .success(function(data, status, headers, config) {
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
                                // rendering : background"
                                };
      }
      $scope.events = event_list;
    })
    .error(function(data, status, headers, config) {
      $window.alert("Whoops! We failed to contact the Google Calendar. Response was "+status+". Sorry!");
    });

    // download the data into a local object
    // var syncObject = $firebaseObject(fbRef);

    // synchronize the object with a three-way data binding
    // syncObject.$bindTo($scope, "data");
  });