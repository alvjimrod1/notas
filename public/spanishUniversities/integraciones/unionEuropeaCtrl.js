/* global angular */
/* global AmCharts */


angular.module("AppManager").controller("unionEuropeaCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    var api = "https://restcountries.eu/rest/v2/regionalbloc/eu";

    $http.get(api).then(function(response) {
        var unionEuropea = [];

        var responseData = (response.data);
        console.log(responseData)


        responseData.map(function(i) {
            unionEuropea.push([i['name'], i['population']]);

        });

        console.log("Paises de la UE");
        console.log(unionEuropea);

        var data = []
        for (var i = 0; i < unionEuropea.length; i++) {
            data.push({ "label": unionEuropea[i][0], "value": unionEuropea[i][1] });

        }

        console.log(data)


        /*FUSION CHARTS*/
        FusionCharts.ready(function() {
            var conversionChart = new FusionCharts({
                type: 'funnel',
                renderAt: 'chart-container',
                width: '700',
                height: '600',
                dataFormat: 'json',
                dataSource: {
                    "chart": {
                        'bgcolor': "#FFFFFF",
                        "decimals": "1",

                        //Filled Funnel Slices 
                        "isHollow": "0",
                        "isSliced": "1",
                        "labelDistance": "65",
                        "plotTooltext": "Specific number of population : $value",
                        "theme": "fint"
                    },
                    "data": data.reverse()

                }
            });

            conversionChart.render();
        });
        /*FINAL CHATS */
    });



}]);
