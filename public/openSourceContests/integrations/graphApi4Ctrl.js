/* global angular */
/* global Highcharts */
/* global google */
/* global Chartist */

angular.module("AppManager").controller("GraphApi4Ctrl", ["$scope", "$http", "$routeParams",
    function($scope, $http, $routeParams) {
        var api = "http://ergast.com/api/f1/drivers.json?limit=1000";

        console.log("graph API 4 Ctrl initialized!");

        $http.get(api).then((response) => {

            let hc_aux = [];


            response.data.MRData.DriverTable.Drivers.forEach(e => {
                hc_aux.push([e.driverId, new Date(e.dateOfBirth), new Date(e.dateOfBirth)])
            });

            google.charts.load('current', { 'packages': ['timeline'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Team');
                data.addColumn('date', 'Season Start Date');
                data.addColumn('date', 'Season End Date');

                data.addRows(hc_aux);

                var options = {
                    height: 450,
                    timeline: {
                        groupByRowLabel: true
                    }
                };

                var chart = new google.visualization.Timeline(document.getElementById('chart_div'));

                chart.draw(data, options);
            }
        });
    }
]);
