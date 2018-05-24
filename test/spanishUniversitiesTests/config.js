exports.config = {

    seleniumAddress: 'http://localhost:8910', //dirección del navegador al que (protractor) le va a lanzar las pruebas (phantomjs)

    specs: ['spanishUniversitiesTest-loadInitialData.js', 'spanishUniversitiesTest-createUniv.js'], // array con los test a lanzar

    capabilities: { // tipo de navegador que voy a usar
        'browserName': 'phantomjs'
    },
    params: {
        host: 'localhost',
        port: '8080'
    }
}

exports.getAppUrl = function() {
    console.log("https://" + browser.params.host + "/#!/spanishUniversities");
    return "https://" + browser.params.host + "/#!/spanishUniversities";
}
