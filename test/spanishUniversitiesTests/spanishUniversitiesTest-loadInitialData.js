/*global expect*/
/*global browser*/
/*global element*/
/*global by*/
/*global config*/

var config = require("./config");
describe('Data is loaded', function() {
    it('should show some spanish universities', function() {
        browser
            .get(config.getAppUrl())
            .then(function() {
                element
                    .all(by.repeater('univ in univs'))
                    .then(function(univs) {
                        expect(univs.length).toBeGreaterThan(4);
                    });

            });

    });
});
