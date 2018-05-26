/* global angular */
/* global Highcharts */
/* global c3 */

angular.module("AppManager").controller("starWarsCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    var api2 = "https://swapi.co/api/people";


    var starWarsData = [];

    $http.get(api2).then(function(response) {
        var res = [];
        var responseData = response.data.results;

        console.log(responseData);


        responseData.map(function(i) {
            res.push([i['name'], parseInt(i['height'])]);
        });
        console.log("Aqui vemos el res");
        console.log(res);


        for (var h = 0; h < res.length; h++) {
            starWarsData.push(res[h]);
        }
        console.log("Aqui el starData");
        console.log(starWarsData);

/*C3 charts */
        var chart = c3.generate({
            data: {
                columns: starWarsData.sort(function(a, b) {
                    return (a.slice(1) - b.slice(1));
                }).reverse(),
                type: 'gauge',
                onclick: function(d, i) { console.log("onclick", d, i); },
                onmouseover: function(d, i) { console.log("onmouseover", d, i); },
                onmouseout: function(d, i) { console.log("onmouseout", d, i); }
            },
            gauge: {
                label: {
                    format: function(value, ratio) {
                        return value;
                    },
                    //            show: false // to turn off the min/max labels.
                },
                //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
                max: 202, // 100 is default
                //   units: ' %',
                width: 150 // for adjusting arc thickness
            },
            color: {
                pattern: ['#088A68', '#8181F7', '#FF0000', '#F97600', '#F6C600', '#60B044', '#0040FF', '#FE2EF7', '#848484'], // the three color levels for the percentage values.
                threshold: {

                    values: [100, 150, 160, 170, 180, 190, 200, 210]
                }
            },
            size: {
                height: 300
            }
        });



    });


}]);
