/* global angular */
/* global AmCharts */


angular.module("AppManager").controller("nasaCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    //  var api = "http://api.worldbank.org/v2/datacatalog?format=json";


    $scope.getFecha = function() {
        var fecha = $scope.fecha;
        //2014-5-9

        console.log(fecha);
        var api = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + fecha + "&api_key=zsS2DYYqAlbRGl0Z95uk3YNgj1r8KyfFLNkGD8iS";
        var urls = [];
        $http.get(api).then(function(response) {

            var responseData = (response.data.photos);

            console.log(responseData);
            console.log("HOLA");


            responseData.map(function(i) {
                urls.push([i['img_src'], i['camera']['name']]);

            });
            var FHAZ = [];
            var RHAZ = [];
            var MAST = [];
            var NAVCAM = [];

            for (var i = 0; i < urls.length; i++) {
                if (urls[i][1] == "FHAZ") {
                    FHAZ.push(urls[i]);
                }
                else if (urls[i][1] == "RHAZ") {
                    RHAZ.push(urls[i]);
                }
                else if (urls[i][1] == "MAST") {
                    MAST.push(urls[i]);
                }
                else if (urls[i][1] == "NAVCAM") {
                    NAVCAM.push(urls[i]);
                }

            }


            console.log(urls);
            console.log("FHAZ");
            console.log(FHAZ);
            console.log("RHAZ");
            console.log(RHAZ);
            console.log("MAST");
            console.log(MAST);
            console.log("NAVCAM");
            console.log(NAVCAM);
            console.log("PRRRRRRRRRRUEBA DE SLIP");
            console.log(FHAZ[0][0])
            console.log(FHAZ[0][0].substring(25, 200));


            /*CHARTS*/
            var myConfig = {

                "backgroundImage": "/proxyAJR2/" + FHAZ[0][0].substring(25, 200),
                "title": {
                    "text": "FHAZ",
                    "font-color": "#FFF"
                },

            };

            zingchart.render({
                id: 'myChart',
                data: myConfig,
                height: 300,
                width: 525
            });
            /*
            var myConfig2 = {
                "backgroundImage": "/proxyAJR2/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FRB_486265257EDR_F0481570FHAZ00323M_.JPG",
                "title": {
                    "text": "Heat Map",
                    "font-color": "#FFF"
                },

            };

            zingchart.render({
                id: 'myChart2',
                data: myConfig2,
                height: 300,
                width: 525
            });

*/

            /*FINAL CHATS */
        });

    }

}]);
