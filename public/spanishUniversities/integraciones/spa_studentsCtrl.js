/* global angular */
/* global Highcharts */
/* global google */
angular.module("AppManager").controller("spa_studentsCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    var api = "/api/v2/spanish-universities";
    var api2 = "https://sos1718-08.herokuapp.com/api/v2/students-an/";


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
    var int = [];
    var googleChartData = [
        ['Province', 'popilliterate', 'pophigheducation', 'popinuniversity']
    ];
    var total = [];
    var comunidades = [];


    $http.get(api).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            comunidades.push(response.data[i].autCommunity);

        }

        /*API MIA */

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

        console.log("INT   " + int);
        console.log("COMUNIDADES.UNIQUE " + comunidades.unique());
        console.log("TOTAL " + total);

        /*API MARIA */
        $http.get(api2).then(function(response) {
            var responseData = response.data;
            var res = [];
            responseData.map(function(i) {
                if (i.year == 2008)
                    res.push([i['province'], i['popilliterate'], i['pophigheducation'], i['popinuniversity']]);
            });

            ///Google Bubble///

            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawSeriesChart);

            for (var h = 0; h < res.length; h++) {
                googleChartData.push(res[h]);
            }
            console.log(googleChartData);

            function drawSeriesChart() {
                var data = google.visualization.arrayToDataTable(googleChartData);

                var options = {
                    title: 'Correlation between communities and studies',
                    hAxis: { title: 'Illiterate rate' },
                    vAxis: { title: 'High education rate' },
                    bubble: { textStyle: { fontSize: 11 } }
                };

                var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
                chart.draw(data, options);



            }
        });
    });

}]);
