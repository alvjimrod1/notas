/* global angular */
/* global Highcharts */


angular.module("AppManager").controller("spa_crimeCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    var api = "/api/v2/spanish-universities";
    var api2 = "https://sos1718-08.herokuapp.com/api/v2/crimes-an";


    /* HIGCHARTS */

    /*aux functions*/
    Array.prototype.unique = function(a) {
        return function() {
            return this.filter(a);
        };
    }(function(a, b, c) {
        return c.indexOf(a, b + 1) < 0;
    });
    /*--------MI API-------*/
    var int = [];

    var total = [];
    var comunidades = [];
    var provincesJoseEnrique = [];

    $http.get(api).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            comunidades.push(response.data[i].autCommunity);

        }
        // var totalPublicas = [];
        /*API MIA */

        for (var i = 0; i < comunidades.unique().length; i++) {
            var cont = 0;

            for (var j = 0; j < response.data.length; j++) {
                if (response.data[j].autCommunity == comunidades.sort().unique()[i]) {
                    cont++;
                }
            }

            int.push(cont);
            total.push([comunidades.sort().unique()[i], cont]);
        }

        console.log("INT   " + int);
        console.log("COMUNIDADES.UNIQUE " + comunidades.unique());
        console.log("TOTAL " + total);

        /*API JoseEnrique */
        $http.get(api2).then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                provincesJoseEnrique.push(response.data[i].province);
            }
            console.log("PROVINCES JoseEnrique: " + provincesJoseEnrique.sort().unique());

            var int2 = [];
            for (var i = 0; i < provincesJoseEnrique.unique().length; i++) {
                var cont = 0;

                for (var j = 0; j < response.data.length; j++) {
                    if (response.data[j].province == provincesJoseEnrique.sort().unique()[i] && response.data[j].year == 2007) {
                        if (response.data[j].province = 0) {
                            cont = response.data[j].onecrime;
                        }
                        else {
                            cont += response.data[j].onecrime;
                        }
                    }
                }

                int2.push(cont);
                total.push([provincesJoseEnrique.sort().unique()[i], cont]);
            }

            console.log("INT2 = " + int2);
            console.log(provincesJoseEnrique.unique());
            console.log(total);

            console.log("tmaño de alvaro : " + int.length);
            var aux = [];

            for (var i = 0; i < int.length; i++) {
                aux.push(null);
            }


            ///C3 charts///

            var chart = c3.generate({

                data: {
                    columns: [
                        ['Alvaro'].concat(int), ['JoseEnrique'].concat(aux).concat(int2)

                    ]
                },
                axis: {
                    x: {
                        type: 'category',
                        categories: comunidades.unique().concat(provincesJoseEnrique.unique())
                    }
                },

                zoom: {
                    enabled: true
                }
            });


        });
    });

}]);