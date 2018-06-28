/* global angular */
/* global $ */
angular.module("AppManager")
    .controller("notasEditCtrl", ["$scope", "$http", "$routeParams", "$location",
        function($scope, $http, $routeParams, $location) {
            console.log("Edit Ctrl initialized!");
            var univUrl = "/api/v1/notas/" + $routeParams.asignatura + "/" + $routeParams.anyo;



            $http.get(univUrl).then(function(response) {
                $scope.updatedUniv = response.data;

            });
            $scope.updateUniv = function() {
                if (Object.values($scope.updatedUniv).includes("")) {
                    $('#missField').modal('show');
                }
                else {
                    $http.put(univUrl, $scope.updatedUniv).then(function(response) {
                        window.alert("Modificado correctamente");
                        $location.path("/");

                    });
                }

            };



        }
    ]);
