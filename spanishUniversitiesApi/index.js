var spanishUniversitiesApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = spanishUniversitiesApi;

spanishUniversitiesApi.register = function(app, univs, initialUniversities) {
    console.log("Registering routes for spanishUniversities API");


    app.get(BASE_API_PATH + "/span-univ-stats/docs", (req, res) => {

        res.redirect("https://documenter.getpostman.com/view/3889824/collection/RVtxKY8Y");

    });


    /////////////   LOADINITIALDATA 

    app.get(BASE_API_PATH + "/spanish-universities/loadInitialData", (req, res) => {

        console.log(Date() + " - GET /spanish-universities/loadInitialData");

        univs.find({}).toArray((err, universities) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (universities.length == 0) {
                console.log(" Empty DB");
                univs.insert(initialUniversities);

            }
            else {
                console.log("DB initialized with " + universities.length + " universities");
            }

        });
    });



    //ACCIONES REST

    //RECURSOS SIMPLES//////////////////////////////////////////////////////////////
    app.get(BASE_API_PATH + "/spanish-universities", (req, res) => {
        console.log(Date() + " - GET /spanish-universities");
        univs.find({}).toArray((error, universities) => {

            if (error) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }


            res.send(universities.map((s) => {
                delete s._id;
                return s;
            }));
        });

    });

    app.post(BASE_API_PATH + "/spanish-universities", (req, res) => {
        console.log(Date() + " - POST /spanish-universities");
        var univ = req.body;

        univs.find({ "autCommunity": univ.autCommunity, "yearFund": univ.yearFund }).toArray((err, universities) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (Object.keys(univ).length !== 5) {

                console.warn("Stat does not have the expected fields");
                res.sendStatus(400);

            }
            else if (universities.length !== 0) {

                res.sendStatus(409);

            }
            else {


                univs.insert(univ);
                res.sendStatus(201);
            }


        });

    });



    app.put(BASE_API_PATH + "/spanish-universities", (req, res) => {
        console.log(Date() + " - PUT /spanish-universities");
        res.sendStatus(405);

    });

    app.delete(BASE_API_PATH + "/spanish-universities", (req, res) => {
        console.log(Date() + " - DELETE /spanish-universities");
        univs.find({}).toArray((err, universities) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (universities.length == 0) {

                res.sendStatus(404);

            }
            else {

                univs.remove({});
                res.sendStatus(200);
            }

        });

    });
    //RECURSO ESPECIFICO PARA 2 PROPIEDADES //////////////////////////////
    app.get(BASE_API_PATH + "/spanish-universities/:autCommunity/:yearFund", (req, res) => {

        var autCommunity = req.params.autCommunity;
        var yearFund = req.params.yearFund;

        console.log(Date() + " - GET /spanish-universities/" + autCommunity + "/" + yearFund);

        univs.find({ "autCommunity": autCommunity, "yearFund": yearFund }).toArray((err, universities) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (universities.length == 0) {

                res.sendStatus(404);

            }
            else {

                res.send(universities.map((s) => {
                    delete s._id;
                    return s;
                })[0]);

            }

        });
    });

    app.delete(BASE_API_PATH + "/spanish-universities/:autCommunity/:yearFund", (req, res) => {
        var autCommunity = req.params.autCommunity;
        var yearFund = req.params.yearFund;

        console.log(Date() + " - DELETE /spanish-universities" + autCommunity + "/" + yearFund);



        univs.find({ "autCommunity": autCommunity, "yearFund": yearFund }).toArray((err, universities) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (universities.length == 0) {

                res.sendStatus(404);

            }
            else {

                univs.remove({ "autCommunity": autCommunity, "yearFund": yearFund });
                res.sendStatus(200);

            }

        });

    });


    app.post(BASE_API_PATH + "/spanish-universities/:autCommunity/:yearFund", (req, res) => {
        var autCommunity = req.params.autCommunity;
        var yearFund = req.params.yearFund;
        console.log(Date() + " - POST /spanish-universities" + autCommunity + "/" + yearFund);
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/spanish-universities/:autCommunity/:yearFund", (req, res) => {
        var autCommunity = req.params.autCommunity;
        var yearFund = req.params.yearFund;
        var university = req.body;



        if (autCommunity != university.autCommunity || yearFund != university.yearFund || Object.keys(university).length !== 5) {
            res.sendStatus(400);
            console.warn(Date() + "  - Hacking attemp!");
            return;
        }

        univs.update({ "autCommunity": autCommunity, "yearFund": yearFund }, university, (err, numUpdated) => {
            console.log(" - Updated" + numUpdated);
        });
        res.sendStatus(200);

    });



};
