var spanUnivStatsApi = {};
var BASE_API_PATH = "/api/v1/secure";

module.exports = spanUnivStatsApi;


spanUnivStatsApi.register = function(app, SpanUNivStatsdb, initialStats, checkApikeyFunction) {

    console.log("Registering routes for span-univ-stats API...");


    app.get(BASE_API_PATH + "/span-univ-stats/docs", (req, res) => {

        res.redirect("https://documenter.getpostman.com/view/3889824/collection/RVtxKY8Y");

    });

    /////////////   LOADINITIALDATA 

    app.get(BASE_API_PATH + "/span-univ-stats/loadInitialData", (req, res) => {

        if (!checkApikeyFunction(req, res)) return;

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

            }
            else {
                console.log("DB initialized with " + stats.length + " stats")
            }

        });
    });



    //////ACCIONES PARA /span-univ-stats

    /////////// GET A RECURSO BASE CON BUSQUEDAS Y PAGINACIÓN IPLEMENTADO

    app.get(BASE_API_PATH + "/span-univ-stats", function(req, res) {
        
        if (!checkApikeyFunction(req, res)) return;
        
        var dbquery = {};

        if (Object.keys(req.query).includes('limit') && Object.keys(req.query).includes('offset')) {

            
            
            if (Object.keys(req.query).includes('from') && Object.keys(req.query).includes('to')) {

                Object.keys(req.query).forEach((at) => {

                    if (isNaN(req.query[at]) == false) {
                        dbquery[at] = parseInt(req.query[at]);
                    }
                    else {
                        dbquery[at] = req.query[at];
                    }

                    delete dbquery.from;
                    delete dbquery.to;
                    delete dbquery.offset;
                    delete dbquery.limit;
                    dbquery['year'] = { "$lte": parseInt(req.query['to']), "$gte": parseInt(req.query['from']) };
                    //{ "size" : {"$lte": 3} }

                });

            }
            else if (Object.keys(req.query).includes('from')) {

                Object.keys(req.query).forEach((at) => {

                    if (isNaN(req.query[at]) == false) {
                        dbquery[at] = parseInt(req.query[at]);
                    }
                    else {
                        dbquery[at] = req.query[at];
                    }

                    delete dbquery.from;
                    delete dbquery.offset;
                    delete dbquery.limit;
                    dbquery['year'] = { "$gte": parseInt(req.query['from']) };
                    //{ "size" : {"$lte": 3} }

                });

            }
            else if (Object.keys(req.query).includes('to')) {

                Object.keys(req.query).forEach((at) => {

                    if (isNaN(req.query[at]) == false) {
                        dbquery[at] = parseInt(req.query[at]);
                    }
                    else {
                        dbquery[at] = req.query[at];
                    }

                    delete dbquery.to;
                    delete dbquery.offset;
                    delete dbquery.limit;
                    dbquery['year'] = { "$lte": parseInt(req.query['to']) };
                    //{ "size" : {"$lte": 3} }

                });

            }
            else {
                Object.keys(req.query).forEach((at) => {

                    if (isNaN(req.query[at]) == false) {
                        dbquery[at] = parseInt(req.query[at]);
                    }
                    else {
                        dbquery[at] = req.query[at];
                    }
                    
                    delete dbquery.offset;
                    delete dbquery.limit;

                });
            }

            SpanUNivStatsdb.find(dbquery).skip(parseInt(req.query.offset)).limit(parseInt(req.query.limit)).toArray((err, stats) => {

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

        }
        else {
            if (Object.keys(req.query).includes('from') && Object.keys(req.query).includes('to')) {

                Object.keys(req.query).forEach((at) => {

                    if (isNaN(req.query[at]) == false) {
                        dbquery[at] = parseInt(req.query[at]);
                    }
                    else {
                        dbquery[at] = req.query[at];
                    }

                    delete dbquery.from;
                    delete dbquery.to;
                    dbquery['year'] = { "$lte": parseInt(req.query['to']), "$gte": parseInt(req.query['from']) };
                    //{ "size" : {"$lte": 3} }

                });

            }
            else if (Object.keys(req.query).includes('from')) {

                Object.keys(req.query).forEach((at) => {

                    if (isNaN(req.query[at]) == false) {
                        dbquery[at] = parseInt(req.query[at]);
                    }
                    else {
                        dbquery[at] = req.query[at];
                    }

                    delete dbquery.from;
                    dbquery['year'] = { "$gte": parseInt(req.query['from']) };
                    //{ "size" : {"$lte": 3} }

                });

            }
            else if (Object.keys(req.query).includes('to')) {

                Object.keys(req.query).forEach((at) => {

                    if (isNaN(req.query[at]) == false) {
                        dbquery[at] = parseInt(req.query[at]);
                    }
                    else {
                        dbquery[at] = req.query[at];
                    }

                    delete dbquery.to;
                    dbquery['year'] = { "$lte": parseInt(req.query['to']) };
                    //{ "size" : {"$lte": 3} }

                });

            }
            else {
                Object.keys(req.query).forEach((at) => {

                    if (isNaN(req.query[at]) == false) {
                        dbquery[at] = parseInt(req.query[at]);
                    }
                    else {
                        dbquery[at] = req.query[at];
                    }


                });
            }

            SpanUNivStatsdb.find(dbquery).toArray((err, stats) => {

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

        }

    });


    app.post(BASE_API_PATH + "/span-univ-stats", (req, res) => {

        if (!checkApikeyFunction(req, res)) return;

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

        if (!checkApikeyFunction(req, res)) return;

        console.log(Date() + " - PUT /span-univ-stats");
        res.sendStatus(405);
    });


    app.delete(BASE_API_PATH + "/span-univ-stats", (req, res) => {

        if (!checkApikeyFunction(req, res)) return;


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

        if (!checkApikeyFunction(req, res)) return;

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

        if (!checkApikeyFunction(req, res)) return;

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

        if (!checkApikeyFunction(req, res)) return;

        var autComm = req.params.autCommunity;
        console.log(Date() + " - POST /span-univ-stats/" + autComm);
        res.sendStatus(405);
    });




    app.put(BASE_API_PATH + "/span-univ-stats/:autCommunity", (req, res) => {

        if (!checkApikeyFunction(req, res)) return;

        var autComm = req.params.autCommunity;
        console.log(Date() + " - PUT /span-univ-stats/" + autComm);
        res.sendStatus(405);
    });


    ////// ACCIONES PARA UN RECURSO CONCRETO CON DOS INSTANCIAS


    app.get(BASE_API_PATH + "/span-univ-stats/:autCommunity/:year", (req, res) => {

        if (!checkApikeyFunction(req, res)) return;

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

        if (!checkApikeyFunction(req, res)) return;


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

        if (!checkApikeyFunction(req, res)) return;

        var autComm = req.params.autCommunity;
        var year = req.params.year;
        console.log(Date() + " - POST /span-univ-stats" + autComm + "/" + year);
        res.sendStatus(405);
    });


    app.put(BASE_API_PATH + "/span-univ-stats/:autCommunity/:year", (req, res) => {

        if (!checkApikeyFunction(req, res)) return;

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
