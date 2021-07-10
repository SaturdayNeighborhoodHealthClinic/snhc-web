'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.routing',
  'myApp.datelist',
  'myApp.volunteer',
  'ui.bootstrap',
  'mailchimp'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);

angular.module( 'myApp.calService', [] )
  // this public-access API key is owned by Justin Porter at https://console.developers.google.com/project/810603352299
  .value('google_key', 'AIzaSyDllIaMvMrMYrTxHRTzR9R9Ze23-Cf8iRU' )
  .value('calendar_id', '7eie7k06g255baksfshfhp0m28%40group.calendar.google.com' )
  .factory('calendar_url', function(calendar_id){
    var str = ["https://www.googleapis.com/calendar/v3/calendars", calendar_id, "events"].join("/");
    return str;
  })
  .factory('cal_http',
    // This is the "events list" API call. 
    // https://developers.google.com/google-apps/calendar/v3/reference/events/list
    function( $http, google_key, calendar_url ){
      return $http({
        url: calendar_url,
        method: "GET",
        params: { key : google_key,
                  // display repeating events as individual events
                  "singleEvents" : true,
                  // the earliest time to display; don't load anything that's already happened.
                  "timeMin" : new Date(),
                  // default is to dump events in an arbitrary (but stable) order; we want them ordered by start time.
                  "orderBy" : "startTime"  }
      });
  })
  .factory('cal_events', function($window, cal_http) {
    var cal_events = [];

    cal_http
      .success(function(data, status, headers, config) {
        for ( var index in data.items ) {
          // data.times are "events" resources.
          // API doc: https://developers.google.com/google-apps/calendar/v3/reference/events#resource
          var event_properties = { title : data.items[index].summary,
                                   start : data.items[index].start.dateTime,
                                   end : data.items[index].end.dateTime,
                                   id : data.items[index].id
                                  };
          cal_events.push( event_properties );
        }
      })
      .error(function(data, status, headers, config) {
        $window.alert("Whoops! We failed to contact the Google Calendar. Response was "+status+". Sorry!");
      });

    return cal_events;
  });