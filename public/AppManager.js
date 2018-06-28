/* global angular */
angular
    .module("AppManager", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider

            .when("/", {
                templateUrl: "notasList.html",
                controller: "notasListCtrl"
            }).when("/analytics", {
                templateUrl: "analytics.html"
                /*ALVARO*/
            });
    });
