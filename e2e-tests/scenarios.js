'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {
  var homeUrl = "/home";

  describe('page routing', function() {
    it('should redirect index.html to '+homeUrl, function() {
      browser.get('index.html');
      browser.getLocationAbsUrl().then(function(url) {
          expect(url.split('#')[1]).toBe(homeUrl);
        });
    });

    it('should redirect empty hash fragment to '+homeUrl, function() {
      browser.get('');
      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe(homeUrl);
      });
    })

    it('should redirect #/asdf to '+homeUrl, function() {
      browser.get('#/asdf');
      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe(homeUrl);
      });
    })
  });
});
