/* global angular */
/* global Highcharts */
/* global zingchart */


angular.module("AppManager").controller("integracionComunCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph comun Controller Initialized!");
    var apiAlvaro = "/api/v2/spanish-universities";
    var apiBalta = "/api/v2/span-univ-stats";
    var apiRafa = "/api/v2/open-source-contests";
    console.log("orsihgnsidfksdoicjd");
    var provincesTotal = [];

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


    var total = [];

    $http.get(apiAlvaro).then(function(response) {

        for (var i = 0; i < response.data.length; i++) {
            comunidades.push(response.data[i].autCommunity);

        }
        // var totalPublicas = [];
        /*API ALVARO */
        var int1 = [];
        for (var i = 0; i < comunidades.unique().length; i++) {
            var cont = 0;

            for (var j = 0; j < response.data.length; j++) {
                if (response.data[j].autCommunity == comunidades.sort().unique()[i]) {
                    cont++;
                }
            }

            int1.push(cont);
            comunidades = comunidades.sort().unique();
            total.push([comunidades[i], cont]);
        }

        console.log("TOTAL:",total);
        



        /*API BALTA */

        $http.get(apiBalta).then(function(responseSpanUnivStats) {
            var list = [];
            for (var i = 0; i < total.length; i++) {
                list.push(null);
            }
            var listCom = [];

            responseSpanUnivStats.data.forEach((stat) => {
                listCom.push(stat.autCommunity);
            });

            listCom = listCom.unique();

            listCom.forEach((com) => {
                var cont = 0;
                responseSpanUnivStats.data.forEach((stat) => {
                    if (stat.autCommunity == com) {
                        cont += 1;
                    }
                });
                list.push([com, cont]);
            });



            console.log("LIST:",list);



            /*API RAFA */

            $http.get(apiRafa).then(function() {





        
                /*CHART */
                
                provincesTotal = comunidades.concat(listCom);
                console.log(provincesTotal);
                
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
                        "values": provincesTotal
                    },
                    "series": [{
                            "values": total,
                            "text": "Spanish universities",
                            "palette": 0
                        },
                        {
                            "values": list,
                            "text": "SpanUnivStats",
                            "palette": 1
                        }
                    ]
                };
                zingchart.render({
                    id: "commonChart",
                    data: myChart,
                    height: "480",
                    width: "100%"
                });




            });

        });
    });
}]);
