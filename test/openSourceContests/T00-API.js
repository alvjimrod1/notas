/*global expect*/
/*global browser*/
/*global element*/
/*global by*/

var newman = require("newman");
var path = require("path");


describe('Api should work', function() {

   newman.run({

      collection: require(path.join(process.cwd(), "test", "openSourceContests", "SOS1718-09-open-source-contests V2.postman_collection.json")),
      reporters: "cli"

   }, function(err) {

      if (err)
         throw err;
      else
         console.log("API TEST OK!")

   });
});
