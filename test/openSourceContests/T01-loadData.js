/*global expect*/
/*global browser*/
/*global element*/
/*global by*/

describe('Data is loaded', function() {
   it('should show some contests', function() {
      browser
         .get('https://sos171809rar-sos171809rar.c9users.io/#!/openSourceContests/')
         .then(function() {
            element.all(by.repeater('contest in contests'))
               .then(function(contest) {
                  expect(contest.length).toBeGreaterThanOrEqual(0);
               });
         });
   });
});
