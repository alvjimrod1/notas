/* global angular */
/* global Highcharts */
/* global c3 */

angular.module("AppManager").controller("starWarsCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    var api = "/api/v2/spanish-universities";
    var api2 = "https://swapi.co/api/people";


    var starWarsData = [
     
    ];
    $http.get(api2).then(function(response) {
        var res = [
           
        ]
        var responseData = response.data.results;

        console.log(responseData);


        responseData.map(function(i) {
            res.push([i['name'], parseInt(i['height'])]);
        });
        console.log(res);


        for (var h = 0; h < res.length; h++) {
            starWarsData.push(res[h]);
        }
        console.log(starWarsData);

        var chart = c3.generate({
            data: {
                columns: [
                    //['data', 91.4],['data2',34.2]
                    starWarsData[0],starWarsData[1],starWarsData[2]
                    
                  //  starWarsData

                ],
                type: 'gauge',
                onclick: function(d, i) { console.log("onclick", d, i); },
                onmouseover: function(d, i) { console.log("onmouseover", d, i); },
                onmouseout: function(d, i) { console.log("onmouseout", d, i); }
            },
            gauge: {
                //        label: {
                //            format: function(value, ratio) {
                //                return value;
                //            },
                //            show: false // to turn off the min/max labels.
                //        },
                //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
                max: 200, // 100 is default
                //   units: ' %',
                //    width: 39 // for adjusting arc thickness
            },
            color: {
                pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
                threshold: {
                    //            unit: 'value', // percentage is default
                    //            max: 200, // 100 is default
                    values: [30, 60, 90, 100]
                }
            },
            size: {
                height: 180
            }
        });






    });


}]);
