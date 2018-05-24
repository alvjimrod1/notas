/* global angular */
/* global AmCharts */

angular.module("AppManager").controller("aireCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    var api = "https://api.tfl.gov.uk/AirQuality";


    $http.get(api).then(function(response) {
        var res = [
            ['nO2Band', 'o3Band', 'pM10Band', 'pM25Band', 'sO2Band']
        ];
        var responseData = (response.data.currentForecast);

        console.log(responseData);


        responseData.map(function(i) {
            res.push([i['nO2Band'], i['o3Band'], i['pM10Band'], i['pM25Band'], i['sO2Band']]);
        });
        console.log("Aqui vemos el res");
        console.log(res);

        var nO2Band = 0;
        if (res[1][0] == "Low") nO2Band = 25;
        else if (res[1][0] == "Moderate") nO2Band = 50;
        else if (res[1][0] == "High") nO2Band = 75;
        console.log("nO2Band: " + nO2Band)
        var o3Band = 0;
        if (res[1][1] == "Low") o3Band = 25;
        else if (res[1][1] == "Moderate") o3Band = 50;
        else if (res[1][1] == "High") o3Band = 75;
        console.log("o3Band: " + o3Band)
        var pM10Band = 0;
        if (res[1][2] == "Low") pM10Band = 25;
        else if (res[1][2] == "Moderate") pM10Band = 50;
        else if (res[1][2] == "High") pM10Band = 75;

        var pM25Band = 0;
        if (res[1][3] == "Low") pM25Band = 25;
        else if (res[1][3] == "Moderate") pM25Band = 50;
        else if (res[1][3] == "High") pM25Band = 75;

        var sO2Band = 0;
        if (res[1][4] == "Low") sO2Band = 25;
        else if (res[1][4] == "Moderate") sO2Band = 50;
        else if (res[1][4] == "High") sO2Band = 75;


        /*CHARTS*/

        /*nO2Band*/
        AmCharts.makeChart("thermometer1", {
            "type": "serial",
            "dataProvider": [{
                "x": 1,
                "y": 100
            }],
            "categoryField": "x",
            "rotate": true,
            "autoMargins": false,
            "marginLeft": 0,
            "marginRight": 0,
            "marginTop": 0,
            "marginBottom": 0,
            "graphs": [{
                "valueField": "y",
                "type": "column",
                "fillAlphas": 1,
                "fillColors": ["#49cbec", "#f73838"],
                "gradientOrientation": "horizontal",
                "lineColor": "#FFFFFF",
                "showBalloon": false
            }],
            "valueAxes": [{
                "gridAlpha": 0,
                "axisAlpha": 0,
                "stackType": "100%",
                "guides": [{
                    "value": nO2Band,
                    "lineAlpha": 1,
                    "above": true
                }]
            }],
            "categoryAxis": {
                "gridAlpha": 0,
                "axisAlpha": 0
            }
        });


        /*o3Band*/
        AmCharts.makeChart("thermometer2", {
            "type": "serial",
            "dataProvider": [{
                "x": 1,
                "y": 100
            }],
            "categoryField": "x",
            "rotate": true,
            "autoMargins": false,
            "marginLeft": 0,
            "marginRight": 0,
            "marginTop": 0,
            "marginBottom": 0,
            "graphs": [{
                "valueField": "y",
                "type": "column",
                "fillAlphas": 1,
                "fillColors": ["#49cbec", "#f73838"],
                "gradientOrientation": "horizontal",
                "lineColor": "#FFFFFF",
                "showBalloon": false
            }],
            "valueAxes": [{
                "gridAlpha": 0,
                "axisAlpha": 0,
                "stackType": "100%",
                "guides": [{
                    "value": o3Band,
                    "lineAlpha": 1,
                    "above": true
                }]
            }],
            "categoryAxis": {
                "gridAlpha": 0,
                "axisAlpha": 0
            }
        });
        /*pM10Band*/
        AmCharts.makeChart("thermometer3", {
            "type": "serial",
            "dataProvider": [{
                "x": 1,
                "y": 100
            }],
            "categoryField": "x",
            "rotate": true,
            "autoMargins": false,
            "marginLeft": 0,
            "marginRight": 0,
            "marginTop": 0,
            "marginBottom": 0,
            "graphs": [{
                "valueField": "y",
                "type": "column",
                "fillAlphas": 1,
                "fillColors": ["#49cbec", "#f73838"],
                "gradientOrientation": "horizontal",
                "lineColor": "#FFFFFF",
                "showBalloon": false
            }],
            "valueAxes": [{
                "gridAlpha": 0,
                "axisAlpha": 0,
                "stackType": "100%",
                "guides": [{
                    "value": pM10Band,
                    "lineAlpha": 1,
                    "above": true
                }]
            }],
            "categoryAxis": {
                "gridAlpha": 0,
                "axisAlpha": 0
            }
        });

        /*pM25Band*/
        AmCharts.makeChart("thermometer4", {
            "type": "serial",
            "dataProvider": [{
                "x": 1,
                "y": 100
            }],
            "categoryField": "x",
            "rotate": true,
            "autoMargins": false,
            "marginLeft": 0,
            "marginRight": 0,
            "marginTop": 0,
            "marginBottom": 0,
            "graphs": [{
                "valueField": "y",
                "type": "column",
                "fillAlphas": 1,
                "fillColors": ["#49cbec", "#f73838"],
                "gradientOrientation": "horizontal",
                "lineColor": "#FFFFFF",
                "showBalloon": false
            }],
            "valueAxes": [{
                "gridAlpha": 0,
                "axisAlpha": 0,
                "stackType": "100%",
                "guides": [{
                    "value": pM25Band,
                    "lineAlpha": 1,
                    "above": true
                }]
            }],
            "categoryAxis": {
                "gridAlpha": 0,
                "axisAlpha": 0
            }
        });

        /*sO2BAnd*/
        AmCharts.makeChart("thermometer5", {
            "type": "serial",
            "dataProvider": [{
                "x": 1,
                "y": 100
            }],
            "categoryField": "x",
            "rotate": true,
            "autoMargins": false,
            "marginLeft": 0,
            "marginRight": 0,
            "marginTop": 0,
            "marginBottom": 0,
            "graphs": [{
                "valueField": "y",
                "type": "column",
                "fillAlphas": 1,
                "fillColors": ["#49cbec", "#f73838"],
                "gradientOrientation": "horizontal",
                "lineColor": "#FFFFFF",
                "showBalloon": false
            }],
            "valueAxes": [{
                "gridAlpha": 0,
                "axisAlpha": 0,
                "stackType": "100%",
                "guides": [{
                    "value": sO2Band,
                    "lineAlpha": 1,
                    "above": true
                }]
            }],
            "categoryAxis": {
                "gridAlpha": 0,
                "axisAlpha": 0
            }
        });




    });



}]);
