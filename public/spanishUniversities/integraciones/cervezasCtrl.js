/* global angular */
/* global AmCharts */


angular.module("AppManager").controller("cervezasCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    /*LOCAL*/
    // var api = "https://lcboapi.com/products?access_key=MDoyMDNkODc1OC02MDA1LTExZTgtYTA0My1kZjUxYWMxN2Q3YjE6eGlGd2hsQm4zdTVkVkl1dWExcUIzaVFPekFUSHdURkZDaXZj";


    /* HEROKU*/
    var api = "https://lcboapi.com/products?access_key=MDo0ZjY5ZWQwMi02MTkzLTExZTgtODFlYi1iMzQ2OWRkNGU4YTA6aGhBVmJMNkJkSTNuWGNJeW5GRkk2ZHo4S3FyUWZUakRnZlhY";

    $http.get(api).then(function(response) {
        var volumenInventario = [];

        var responseData = (response.data.result);
        console.log(response.data)
        //  console.log(responseData)
        console.log(responseData)

        responseData.map(function(i) {
            volumenInventario.push([i['name'], i['inventory_volume_in_milliliters']]);
        });
        console.log("volumenInventario");
        console.log(volumenInventario);


        var res = [];
        for (var i = 0; i < volumenInventario.length; i++) {
            res.push({ "label": volumenInventario[i][0], "value": volumenInventario[i][1] });

        }

        console.log("RES")
        console.log(res)



        /*CHARTS*/
        FusionCharts.ready(function() {
            var wealthChart = new FusionCharts({
                type: 'pyramid',
                renderAt: 'chart-container',
                id: 'wealth-pyramid-chart',
                width: '100%',
                height: '450',

                dataFormat: 'json',
                dataSource: {
                    "chart": {
                        "bgcolor": "FFFFFF,FFFFFF",
                        "caption": "Liquor Control Board of Ontario (Canada).",
                        "captionOnTop": "0",
                        "captionPadding": "25",
                        "alignCaptionWithCanvas": "1",
                        "subcaption": "Marcas",
                        "borderAlpha": "20",
                        "is2D": "0",
                        "plotFillAlpha": "70",
                        "showValues": "1",
                        "plotTooltext": "$label: $value milliliters",

                        "showPercentValues": "1",
                        "chartLeftMargin": "40",
                        //Setting the legend visibility to true
                        "showlegend": "1",
                        "theme": "hulk-light"
                    },
                    "data": res.reverse()
                }
            }).render();
        });






        /*FINAL CHATS */
    });



}]);
