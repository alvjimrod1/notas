var notasApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = notasApi;

notasApi.register = function(app, univs) {
    console.log("Registering routes for notas API");




    /*

    app.get(BASE_API_PATH + "/notas/loadInitialData", (req, res) => {

        console.log(Date() + " - GET /notas/loadInitialData");
        res.sendStatus(200);
        univs.find({}).toArray((err, notas) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (notas.length == 0) {
                console.log(" Empty DB");

            }
            else {
                console.log("DB initialized with " + notas.length + " notas");
            }

        });
    });


   */
    /////////// GET A RECURSO BASE CON BUSQUEDAS Y PAGINACIÓN IPLEMENTADO

    app.get(BASE_API_PATH + "/notas", function(req, res) {

        univs.find({}).toArray((err, notas) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (notas.length == 0) {
                console.log("vacia pisha");
                res.sendStatus(404);

            }
            else {

                res.send(notas.map((s) => {
                    delete s._id;
                    return s;
                }));

            }

        });

    });


    //RECURSOS SIMPLES//////////////////////////////////////////////////////////////


    app.post(BASE_API_PATH + "/notas", (req, res) => {
        console.log(Date() + " - POST /notas");
        var univ = req.body;


        univs.insert(univ);
        res.sendStatus(201);
    });


    app.put(BASE_API_PATH + "/notas", (req, res) => {
        console.log(Date() + " - PUT /notas");
        res.sendStatus(405);

    });

    app.delete(BASE_API_PATH + "/notas", (req, res) => {
        console.log(Date() + " - DELETE /notas");
        univs.find({}).toArray((err, notas) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (notas.length == 0) {

                res.sendStatus(404);

            }
            else {

                univs.remove({});
                res.sendStatus(200);
            }

        });

    });
    //RECURSO ESPECIFICO PARA 2 PROPIEDADES //////////////////////////////
    app.get(BASE_API_PATH + "/notas/:autCommunity/:yearFund", (req, res) => {

        var autCommunity = req.params.autCommunity;
        var yearFund = req.params.yearFund;

        console.log(Date() + " - GET /notas/" + autCommunity + "/" + yearFund);

        univs.find({ "autCommunity": autCommunity, "yearFund": yearFund }).toArray((err, notas) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (notas.length == 0) {

                res.sendStatus(404);

            }
            else {

                res.send(notas.map((s) => {
                    delete s._id;
                    return s;
                })[0]);

            }

        });
    });

    app.delete(BASE_API_PATH + "/notas/:asignatura", (req, res) => {
        var asignatura = req.params.asignatura;


        console.log(Date() + " - DELETE /notas" + asignatura);



        univs.find({ "asignatura": asignatura }).toArray((err, notas) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (notas.length == 0) {

                res.sendStatus(404);

            }
            else {

                univs.remove({ "asignatura": asignatura });
                res.sendStatus(200);

            }

        });

    });


};
