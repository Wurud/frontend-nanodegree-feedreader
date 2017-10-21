/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

  //Test Suite: RSS Feeds
  describe('RSS Feeds', function() {

    //Description: to make sure that the allFeeds variable has been defined and that it is not empty.
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    //Description: to loop through each feed in the allFeeds object and ensures it has a URL defined and not empty.
    it('url defined and not empty', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).not.toEqual('');
      }

    });

    //Description: to loop through each feed in the allFeeds object and ensures it has a name defined and not empty.
    it('name defined and not empty', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toEqual('');
      }

    });
  });

  // Get the Icon element by the class name.

  //Test Suite: The menu
  describe('The menu', function() {

    var icon = document.querySelector('.menu-icon-link');
    var body;

    //Description: to ensures the menu element is hidden by default.
    it('Is hidden by defult', function() {
      body = $('body').hasClass("menu-hidden");
      expect(body).toBe(true);
    });

    /* Description: ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * /clicked and does it hide when clicked again.
     */
    it('display when it is clicked', function() {

      body = $('body').hasClass("menu-hidden");
      //Description: to ensue the menu is hidden by defult
      expect(body).toBe(true);

      //Description: to ensue the menu is displayed after one click
      icon.click();
      expect(body).toBe(false);

      icon.click();
      expect(body).toBe(true);
    });

  });

  //Test Suite: Initial Entries
  describe('Initial Entries', function() {

    var rows;
    //Description: ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
    //To load data before start testing.
    beforeEach(function(done) {
      loadFeed(0, function() {
        //Test if .feed .entry have a one row at least.
        rows = $('.feed .entry').length;
        done();
      });
    });

    it('it has at a onle element in the .entry within .feed container', function() {
      expect(rows).not.toEqual(0);
    });
  });


  //Test Suite: New Feed Selection
  describe('New Feed Selection', function() {

    var rowOne, rowTwo;

    //Description: to ensures when a new feed is loaded by the loadFeed function that the content actually changes.
    beforeEach(function(done) {
      loadFeed(0, function() {
        rowOne = document.querySelector('.feed').innerHTML;
        done();
      });

    });

    it('it will ensure the feed is loaded and updated', function() {
      // Get the second row content
      loadFeed(1, function() {

        rowTwo = document.querySelector('.feed').innerHTML;

        //The callback function will be executed after the function it belongs to finishes.
        expect(rowOne).not.toBe(rowTwo);
        done();
      });
    });

  });

}());
