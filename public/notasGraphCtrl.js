/* global angular */
/* global Highcharts */
/* global c3 */

angular.module("AppManager").controller("notasGraphCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph Controller Initialized!");
    var api2 = "https://sandbox-sos171809ajr.c9users.io/api/v1/notas";


    var api3 = "https://sandbox-sos171809ajr.c9users.io/api/v1/notas?anyo=" + 2013;

    $http.get(api3).then(function(response) {
        console.log("DATA");
        console.log(response.data);
        var conCarlos = [];
        var sinCarlos = [];
        var asignaturas = [];

        response.data.map(function(i) {
            asignaturas.push([i['asignatura']]);
            if (i['lucifer'] == "si") {
                conCarlos.push(parseFloat([i['nota']]));
            }
            else {
                sinCarlos.push(parseFloat([i['nota']]));
            }
        });
        console.log("Con Carlos: ");
        console.log(conCarlos);

        console.log("Sin Carlos :");
        console.log(sinCarlos);

        console.log("Asignaturas :");
        console.log(asignaturas);

        /* ESPACIO PARA IMPLEMENTAR LA CHART*/


        Highcharts.chart('container1', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Calificaciones según año elegido'
            },
            subtitle: {
                text: '0 = No presentado'
            },
            xAxis: {
                categories: asignaturas
            },
            yAxis: {
                title: {
                    text: 'Calificación'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Con Lucifer en Sevilla',
                data: conCarlos
            }, {
                name: 'Sin Lucifer en Sevilla',
                data: sinCarlos
            }]
        });


        //////////////



    });
    $scope.getWeather = function() {
        switch ($scope.anyo) {
            case '2013':
                $scope.anyo = 2013;
                break;
            case '2014':
                $scope.anyo = 2014;
                break;
            case '2015':
                $scope.anyo = 2015;
                break;
            case '2016':
                $scope.anyo = 2016;
                break;
            case '2017':
                $scope.anyo = 2017;
                break;
            default:
                console.log("Hay un fallo con las coordenadas");

        }


        var api = "https://sandbox-sos171809ajr.c9users.io/api/v1/notas?anyo=" + $scope.anyo;

        $http.get(api).then(function(response) {
            console.log("DATA");
            console.log(response.data);
            var conCarlos = [];
            var sinCarlos = [];
            var asignaturas = [];

            response.data.map(function(i) {
                asignaturas.push([i['asignatura']]);
                if (i['lucifer'] == "si") {
                    conCarlos.push(parseFloat([i['nota']]));
                }
                else {
                    sinCarlos.push(parseFloat([i['nota']]));
                }
            });
            console.log("Con Carlos: ");
            console.log(conCarlos);

            console.log("Sin Carlos :");
            console.log(sinCarlos);

            console.log("Asignaturas :");
            console.log(asignaturas);

            /* ESPACIO PARA IMPLEMENTAR LA CHART*/


            Highcharts.chart('container1', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Calificaciones según año elegido'
                },
                subtitle: {
                    text: '0 = No presentado'
                },
                xAxis: {
                    categories: asignaturas
                },
                yAxis: {
                    title: {
                        text: 'Calificación'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: 'Con Lucifer en Sevilla',
                    data: conCarlos
                }, {
                    name: 'Sin Lucifer en Sevilla',
                    data: sinCarlos
                }]
            });


            //////////////



        });

    };
    $http.get(api2).then(function(response) {
        console.log("DATA");
        console.log(response.data);

        var conCarlosTotal = [];
        var sinCarlosTotal = [];
        var mediaCon = 0;
        var mediaSin = 0;
        response.data.map(function(i) {

            if (i['lucifer'] == "si") {
                conCarlosTotal.push(parseFloat([i['nota']]));


            }
            else {
                sinCarlosTotal.push(parseFloat([i['nota']]));
            }
        });
        var sumaCon = 0.;
        var sumaSin = 0.;
        var aprobadosc = 0.;
        var suspensosc = 0.;
        var aprobadoss = 0.;
        var suspensoss = 0.;
        for (var i = 0; i < conCarlosTotal.length; i++) {
            if (conCarlosTotal[i] >= 5.0) {
                aprobadosc += 1;
            }
            else {
                suspensosc += 1
            }

        }

        for (var i = 0; i < sinCarlosTotal.length; i++) {
            if (sinCarlosTotal[i] >= 5.0) {
                aprobadoss += 1;
            }
            else {
                suspensoss += 1;
            }
        }
        console.log("PRUEBAS")
        console.log(aprobadosc)
        console.log(suspensosc)

        console.log(aprobadoss)

        console.log(suspensoss)


        var sumc = 0.;
        var sums = 0.;
        var notaMediaC = 0.;
        var notaMediaS = 0.;


        for (var i = 0; i < conCarlosTotal.length; i++) {
            sumc += parseFloat(conCarlosTotal[i]);

        }

        for (var i = 0; i < sinCarlosTotal.length; i++) {
            sums += parseFloat(sinCarlosTotal[i])
        }
        notaMediaC = sumc / conCarlosTotal.length;
        notaMediaS = sums / sinCarlosTotal.length;
        console.log("AQUI ES LA NOTA MEDIA")
        console.log(notaMediaC.toPrecision(3))

        var chart = AmCharts.makeChart("chartdiv", {
            "type": "serial",
            "theme": "light",
            "depth3D": 20,
            "angle": 30,
            "legend": {
                "horizontalGap": 10,
                "useGraphSettings": true,
                "markerSize": 10
            },
            "dataProvider": [{
                "year": "Con carlos",
                "namerica": notaMediaC.toPrecision(3),


            }, {
                "year": "Sin carlos",
                "lamerica": notaMediaS.toPrecision(3),

            }],
            "valueAxes": [{
                "stackType": "regular",
                "axisAlpha": 0,
                "gridAlpha": 0
            }],
            "graphs": [{
                "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                "fillAlphas": 0.8,
                "labelText": "[[value]]",
                "lineAlpha": 0.3,
                "title": "Con Carlos",
                "type": "column",
                "color": "#000000",
                "valueField": "namerica"
            }, {
                "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                "fillAlphas": 0.8,
                "labelText": "[[value]]",
                "lineAlpha": 0.3,
                "title": "Sin Carlos",
                "type": "column",
                "color": "#000000",
                "valueField": "lamerica"
            }],
            "categoryField": "year",
            "categoryAxis": {
                "gridPosition": "start",
                "axisAlpha": 0,
                "gridAlpha": 0,
                "position": "left"
            },
            "export": {
                "enabled": true
            }

        });




        Highcharts.chart('container2', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Porcentaje aprobado con Carlos'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Aprobados',
                colorByPoint: true,
                data: [{
                    name: 'Aprobados',
                    y: aprobadosc,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Suspensos',
                    y: suspensosc,
                    sliced: true,
                    selected: true
                }]
            }]
        });

        Highcharts.chart('container3', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Porcentaje aprobado SIN Carlos'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Aprobados',
                colorByPoint: true,
                data: [{
                    name: 'Aprobados',
                    y: aprobadoss,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Suspensos',
                    y: suspensoss,
                    sliced: true,
                    selected: true
                }]
            }]
        });




        Highcharts.chart('container4', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Total fruit consumtion, grouped by gender'
            },

            xAxis: {
                categories: ['Con Carlos', 'Sin Carlos']
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: 'Number of fruits'
                }
            },

            tooltip: {
                formatter: function() {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },

            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },

            series: [{
                name: 'Con Carlos',
                data: [5.2],
                stack: 'male'
            }, {
                name: 'Sin Carlos',
                data: [7.5],
                stack: 'female'
            }]
        });

    });



}]);
