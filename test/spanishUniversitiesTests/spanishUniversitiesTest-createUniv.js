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

                        element(by.model('newUniv.autCommunity')).sendKeys("Andalucia");
                        element(by.model('newUniv.yearFund')).sendKeys("1900");
                        element(by.model('newUniv.headquar')).sendKeys("Sevilla");
                        element(by.model('newUniv.type')).sendKeys("publica");
                        element(by.model('newUniv.nameUniversity')).sendKeys("Universidad de prueba");



                        element(by.buttonText('Add')).click().then(function() {
                            element.all(by.repeater('univ in univs')).then(function(univs) {
                                expect(univs.length).toBeGreaterThanOrEqual(initialUnivs.length);
                            });

                        });

                    });

            });

    });
});
