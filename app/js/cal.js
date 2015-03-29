'use strict';

/* Controllers */

var calController = angular.module('myApp.calcontrol', []);

myApp.controller('CalCtrl', ['$scope', '$document', function($scope, $document) {

  $(document).ready(function() {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
        // put your options and callbacks here
    })

  })

}]);