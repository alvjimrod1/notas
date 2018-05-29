/* global angular */
/* global $ */
/* global Highcharts */
/* global google */
/* global Chartist */

angular.module("AppManager").controller("GPSpanUnivStatsGraphCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph Controller Initialized!");
    var apiSpanUnivStats = "/api/v2/span-univ-stats";
    var apiGP = "/proxyGP/api/v1/motogp-stats";


    $scope.return = function() {
        $location.path("/spanUnivStats");
    };


    /* CHARTS */

    /* eliminar elementos duplicados*/

    Array.prototype.unique = function(a) {
        return function() { return this.filter(a) }
    }(function(a, b, c) {
        return c.indexOf(a, b + 1) < 0
    });

    /*ordenar array*/

    Array.prototype.sortNumbers = function() {
        return this.sort(
            function(a, b) {
                return a - b
            }
        );
    }




    var years = [];


    /* SPANISH UNIVERSITIES STATS*/
    $http.get(apiSpanUnivStats).then(function(responseSpanUnivStats) {

        var totalScore = [];
        var totalEnrolledNumber = [];

        for (var i = 0; i < responseSpanUnivStats.data.length; i++) {
            years.push(responseSpanUnivStats.data[i].year);

        }


        /* GP STATS*/
        $http.get(apiGP).then(function(responseGP) {
            console.log(responseGP.data);

            for (var i = 0; i < responseGP.data.length; i++) {
                years.push(responseGP.data[i].year);

            }
            console.log("Año: ",years.sortNumbers().unique());

            for (var i = 0; i < years.sortNumbers().unique().length; i++) {
                var yearEnrolledNumber = 0;
                var yearScore = 0;
                var actualYear=years.sortNumbers().unique()[i];
                var dataSpanUniv=[];
                var dataMotoGp=[];
                var newDataSpanUniv=[];
                var newDataMotoGp=[];
                
                for (var j = 0; j < responseSpanUnivStats.data.length; j++) {
                    if (responseSpanUnivStats.data[j].year == years.sortNumbers().unique()[i]) {
                        yearEnrolledNumber += responseSpanUnivStats.data[j].enrolledNumber;

                    }
                }
                newDataSpanUniv=[actualYear, yearEnrolledNumber, 10];
                dataSpanUniv.push(newDataSpanUniv);
                
                for (var j = 0; j < responseGP.data.length; j++) {
                    if (responseGP.data[j].year == years.sortNumbers().unique()[i]) {
                        yearScore += responseGP.data[j].score;
                    }
                }
                newDataMotoGp= [actualYear, yearScore, 10];
                dataMotoGp.push(newDataMotoGp);

                //totalEnrolledNumber.push(yearEnrolledNumber);
                //totalScore.push(yearScore);

            }

            console.log("dataSpanUniv: ",dataSpanUniv);
            console.log("dataMotoGp: ",dataMotoGp);
           

            Highcharts.chart('gpSpanUnivStats', {

                chart: {
                    type: 'bubble',
                    plotBorderWidth: 1,
                    zoomType: 'xy'
                },

                title: {
                    text: 'Highcharts bubbles with radial gradient fill'
                },

                xAxis: {
                    gridLineWidth: 1
                },

                yAxis: {
                    startOnTick: false,
                    endOnTick: false
                },

                series: [{
                    data: dataSpanUniv,
                    marker: {
                        fillColor: {
                            radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                            stops: [
                                [0, 'rgba(255,255,255,0.5)'],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
                            ]
                        }
                    }
                }, {
                    data: dataMotoGp,
                    marker: {
                        fillColor: {
                            radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                            stops: [
                                [0, 'rgba(255,255,255,0.5)'],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
                            ]
                        }
                    }
                }]

            });


        });

    });
}]);
