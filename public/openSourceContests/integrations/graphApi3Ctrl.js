/* global angular */
/* global Highcharts */
/* global google */
/* global Chartist */

angular.module("AppManager").controller("GraphApi3Ctrl", ["$scope", "$http", "$routeParams",
    function($scope, $http, $routeParams) {
        var api = "/proxyRARapi3/data/2.5/forecast?q=Sevilla,ES&appid=b6907d289e10d714a6e88b30761fae22";

        console.log("graph API 3 Ctrl initialized!");

        $http.get(api).then((response) => {

            let hc_aux = [['date', 'Sevilla']];

            response.data.list.forEach(e => {
                hc_aux.push([e.dt_txt, e.wind.speed])
            });

            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = google.visualization.arrayToDataTable(hc_aux);

                var options = {
                    title: 'Velocidad del viento en Sevilla',
                    hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                    vAxis: { minValue: 0 }
                };

                var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
                chart.draw(data, options);
            }



        });
    }
]);
