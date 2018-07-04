/* global angular */
angular
    .module("AppManager", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider

            .when("/data", {
                templateUrl: "notasList.html",
                controller: "notasListCtrl"
            })
            .when("/:asignatura/:anyo", {
                templateUrl: "notasEdit.html",
                controller: "notasEditCtrl"
            })
            .when("/", {
                templateUrl: "notasGraph.html",
                controller: "notasGraphCtrl"

            })
            .when("/graphs1", {
                templateUrl: "pa.html",
                controller: "notasGraphCtrl"

            })
            .when("/graphs2", {
                templateUrl: "total.html",
                controller: "notasGraphCtrl"

            }).when("/graphs3", {
                templateUrl: "final.html",
                controller: "finalCtrl"

            });
    });
