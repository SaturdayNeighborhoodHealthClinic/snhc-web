'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.routing',
  'myApp.datelist',
  'myApp.calcontrol',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);

angular.module( 'myApp.calService', [] )
  // this public-access API key is owned by Justin Porter at https://console.developers.google.com/project/810603352299
  .value('google_key', 'AIzaSyDllIaMvMrMYrTxHRTzR9R9Ze23-Cf8iRU' )
  .value('calendar_id', '7eie7k06g255baksfshfhp0m28%40group.calendar.google.com' )
  .value('getCal',
    // This is the "events list" API call. 
    // https://developers.google.com/google-apps/calendar/v3/reference/events/list
    function( $http, google_key, calendar_id ){
      return $http({
        url: "https://www.googleapis.com/calendar/v3/calendars/" + calendar_id + '/events',
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
  .value('fb_ref', "https://blistering-fire-6953.firebaseio.com")