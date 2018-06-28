/* global angular */
angular
    .module("AppManager", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider

            .when("/", {
                templateUrl: "notasList.html",
                controller: "notasListCtrl"
            })
            .when("/:asignatura/:anyo", {
                templateUrl: "notasEdit.html",
                controller: "notasEditCtrl"
            })
            .when("/graphs", {
                templateUrl: "notasGraph.html",
                contoller: "notasGraphCtrl"
                /*ALVARO*/
            });
    });
