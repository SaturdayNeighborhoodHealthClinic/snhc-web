'use strict';

angular.module('myApp.datelist', ['myApp.calService'])
  .controller('DateListCtrl', function($scope, $http, $window, getCal, google_key, calendar_id ) {

    $window.alert( calendar_id );

    getCal( $scope, $http, $window, google_key, calendar_id )
      .success(function(data, status, headers, config) {
        $scope.data = data;
      })
      .error(function(data, status, headers, config) {
        $window.alert("Whoops! We failed to contact the Google Calendar. Response was "+status+". Sorry!");
      });
  });