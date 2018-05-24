/* global angular */
/* global Highcharts */
/* global c3 */

angular.module("AppManager").controller("aireCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    //var api = "https://simple-weather.p.mashape.com/weatherdata?lat=" + 37.3890924 + "&lng=" + -5.984458899999936;
    var api = "/proxyAJR1/api/v1/get/?language=spanish&callback=?";

    // http: //www.etnassoft.com/api/v1/get/?id=589&callback=?
    $scope.lat = 37.3890924;
    $scope.long = -5.984458899999936;

    $http.get(api).then(function(response) {
        var res = [];
        var responseData = JSON.stringify(response.data);

        console.log(responseData);

        /*
                responseData.map(function(i) {
                    res.push([i['name'], parseInt(i['height'])]);
                });
                console.log("Aqui vemos el res");
                console.log(res);

        */

    });



}]);
