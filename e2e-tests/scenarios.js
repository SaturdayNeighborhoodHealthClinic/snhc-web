'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('snhc webapp', function() {
  var urls = { home : "/home",
               services : '/services',
               partners : '/partners' };

  describe('homepage', function() {
    it('should redirect index.html to '+urls.home, function() {
      browser.get('index.html');
      browser.getLocationAbsUrl().then(function(url) {
        expect(url).toBe(urls.home);
      });
    });

    it('should redirect empty hash fragment to '+urls.home, function() {
      browser.get('');
      browser.getLocationAbsUrl().then(function(url) {
        expect(url).toBe(urls.home);
      });
    });

    it('should redirect #/asdf to '+urls.home, function() {
      browser.get('#/asdf');
      browser.getLocationAbsUrl().then(function(url) {
        expect(url).toBe(urls.home);
      });
    });

    it('should show our masthead at the top', function() {
      browser.get('#'+urls.home);
      expect(element(by.css(".masthead h1")).getText()).toBe("The Saturday Neighborhood Health Clinic");
    });

  });

  describe( 'navbar', function() {
    it('should be present at '+urls.home+' and '+urls.partners, function() {
      browser.get('#'+urls.home);
      element.all(by.css(".navbar")).then( function(items) {
        expect(items.length).toBe(1);
      });
      browser.get('#'+urls.partners);
      element.all(by.css(".navbar")).then( function(items) {
        expect(items.length).toBe(1);
      });
    });

    it('dropdown-toggles should be clickable', function() {
      element.all(by.deepCss(".dropdown-toggle")).then( function(dropdowns) {
        expect(dropdowns.length).toBe(2);

        for( var i = 0; i < dropdowns.length; i++ ){
          expect(dropdowns[i]).toBeDefined();
          var EC = protractor.ExpectedConditions;
          expect(EC.elementToBeClickable(dropdowns[i])).toBeTruthy();
        }
      });
    });

  });

  describe('services page', function(){

    beforeEach(function(){
      browser.get('#'+urls.services);
    });

    it('should show "Services" in the header', function() {
      expect(element(by.css(".section-header h1")).getText()).toBe("Services");
    });

    it('should show five events in the upcoming events table', function() {
      element.all(by.repeater('event in data.items')).then(function(arr) {
        expect(arr.length).toEqual(5); // or whatever.
      });
    });
  });

  describe('community partners page', function() {
    beforeEach(function(){
      browser.get('#'+urls.partners);
    });

    it('should show "For our Community Partners" in the header', function() {
      expect(element(by.css(".section-header h1")).getText()).toBe("For our Community Partners");
    });

    it('should have a mailchip form', function() {
      element.all(by.deepCss("label")).then(function(arr) {
        expect(arr.length).toEqual(4);
      });
    });
  });
});
