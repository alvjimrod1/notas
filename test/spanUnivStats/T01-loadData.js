/*global expect*/
/*global browser*/
/*global element*/
/*global by*/

var fs = require("fs");
var path = require("path");
var config = require("./config");

describe('Data is loaded', function() {
   it('should show some contacts', function() {
      browser
         .get(config.getAppUrl())
         .then(function() {
            element.all(by.repeater('stat in stats'))
               .then(function(stats) {
                  console.log("LENG BALTA"+stats.length)
                  expect(stats.length).toBeGreaterThan(0);
               });

         });

   });
});

