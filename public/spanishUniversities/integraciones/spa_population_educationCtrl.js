/* global angular */
/* global Highcharts */


angular.module("AppManager").controller("spa_population_educationCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    var api = "/api/v2/spanish-universities";
    var api2 = "https://sos1718-08.herokuapp.com/api/v1/divorces-an/";


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
    var total = [];
    var comunidades = [];
    var provincesJurado = [];

    $http.get(api).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            comunidades.push(response.data[i].autCommunity);

        }
        // var totalPublicas = [];
        /*API MIA */
        var int = [];
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

        console.log(int);
        console.log(comunidades.unique());
        console.log(total);

        /*API JURADO */
        $http.get(api2).then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                provincesJurado.push(response.data[i].province);
            }
            console.log("PROVINCES JURADO: " + provincesJurado.sort().unique())

            var int = [];
            for (var i = 0; i < provincesJurado.unique().length; i++) {
                var cont = 0;

                for (var j = 0; j < response.data.length; j++) {
                    if (response.data[j].province == provincesJurado.sort().unique()[i] && response.data[j].year == 2015) {
                        cont = response.data[j].nullity;
                    }
                }

                int.push(cont);
                total.push([provincesJurado.sort().unique()[i], cont]);
            }

            console.log(int);
            console.log(provincesJurado.unique());
            console.log(total);

            ///HIGHCHARTS 2///

            if (!Highcharts.theme) {
                Highcharts.setOptions({
                    chart: {
                        backgroundColor: 'black'
                    },
                    colors: ['#F62366', '#9DFF02', '#0CCDD6'],
                    title: {
                        style: {
                            color: 'silver'
                        }
                    },
                    tooltip: {
                        style: {
                            color: 'silver'
                        }
                    }
                });
            }


            /**
             * In the chart render event, add icons on top of the circular shapes
             */
            function renderIcons() {

                // Move icon
                if (!this.series[0].icon) {
                    this.series[0].icon = this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
                        .attr({
                            'stroke': '#303030',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'stroke-width': 2,
                            'zIndex': 10
                        })
                        .add(this.series[2].group);
                }
                this.series[0].icon.translate(
                    this.chartWidth / 2 - 10,
                    this.plotHeight / 2 - this.series[0].points[0].shapeArgs.innerR -
                    (this.series[0].points[0].shapeArgs.r - this.series[0].points[0].shapeArgs.innerR) / 2
                );

                // Exercise icon
                if (!this.series[1].icon) {
                    this.series[1].icon = this.renderer.path(
                            ['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
                                'M', 8, -8, 'L', 16, 0, 8, 8
                            ]
                        )
                        .attr({
                            'stroke': '#ffffff',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'stroke-width': 2,
                            'zIndex': 10
                        })
                        .add(this.series[2].group);
                }
                this.series[1].icon.translate(
                    this.chartWidth / 2 - 10,
                    this.plotHeight / 2 - this.series[1].points[0].shapeArgs.innerR -
                    (this.series[1].points[0].shapeArgs.r - this.series[1].points[0].shapeArgs.innerR) / 2
                );

                // Stand icon
                if (!this.series[2].icon) {
                    this.series[2].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
                        .attr({
                            'stroke': '#303030',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'stroke-width': 2,
                            'zIndex': 10
                        })
                        .add(this.series[2].group);
                }

                this.series[2].icon.translate(
                    this.chartWidth / 2 - 10,
                    this.plotHeight / 2 - this.series[2].points[0].shapeArgs.innerR -
                    (this.series[2].points[0].shapeArgs.r - this.series[2].points[0].shapeArgs.innerR) / 2
                );
            }

            Highcharts.chart('container', {

                chart: {
                    type: 'solidgauge',
                    height: '110%',
                    events: {
                        render: renderIcons
                    }
                },

                title: {
                    text: 'Activity',
                    style: {
                        fontSize: '24px'
                    }
                },

                tooltip: {
                    borderWidth: 0,
                    backgroundColor: 'none',
                    shadow: false,
                    style: {
                        fontSize: '16px'
                    },
                    pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
                    positioner: function(labelWidth) {
                        return {
                            x: (this.chart.chartWidth - labelWidth) / 2,
                            y: (this.chart.plotHeight / 2) + 15
                        };
                    }
                },

                pane: {
                    startAngle: 0,
                    endAngle: 360,
                    background: [{ // Track for Move
                        outerRadius: '112%',
                        innerRadius: '88%',
                        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0])
                            .setOpacity(0.3)
                            .get(),
                        borderWidth: 0
                    }, { // Track for Exercise
                        outerRadius: '87%',
                        innerRadius: '63%',
                        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1])
                            .setOpacity(0.3)
                            .get(),
                        borderWidth: 0
                    }, { // Track for Stand
                        outerRadius: '62%',
                        innerRadius: '38%',
                        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2])
                            .setOpacity(0.3)
                            .get(),
                        borderWidth: 0
                    }]
                },

                yAxis: {
                    min: 0,
                    max: 100,
                    lineWidth: 0,
                    tickPositions: []
                },

                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            enabled: false
                        },
                        linecap: 'round',
                        stickyTracking: false,
                        rounded: true
                    }
                },

                series: [{
                    name: 'Move',
                    data: [{
                        color: Highcharts.getOptions().colors[0],
                        radius: '112%',
                        innerRadius: '88%',
                        y: 80
                    }]
                }, {
                    name: 'Exercise',
                    data: [{
                        color: Highcharts.getOptions().colors[1],
                        radius: '87%',
                        innerRadius: '63%',
                        y: 65
                    }]
                }, {
                    name: 'Stand',
                    data: [{
                        color: Highcharts.getOptions().colors[2],
                        radius: '62%',
                        innerRadius: '38%',
                        y: 50
                    }]
                }]
            });




        });
    });

}]);
