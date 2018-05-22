/*global browser*/

exports.config = {

    seleniumAddress: 'http://localhost:8910', //dirección del navegador al que (protractor) le va a lanzar las pruebas (phantomjs)

    specs: ['T01-loadData.js', 'T02-createStat.js'], // array con los test a lanzar

    capabilities: { // tipo de navegador que voy a usar
        'browserName': 'phantomjs'
    },
    
    params: {
        host:'localhost',
        port:'8080',
        cadena: "/#!/spanUnivStats"
    }
};

exports.getAppUrl = function(){
  return "http://" + browser.params.host + ":" + browser.params.port + browser.params.cadena;  
}; //http://localhost:8080