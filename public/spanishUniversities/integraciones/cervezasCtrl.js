/* global angular */
/* global AmCharts */

angular.module("AppManager").controller("cervezasCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    var api = "https://lcboapi.com/products?access_key=MDoyMDNkODc1OC02MDA1LTExZTgtYTA0My1kZjUxYWMxN2Q3YjE6eGlGd2hsQm4zdTVkVkl1dWExcUIzaVFPekFUSHdURkZDaXZj";
    // var api = "https://simple-weather.p.mashape.com/weatherdata?lat=" + $scope.lat + "&lng=" + $scope.long;
    $http.get(api, {

    }).then(function(response) {

        var res = [];
        var responseData = (response.data.result);

        console.log(responseData);


        responseData.map(function(i) {
            res.push([i['name'], i['inventory_volume_in_milliliters']]);
        });
        console.log("Aqui vemos el res");
        console.log(res);




        /*CHARTS*/





        /*FINAL CHATS */
    });



}]);
