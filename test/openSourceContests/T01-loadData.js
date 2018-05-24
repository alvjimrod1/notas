/*global expect*/
/*global browser*/
/*global element*/
/*global by*/

var fs = require("fs");
var path = require("path");

describe('Data is loaded', function() {
   it('should show some contests', function() {
      browser
         .get('https://sos171809rar-sos171809rar.c9users.io/#!/openSourceContests')
         .then(function() {
            element.all(by.repeater('contest in contests'))
               .then(function(contests) {
                console.log("LENG"+contests.length)
                  expect(contests.length).toBeGreaterThanOrEqual(0);
                 
               });
           
         });
         
   });
});
