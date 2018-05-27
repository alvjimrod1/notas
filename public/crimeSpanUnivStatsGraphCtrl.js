/* global angular */
/* global $ */
/* global Highcharts */
/* global google */
/* global Chartist */

angular.module("AppManager").controller("crimeSpanUnivStatsGraphCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph Controller Initialized!");
    var apiSpanUnivStats = "/api/v2/span-univ-stats";
    var apiCrime = "https://sos1718-07.herokuapp.com/api/v1/global-terrorism-data";
    var apiLibraries = "https://libraries.io/api/platforms"


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
        for (var i = 0; i < responseSpanUnivStats.data.length; i++) {
            years.push(responseSpanUnivStats.data[i].year);

        }


        /* CRIME STATS*/
        $http.get(apiCrime).then(function(responseCrime) {
            console.log(responseCrime.data);

            var totalKills = [];
            var totalEnrolledNumber = [];

            for (var i = 0; i < responseCrime.data.length; i++) {
                years.push(responseCrime.data[i].iyear);

            }

            for (var i = 0; i < years.sortNumbers().unique().length; i++) {
                var yearEnrolledNumber = 0;
                var yearKillsNumber = 0;
                for (var j = 0; j < responseSpanUnivStats.data.length; j++) {
                    if (responseSpanUnivStats.data[j].year == years.sortNumbers().unique()[i]) {
                        yearEnrolledNumber += responseSpanUnivStats.data[j].enrolledNumber;

                    }
                }
                for (var j = 0; j < responseCrime.data.length; j++) {
                    if (responseCrime.data[j].iyear == years.sortNumbers().unique()[i]) {
                        yearKillsNumber += responseCrime.data[j].nkill;
                    }
                }

                totalEnrolledNumber.push(yearEnrolledNumber);
                totalKills.push(yearKillsNumber);

            }




            /*HIGHCHARTS*/

            Highcharts.chart('crimeSpanUnivStats', {
                chart: {
                    type: 'area'
                },
                title: {
                    text: 'FootballStatsApi and SpanUnivStatsApi Integration'
                },
                xAxis: {
                    allowDecimals: false,
                    labels: {
                        formatter: function() {
                            return this.value; // clean, unformatted number for year
                        }
                    },
                    categories: years.sortNumbers().unique()

                },
                yAxis: {
                    title: {
                        text: 'Enrolled and Kills number'
                    },
                },
                tooltip: {
                    pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
                },
                plotOptions: {
                    area: {
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: 'Enrolled Number',
                    data: totalEnrolledNumber

                }, {
                    name: 'Crime Number',
                    data: totalKills
                }]
            });
        });
        
        


        /* LIBRARIES CHART */
        
        $http.get(apiLibraries).then(function(responseLibraries) {
            console.log(responseLibraries.data);
            var degreeNumber=[];
            var projectCount=[];
            var dataSeries = [];
            
            for(var i = 0 ; i < responseSpanUnivStats.data.length ; i++){
                degreeNumber.push(responseSpanUnivStats.data[i].degree);
            }
            for(var j = 0 ; j < responseLibraries.data.length ; j++){
                projectCount.push(responseLibraries.data[j].project_count);
            }
            console.log(projectCount);
            console.log(degreeNumber);
            dataSeries.push(projectCount);
            dataSeries.push(degreeNumber);

            var data = {
                series: dataSeries
            };

            var options = {
                seriesBarDistance: 15
            };

            var responsiveOptions = [
                ['screen and (min-width: 641px) and (max-width: 1024px)', {
                    seriesBarDistance: 10,
                    axisX: {
                        labelInterpolationFnc: function(value) {
                            return value;
                        }
                    }
                }],
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function(value) {
                            return value[0];
                        }
                    }
                }]
            ];

            new Chartist.Bar('.ct-chart', data, options, responsiveOptions);
        });
    });
}]);
