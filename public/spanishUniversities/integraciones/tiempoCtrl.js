/* global angular */
/* global Highcharts */
/* global c3 */

angular.module("AppManager").controller("tiempoCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    //var api = "https://simple-weather.p.mashape.com/weatherdata?lat=" + 37.3890924 + "&lng=" + -5.984458899999936;

    var chart = AmCharts.makeChart("chartdiv", {
        "theme": "light",
        "type": "serial",

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

    $scope.getWeather = function() {

        switch ($scope.ciudad) {
            case 'Sevilla':
                $scope.lat = 37.3890924;
                $scope.long = -5.984458899999936;
                break;
            case 'Madrid':
                $scope.lat = 40.4167754;
                $scope.long = -3.7037901999999576;
                break;
            case 'Barcelona':
                $scope.lat = 41.3850639;
                $scope.long = 2.1734034999999494;
                break;
            case 'Chipiona':
                $scope.lat = 36.7348614;
                $scope.long = -6.4316989999999805;
                break;
            default:
                console.log("Hay un fallo con las coordenadas");

        }
        console.log("Latitud : " + $scope.lat);
        console.log("Longitud" + $scope.long);

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
            var a = [];
            for (var i = 0; i < res.length; i++) {
                // if (res[i][0] == "Onroll")
                a.push({ "date": res[i][0], "min": res[i][2], "max": res[i][1] });
            }


            /* ESPACIO PARA IMPLEMENTAR LA CHART*/
            var chart = AmCharts.makeChart("chartdiv", {
                "theme": "light",
                "type": "serial",
                "dataProvider": a,
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


        });

    };
}]);
