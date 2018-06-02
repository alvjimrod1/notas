var spanUnivStatsApi = {};
var BASE_API_PATH = "/api/v2";

module.exports = spanUnivStatsApi;


spanUnivStatsApi.register = function(app, SpanUNivStatsdb, initialStats) {

    console.log("Registering routes for span-univ-stats API...");
    
    /*PROXY MOTOGP*/
    var request = require("request");
    var apiServerHost="https://sos1718-10.herokuapp.com";
    ///api/v1/motogp-stats
    
    app.use("/proxyGP", function(req,res){
        
        var url = apiServerHost + req.url;
        req.pipe(request(url)).pipe(res);
    });
    
    /*PROXY DAYNAMES*/
    var apiServerDayNames="https://api.abalin.net";
    
    app.use("/proxyDayNames",function(req,res){
       var url = apiServerDayNames + req.url;
       req.pipe(request(url)).pipe(res);
    });
    
    /*PROXY JOBS*/
    var apiServerJobs = "https://jobs.github.com";
    
    app.use("/proxyJobs", function(req,res){
        var url = apiServerJobs + req.url;
        req.pipe(request(url)).pipe(res);
    });
    
    /*PROXY ATTACKS*/
    var apiServerAttacks = "https://sos1718-07.herokuapp.com";
    
    app.use("/proxyAttacks", function(req,res){
        var url = apiServerAttacks + req.url;
        req.pipe(request(url)).pipe(res);
    });
    
    /*PROXY BASEBALL*/
    var apiServerBaseball = "https://sos1718-11.herokuapp.com";
    
    app.use("/proxyBaseball", function(req,res){
        var url = apiServerBaseball + req.url;
        req.pipe(request(url)).pipe(res);
    });





    ///////////// REDIRECT

    app.get(BASE_API_PATH + "/span-univ-stats/docs", (req, res) => {

        res.redirect("https://documenter.getpostman.com/view/3889824/collection/RVtxKY8Y");

    });

    /////////////   LOADINITIALDATA 

    app.get(BASE_API_PATH + "/span-univ-stats/loadInitialData", (req, res) => {

        console.log(Date() + " - GET /span-univ-stats/loadInitialData")

        SpanUNivStatsdb.find({}).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (stats.length == 0) {
                console.log(" Empty DB");
                SpanUNivStatsdb.insert(initialStats);
                res.sendStatus(200);

            }
            else {
                console.log("DB initialized with " + stats.length + " stats");
                res.sendStatus(200);
            }

        });
    });


    /////////// GET A RECURSO BASE CON BUSQUEDAS Y PAGINACIÓN IPLEMENTADO

    app.get(BASE_API_PATH + "/span-univ-stats", function(req, res) {

        var dbquery = {};
        let offset = 0;
        let limit = Number.MAX_SAFE_INTEGER;
        

        if (req.query.offset) {
            offset = parseInt(req.query.offset);
            delete req.query.offset;
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            delete req.query.limit;
        }

        Object.keys(req.query).forEach((at) => {

            if (isNaN(req.query[at]) == false) {
                dbquery[at] = parseInt(req.query[at]);
            }
            else {
                dbquery[at] = req.query[at];
            }

        });

        if (Object.keys(req.query).includes('from') && Object.keys(req.query).includes('to')) {

            delete dbquery.from;
            delete dbquery.to;
            dbquery['year'] = { "$lte": parseInt(req.query['to']), "$gte": parseInt(req.query['from']) };

        }
        else if (Object.keys(req.query).includes('from')) {

            delete dbquery.from;
            dbquery['year'] = { "$gte": parseInt(req.query['from']) };

        }
        else if (Object.keys(req.query).includes('to')) {

            delete dbquery.to;
            dbquery['year'] = { "$lte": parseInt(req.query['to']) };

        }

        SpanUNivStatsdb.find(dbquery).skip(offset).limit(limit).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }
            /*
                        if (stats.length == 0) {

                            res.sendStatus(404);

                        }*/
            else {

                res.send(stats.map((s) => {
                    delete s._id;
                    return s;
                }));

            }

        });

    });


    app.post(BASE_API_PATH + "/span-univ-stats", (req, res) => {

        console.log(Date() + " - POST /span-univ-stats");
        var stat = req.body;

        SpanUNivStatsdb.find({ "autCommunity": stat.autCommunity, "year": stat.year }).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }


            if (Object.keys(stat).length !== 6) {

                console.warn("Stat does not have the expected fields");
                res.sendStatus(400);

            }
            else if (stats.length !== 0) {

                res.sendStatus(409);

            }
            else {

                SpanUNivStatsdb.insert(stat);
                res.sendStatus(201);
            }

        });

    });





    app.put(BASE_API_PATH + "/span-univ-stats", (req, res) => {

        console.log(Date() + " - PUT /span-univ-stats");
        res.sendStatus(405);
    });





    app.delete(BASE_API_PATH + "/span-univ-stats", (req, res) => {


        console.log(Date() + " - DELETE /span-univ-stats");

        SpanUNivStatsdb.find({}).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (stats.length == 0) {

                res.sendStatus(404);

            }
            else {

                SpanUNivStatsdb.remove({});
                res.sendStatus(200);
            }

        });

    });






    ////// ACCIONES PARA RECURSO CON UNA INSTANCIA (COMUNIDAD AUTONOMA)

    app.get(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {

        var autComm = req.params.autCommunity;
        console.log(Date() + " - GET /span-univ-stats/" + autComm);

        SpanUNivStatsdb.find({ "autCommunity": autComm }).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (stats.length == 0) {

                res.sendStatus(404);

            }
            else {

                res.send(stats.map((s) => {
                    delete s._id;
                    return s;
                }));

            }

        });
    });




    app.delete(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {

        var autComm = req.params.autCommunity;

        console.log(Date() + " - DELETE /span-univ-stats/" + autComm);

        SpanUNivStatsdb.find({ "autCommunity": autComm }).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (stats.length == 0) {

                res.sendStatus(404);

            }
            else {

                SpanUNivStatsdb.remove({ "autCommunity": autComm });
                res.sendStatus(200);

            }

        });


    });



    app.post(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {


        var autComm = req.params.autCommunity;
        console.log(Date() + " - POST /span-univ-stats/" + autComm);
        res.sendStatus(405);
    });




    app.put(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {


        var autComm = req.params.autCommunity;
        console.log(Date() + " - PUT /span-univ-stats/" + autComm);
        res.sendStatus(405);
    });


    ////// ACCIONES PARA UN RECURSO CONCRETO CON DOS INSTANCIAS


    app.get(BASE_API_PATH + "/span-univ-stats/:autCommunity/:year", (req, res) => {


        var ac = req.params.autCommunity;
        var y = req.params.year;
        console.log(Date() + " - GET /span-univ-stats/" + ac + "/" + y);

        SpanUNivStatsdb.find({ "autCommunity": ac, "year": parseInt(y) }).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (stats.length == 0) {

                res.sendStatus(404);

            }
            else {

                res.send(stats.map((s) => {
                    delete s._id;
                    return s;
                })[0]);

            }

        });
    });


    app.delete(BASE_API_PATH + "/span-univ-stats/:autCommunity/:year", (req, res) => {



        var autComm = req.params.autCommunity;
        var year1 = req.params.year;
        console.log(Date() + " - DELETE /span-univ-stats/" + autComm + "/" + year1);

        SpanUNivStatsdb.find({ "autCommunity": autComm, "year": parseInt(year1) }).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (stats.length == 0) {

                res.sendStatus(404);

            }
            else {

                SpanUNivStatsdb.remove({ "autCommunity": autComm, "year": parseInt(year1) });
                res.sendStatus(200);

            }

        });

    });


    app.post(BASE_API_PATH + "/span-univ-stats/:autCommunity/:year", (req, res) => {


        var autComm = req.params.autCommunity;
        var year = req.params.year;
        console.log(Date() + " - POST /span-univ-stats" + autComm + "/" + year);
        res.sendStatus(405);
    });


    app.put(BASE_API_PATH + "/span-univ-stats/:autCommunity/:year", (req, res) => {


        var autComm = req.params.autCommunity;
        var year = req.params.year;
        var stat = req.body;

        if (autComm != stat.autCommunity || year != stat.year || Object.keys(stat).length !== 6) {
            res.sendStatus(400);
            console.warn(Date() + "  - Hacking attemp!");
            return;
        }

        SpanUNivStatsdb.update({ "autCommunity": autComm, "year": parseInt(year) }, stat, (err, numUpdated) => {
            console.log(" - Updated" + numUpdated);
        });

        res.sendStatus(200);


    });







};
