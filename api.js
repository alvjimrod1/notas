var notasApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = notasApi;

notasApi.register = function(app, univs) {
    console.log("Registering routes for notas API");

    /////////// GET A RECURSO BASE CON BUSQUEDAS Y PAGINACIÓN IPLEMENTADO

    app.get(BASE_API_PATH + "/notas", function(req, res) {
        var dbquery = {};
        Object.keys(req.query).forEach((at) => {


            dbquery[at] = req.query[at];


        });

        univs.find(dbquery).toArray((err, notas) => {
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
        univs.find({ "asignatura": univ.asignatura, "anyo": univ.anyo }).toArray((err, stats) => {

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (Object.keys(univ).length !== 5) {

                console.warn("Stat does not have the expected fields");
                res.sendStatus(400);

            }
            else if (stats.length !== 0) {

                res.sendStatus(409);

            }
            else {

                univs.insert(univ);
                res.sendStatus(201);
            }

        });

    });


    app.put(BASE_API_PATH + "/notas", (req, res) => {
        console.log(Date() + " - PUT /notas");
        res.sendStatus(405);


    });

    app.put(BASE_API_PATH + "/notas/:asignatura/:anyo", (req, res) => {
        var asignatura = req.params.asignatura;
        var anyo = req.params.anyo;
        var nota = req.body;

        univs.update({ "asignatura": asignatura, "anyo": anyo }, nota, (err, numUpdated) => {
            console.log(" - Updated" + numUpdated);
        });

        res.sendStatus(200);


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
    app.get(BASE_API_PATH + "/notas/:asignatura/:anyo", (req, res) => {

        var asignatura = req.params.asignatura;
        var anyo = req.params.anyo;

        console.log(Date() + " - GET /notas/" + asignatura);

        univs.find({ "asignatura": asignatura, "anyo": anyo }).toArray((err, notas) => {

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
