/* global angular */
/* global Highcharts */


angular.module("AppManager").controller("spanishUniversitiesGraphsApiProxyCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    var api = "/api/v2/spanish-universities";
    var api2 = "/proxyAJR/api/v1/global-warmings";
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
    var comunidades = [];
    var provincesAntonio = [];

    var total = [];

    $http.get(api).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            comunidades.push(response.data[i].autCommunity);

        }
        // var totalPublicas = [];
        /*API MIA */
        var int1 = [];
        for (var i = 0; i < comunidades.unique().length; i++) {
            var cont = 0;

            for (var j = 0; j < response.data.length; j++) {
                if (response.data[j].autCommunity == comunidades.sort().unique()[i]) {
                    cont++;
                }
            }

            int1.push(cont);
            total.push([comunidades.sort().unique()[i], cont]);
        }

        console.log(int1);
        console.log(comunidades.unique());


        /*API ANTONIO SAUCEJO */
        $http.get(api2).then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                provincesAntonio.push(response.data[i].name);
            }
            console.log("PROVINCES ANTONIO: " + provincesAntonio.sort().unique())




            console.log("AQUI ESTA TOTAL A 0")
            console.log(total)

            var int2 = [];
            for (var i = 0; i < comunidades.unique().length; i++) {
                int2.push(null);
            }
            for (var i = 0; i < provincesAntonio.unique().length; i++) {
                var cont = 0;

                for (var j = 0; j < response.data.length; j++) {
                    if (response.data[j].name == provincesAntonio.sort().unique()[i]) {
                        cont = response.data[j].peakPower;
                    }
                }

                int2.push(cont);
                total.concat([provincesAntonio.sort().unique()[i], cont]);
            }

            console.log(int2);
            console.log(provincesAntonio.unique());
            console.log("EOEOEOEO" + (total));
            var provincesTotal = comunidades.concat(provincesAntonio)

            /*CHART */
            var myChart = {
                "type": "scatter",
                "title": {
                    "text": ""
                },
                "plot": {
                    "value-box": {
                        "text": "%v"
                    },
                    "tooltip": {
                        "text": "%v"
                    }
                },
                "legend": {
                    "toggle-action": "hide",
                    "header": {
                        "text": "Legend Header"
                    },
                    "item": {
                        "cursor": "pointer"
                    },
                    "draggable": true,
                    "drag-handler": "icon"
                },
                "scale-x": {
                    "values": provincesTotal.unique()
                },
                "series": [{
                        "values": int1,
                        "text": "Spanish universities",
                        "palette": 0
                    },
                    {
                        "values": int2,
                        "text": "Peak power",
                        "palette": 1
                    }
                ]
            };
            zingchart.render({
                id: "myChart",
                data: myChart,
                height: "480",
                width: "100%"
            });

        });
    });

}]);
