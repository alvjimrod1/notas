/*global expect*/
/*global browser*/
/*global element*/
/*global by*/

var newman = require("newman");
var path = require("path");


describe('Api should work', function() {
   
   newman.run({
      
      collection: require(path.join(process.cwd(),"test","spanUnivStats","SOS1718-09-span-univ-stats-L07.postman_collection.json")),
      reporters: "cli"
      
   }, function(err){
      
      if(err)
         throw err;
      else
         console.log("Collection run complete!")
         
   });
});
