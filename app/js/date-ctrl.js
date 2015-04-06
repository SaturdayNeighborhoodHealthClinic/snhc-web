'use strict';

angular.module('myApp.datelist', ['myApp.calService'])
  .controller('DateListCtrl', function($scope, $http, $window, cal_http ) {
    cal_http
      .success(function(data, status, headers, config) {
        $scope.data = data;
      })
      .error(function(data, status, headers, config) {
        $window.alert("Whoops! We failed to contact the Google Calendar. Response was "+status+". Sorry!");
      });
  });