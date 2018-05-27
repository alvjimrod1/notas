/* global angular */
/* global AmCharts */


angular.module("AppManager").controller("worldBankCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    //  var api = "http://api.worldbank.org/v2/datacatalog?format=json";

    var api = "https://api.nasa.gov/planetary/earth/imagery/?lon=-5&lat=37&date=2017-02-01&cloud_score=True&api_key=zsS2DYYqAlbRGl0Z95uk3YNgj1r8KyfFLNkGD8iS";

    $http.get(api).then(function(response) {

        var responseData = (response.data);

        console.log(responseData);
console.log("HOLA")


        var resultado = []
                responseData.map(function(i) {
                    resultado.push([i['url']]);

                });
        



















        /*CHARTS*/





        /*FINAL CHATS */
    });



}]);
