/* global angular */
/* global Highcharts */
/* global c3 */

angular.module("AppManager").controller("tiempoCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    //var api = "https://simple-weather.p.mashape.com/weatherdata?lat=" + 37.3890924 + "&lng=" + -5.984458899999936;

    $scope.lat = 37.3890924;
    $scope.long = -5.984458899999936;
    $scope.getWeather = function() {

        var api = "https://simple-weather.p.mashape.com/weatherdata?lat=" + $scope.lat + "&lng=" + $scope.long;
        $http.get(api, {
            headers: {
                "X-Mashape-Key": "1wmUJApusomshUshD2AY4GWO99zmp1dlvsnjsnxMDssqZ9E86u",
                "Accept": "application/json",
            }
        }).then(function(response) {

            console.log(response.data.query.results.channel.item.forecast);


            var res = [];
            var responseData = response.data.query.results.channel.item.forecast;
            responseData.map(function(i) {
                res.push([i['date'], i['high'], i['low']]);
            });
            /*
            console.log("RES");
            console.log(res);
            console.log("FECHA")
            console.log(res[0][0])
            */
            //   var fechas = ["date" +:+res[0][0]];

            /* ESPACIO PARA IMPLEMENTAR LA CHART*/
            var chart = AmCharts.makeChart("chartdiv", {
                "theme": "light",
                "type": "serial",
                "dataProvider": [{
                    "date": res[0][0],
                    "min": res[0][2],
                    "max": res[0][1]
                }, {
                    "date": res[1][0],
                    "min": res[1][2],
                    "max": res[1][1]
                }, {
                    "date": res[2][0],
                    "min": res[2][2],
                    "max": res[2][1]
                }, {
                    "date": res[3][0],
                    "min": res[3][2],
                    "max": res[3][1]
                }, {
                    "date": res[4][0],
                    "min": res[4][2],
                    "max": res[4][1]
                }, {
                    "date": res[5][0],
                    "min": res[5][2],
                    "max": res[5][1]
                }, {
                    "date": res[6][0],
                    "min": res[6][2],
                    "max": res[6][1]
                }, {
                    "date": res[7][0],
                    "min": res[7][2],
                    "max": res[7][1]
                }, {
                    "date": res[8][0],
                    "min": res[8][2],
                    "max": res[8][1]
                }, {
                    "date": res[9][0],
                    "min": res[9][2],
                    "max": res[9][1]
                }],
                "valueAxes": [{
                    "stackType": "3d",
                    "unit": "ºC",
                    "position": "left",
                    "title": "Temperatures",
                }],
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "Min temperature on [[category]]:  <b>[[value]]</b>",
                    "fillAlphas": 0.9,
                    "lineAlpha": 0.2,
                    "title": "Min",
                    "type": "column",
                    "valueField": "min"
                }, {
                    "balloonText": "Max temperature on [[category]]:  <b>[[value]]</b>",
                    "fillAlphas": 0.9,
                    "lineAlpha": 0.2,
                    "title": "Max",
                    "type": "column",
                    "valueField": "max"
                }],
                "plotAreaFillAlphas": 0.1,
                "depth3D": 60,
                "angle": 30,
                "categoryField": "date",
                "categoryAxis": {
                    "gridPosition": "start"
                },
                "export": {
                    "enabled": true
                }
            });
            jQuery('.chart-input').off().on('input change', function() {
                var property = jQuery(this).data('property');
                var target = chart;
                chart.startDuration = 0;

                if (property == 'topRadius') {
                    target = chart.graphs[0];
                    if (this.value == 0) {
                        this.value = undefined;
                    }
                }

                target[property] = this.value;
                chart.validateNow();
            });

            /*---------------------*/
        });


        // getSpanishUniversities();

    };
}]);
