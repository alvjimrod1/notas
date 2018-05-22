/* global angular */
/* global Highcharts */


angular.module("AppManager").controller("spa_studentsCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    var api = "/api/v2/spanish-universities";
    var api2 = "https://sos1718-08.herokuapp.com/api/v2/crimes-an";


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

    var total = [];
    var comunidades = [];
    var provincesMaria = [];

    $http.get(api).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            comunidades.push(response.data[i].autCommunity);

        }
        // var totalPublicas = [];
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
            for (var i = 0; i < response.data.length; i++) {
                provincesMaria.push(response.data[i].province);
            }
            console.log("PROVINCES Maria: " + provincesMaria.sort().unique());

            var int2 = [];
            for (var i = 0; i < provincesMaria.unique().length; i++) {
                var cont = 0;

                for (var j = 0; j < response.data.length; j++) {
                    if (response.data[j].province == provincesMaria.sort().unique()[i] && response.data[j].year == 2007) {
                        if (response.data[j].province = 0) {
                            cont = response.data[j].onecrime;
                        }
                        else {
                            cont += response.data[j].onecrime;
                        }
                    }
                }

                int2.push(cont);
                total.push([provincesMaria.sort().unique()[i], cont]);
            }

            console.log("INT2 = " + int2);
            console.log(provincesMaria.unique());
            console.log(total);

            console.log("tmaño de alvaro : " + int.length);
            var aux = [];

            for (var i = 0; i < int.length; i++) {
                aux.push(null);
            }


            ///HIGHCHARTS 2///

            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawSeriesChart);

            function drawSeriesChart() {

                var data = google.visualization.arrayToDataTable([
                    ['ID', 'Life Expectancy', 'Fertility Rate', 'Region', 'Population'],
                    ['CAN', 80.66, 1.67, 'North America', 33739900],
                    ['DEU', 79.84, 1.36, 'Europe', 81902307],
                    ['DNK', 78.6, 1.84, 'Europe', 5523095],
                    ['EGY', 72.73, 2.78, 'Middle East', 79716203],
                    ['GBR', 80.05, 2, 'Europe', 61801570],
                    ['IRN', 72.49, 1.7, 'Middle East', 73137148],
                    ['IRQ', 68.09, 4.77, 'Middle East', 31090763],
                    ['ISR', 81.55, 2.96, 'Middle East', 7485600],
                    ['RUS', 68.6, 1.54, 'Europe', 141850000],
                    ['USA', 78.09, 2.05, 'North America', 307007000]
                ]);

                var options = {
                    title: 'Correlation between life expectancy, fertility rate ' +
                        'and population of some world countries (2010)',
                    hAxis: { title: 'Life Expectancy' },
                    vAxis: { title: 'Fertility Rate' },
                    bubble: { textStyle: { fontSize: 11 } }
                };

                var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
                chart.draw(data, options);
            }



        });
    });

}]);
