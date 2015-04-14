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

    it('should query Google Calendar at the appropriate URL', function(){
      httpBackend.whenGET(calendar_url).respond();
      cal_http.success(function(data, status, headers, config){
        expect(data).toBe(query_data);
      });
    });
  });
});