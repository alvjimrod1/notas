/* global angular */
/* global AmCharts */

angular.module("AppManager").controller("cervezasCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    var api = "https://lcboapi.com/products?access_key=MDoyMDNkODc1OC02MDA1LTExZTgtYTA0My1kZjUxYWMxN2Q3YjE6eGlGd2hsQm4zdTVkVkl1dWExcUIzaVFPekFUSHdURkZDaXZj";
    // var api = "https://simple-weather.p.mashape.com/weatherdata?lat=" + $scope.lat + "&lng=" + $scope.long;
    $http.get(api).then(function(response) {
        var nombres = [];
http://api.citybik.es/v2/networks/?fields=location?
        var volumenInventario = [];
        var precioInventario = [];
        var responseData = (response.data.result.slice(0, 9));
        console.log(responseData)
        console.log(response.data.result)



        responseData.map(function(i) {
            volumenInventario.push([i['id']]);
        });
        var refinado = [];
        for (var i = 0; i < volumenInventario.length; i++) {
            if (volumenInventario.alcohol_content == 500)
                refinado.push(i);
        }
        console.log("refinados")
        console.log(refinado)



        responseData.map(function(i) {
            nombres.push([i['name']]);
        });

        /*CHARTS*/
        var basic = new Datamap({
            element: document.getElementById("basic")
        });
        /*FINAL CHATS */
    });



}]);
