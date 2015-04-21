'use strict';

describe('myApp', function() {
  describe('calService', function() {
    var cal_http, httpBackend, calendar_url, query_data;

    beforeEach(module('myApp.calService'));

    beforeEach(inject( function($httpBackend, _calendar_url_, _cal_http_) {
      cal_http = _cal_http_;
      httpBackend = $httpBackend;
      calendar_url = _calendar_url_;
      query_data = "success";
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should produce the correct Google Calendar url', function() {
      expect(calendar_url).toBe(
        "https://www.googleapis.com/calendar/v3/calendars/7eie7k06g255baksfshfhp0m28%40group.calendar.google.com/events");
    });

    it('should query Google Calendar at the appropriate URL', function(){
      // If we're querying the incorrect url, we'll get a timeout. Probably?
      var get_url = httpBackend.whenGET(calendar_url).url;
    });

  });
});