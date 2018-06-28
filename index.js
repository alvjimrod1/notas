var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


var MongoClient = require("mongodb").MongoClient;

var port = (process.env.PORT || 1607);

var mdbnotas = "mongodb://alvjimrod1:alvjimrod1@ds121251.mlab.com:21251/notas";

var app = express();

app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "public")));

var notasApi = require("./api");
MongoClient.connect(mdbnotas, { useNewUrlParser: true }, (err, mlabs) => {

    if (err) {
        console.error("Error accesing DB : " + err);
        process.exit(1);
    }

    console.log("Conected to DB in mlabs");

    var notasDatabase = mlabs.db("notas");
    var notasdb = notasDatabase.collection("notas");
    
    notasApi.register(app, notasdb);

    console.log("Conected to  notas DB");




    app.listen(port, () => {
        console.log("Server ready on port " + port + "!");
    }).on("error", (e) => {
        console.log("Server not ready " + e);
    });


});
