/* global angular */
/* global Highcharts */
/* global google */
/* global Chartist */

angular.module("AppManager").controller("GraphApi3Ctrl", ["$scope", "$http", "$routeParams",
    function($scope, $http, $routeParams) {
        var api = "https://api.punkapi.com/v2/beers";

        console.log("graph API 3 Ctrl initialized!");

        $http.get(api).then((response) => {

            console.log(response)
    
            let hc_aux = [
                ['Nombre', 'Volumen']
            ];

            response.data.forEach(e => {
                hc_aux.push([e.name, e.abv])
            });

            google.charts.load("current", { packages: ["corechart"] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = google.visualization.arrayToDataTable(hc_aux);

                var options = {
                    title: 'Volumen de alcohol en las cervezas',
                    legend: { position: 'none' },
                };

                var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
                chart.draw(data, options);
            }

        });
    }
]);
