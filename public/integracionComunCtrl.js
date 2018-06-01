/* global angular */
/* global Highcharts */


angular.module("AppManager").controller("integracionComunCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph comun Controller Initialized!");
    var apiAlvaro = "/api/v2/spanish-universities";

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
            total.push([comunidades.sort().unique()[i], cont]);
        }

        console.log(int1);
        console.log(comunidades.unique());













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

}]);
