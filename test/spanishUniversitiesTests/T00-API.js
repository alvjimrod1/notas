/*global expect*/
/*global browser*/
/*global element*/
/*global by*/
var newman = require('newman');
var path = require('path');

describe('API works', function() {
    newman.run({
        collection: require(path.join(process.cwd(),"test","spanishUniversitiesTests","SOS1718-09-spanish-universities.postman_collection.json")),
        reporters: "cli"

    }, function(err) {
        if (err)
            throw err;
        else
            console.log("Newman collection run completed!");
    });

});
