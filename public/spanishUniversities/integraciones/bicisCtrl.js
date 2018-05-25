/* global angular */
/* global AmCharts */

angular.module("AppManager").controller("bicisCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");

    var api = "http://api.citybik.es/v2/networks/";

    $http.get(api).then(function(response) {

        /*CHARTS*/

        var map = AmCharts.makeChart("chartdiv", {
            "type": "map",
            "theme": "light",
            "dataProvider": {
                "map": "worldLow",
                "zoomLevel": 20,
                "zoomLongitude": -5,
                "zoomLatitude": 40,
                "images": []
            },

            "imagesSettings": {
                "labelRollOverColor": "#000",
                "labelPosition": "bottom"
            },

            "areasSettings": {
                "rollOverOutlineColor": "#FFFFFF",
                "rollOverColor": "#CC0000",
                "alpha": 0.8
            },

            "export": {
                "enabled": true
            }
        });


        /*FINAL CHATS */
    });

    $scope.getBicis = function() {
        Array.prototype.unique = function(a) {
            return function() { return this.filter(a) }
        }(function(a, b, c) {
            return c.indexOf(a, b + 1) < 0
        });



        var api = "http://api.citybik.es/v2/networks/";
        var res = [];
        var a = [];

        $http.get(api).then(function(response) {

            var responseData = (response.data.networks);
            console.log(responseData);
            var marcas = [];
            responseData.map(function(i) {
                if (i['location']['country'] == "ES" && i['name'] == $scope.marca) {
                    res.push([i['name'], i['location']['latitude'], i['location']['longitude'], i['location']['city']]);
                    marcas.push(i['name']);
                }
            });
            var prueba = $scope.marca;
            console.log("PRUEBA")
            console.log(prueba);

            console.log("MARCAS");
            console.log(marcas.unique());
            console.log(res);
            var a = [];

            for (var i = 0; i < res.length; i++) {
                // if (res[i][0] == "Onroll")
                a.push({ "latitude": res[i][1], "longitude": res[i][2], "imageURL": "https://cdn.icon-icons.com/icons2/38/PNG/512/bicycle_bike_4531.png", "width": 35, "height": 35, "label": res[i][0] });
            }

            /*CHARTS*/

            var map = AmCharts.makeChart("chartdiv", {
                "type": "map",
                "theme": "light",
                "dataProvider": {
                    "map": "worldLow",
                    "zoomLevel": 20,
                    "zoomLongitude": -5,
                    "zoomLatitude": 40,
                    "images": a.unique()
                },

                "imagesSettings": {
                    "labelRollOverColor": "#000",
                    "labelPosition": "bottom"
                },

                "areasSettings": {
                    "rollOverOutlineColor": "#FFFFFF",
                    "rollOverColor": "#CC0000",
                    "alpha": 0.8
                },

                "export": {
                    "enabled": true
                }
            });


            /*FINAL CHATS */
        });


    };
}]);
