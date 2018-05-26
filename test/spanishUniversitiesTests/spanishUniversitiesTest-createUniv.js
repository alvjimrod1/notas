/*global expect*/
/*global browser*/
/*global element*/
/*global by*/
/*global config*/
var config = require("./config");
describe('Add an univ', function() {
    it('should add a new university', function() {
        browser
            .get(config.getAppUrl())
            .then(function() {
                element
                    .all(by.repeater('univ in univs'))
                    .then(function(initialUnivs) {
                        //           browser.driver.sleep(2000);

                        element(by.model('newUniv.autCommunity')).sendKeys("ES-MA");
                        element(by.model('newUniv.yearFund')).sendKeys("1996");
                        element(by.model('newUniv.headquar')).sendKeys("Madrid");
                        element(by.model('newUniv.type')).sendKeys("publica");
                        element(by.model('newUniv.nameUniversity')).sendKeys("Universidad Rey Juan Carlos");



                        element(by.buttonText('Add')).click().then(function() {
                            element.all(by.repeater('univ in univs')).then(function(univs) {
                                expect(univs.length).toBeGreaterThanOrEqual(initialUnivs.length);
                            });

                        });

                    });

            });

    });
});
