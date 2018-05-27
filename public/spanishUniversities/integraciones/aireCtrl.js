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
            res.push([i['nO2Band'], i['o3Band'], i['pM10Band'], i['pM25Band'], i['sO2Band'], i['forecastSummary']]);
        });
        console.log("Aqui vemos el res");
        console.log(res);

        var nO2Band = 0;
        if (res[1][0] == "Low") nO2Band = 25;
        else if (res[1][0] == "Moderate") nO2Band = 50;
        else if (res[1][0] == "High") nO2Band = 75;
        console.log("nO2Band: " + nO2Band);

        var o3Band = 0;
        if (res[1][1] == "Low") o3Band = 25;
        else if (res[1][1] == "Moderate") o3Band = 50;
        else if (res[1][1] == "High") o3Band = 75;
        console.log("o3Band: " + o3Band);

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

        var suma = nO2Band + o3Band + pM10Band + pM25Band + sO2Band;
        console.log("SUMA " + suma);
        console.log(suma / 5);
        var media = suma / 5;

        var t = "";

        if (media < 20)
            t = "Calidad del aire muy buena";
        if (media >= 20 && media < 40)
            t = "Calidad del aire buena";
        if (media >= 40 && media < 60)
            t = "Calidad del aire moderada";
        if (media >= 60 && media < 80)
            t = "Calidad del aire baja";
        if (media >= 80 && media <= 100)
            t = "Calidad del aire muy baja";
        /*CHARTS*/

        zingchart.THEME = "classic";
        var myConfig = {
            "graphset": [{
                "type": "gauge",
                "background-color": "#fff #fff",
                "plot": {
                    "background-color": "#666"
                },
                "plotarea": {
                    "margin": "0 0 0 0"
                },
                "scale": {
                    "size-factor": 1.25,
                    "offset-y": 120
                },

                "scale-r": {
                    "values": "0:100:10",
                    "border-color": "#b3b3b3",
                    "border-width": "2",
                    "background-color": "#eeeeee,#b3b3b3",
                    "ring": {
                        "size": 220,
                        "offset-r": "130px",
                        "rules": [{
                                "rule": "%v >=0 && %v < 20",
                                "background-color": "#348D00"
                            },
                            {
                                "rule": "%v >= 20 && %v < 40",
                                "background-color": "#B1AD00"
                            },
                            {
                                "rule": "%v >= 40 && %v < 60",
                                "background-color": "#FAC100"
                            },
                            {
                                "rule": "%v >= 60 && %v < 80",
                                "background-color": "#EC7928"
                            },
                            {
                                "rule": "%v >= 80",
                                "background-color": "#FB0A02"
                            }
                        ]
                    }
                },
                "series": [{
                    "values": [suma / 5],
                    "animation": {
                        "method": 5,
                        "effect": 2,
                        "speed": 41500
                    }
                }],

                "alpha": 1
            }]
        };
        /*BARRA SOLA*/
        var myConfig2 = {
            "graphset": [{

                "background-color": "#fff #fff",

                "labels": [{
                    "id": "lbl5",
                    "x": "50%",
                    "y": "60%",
                    "width": 600,
                    "offsetX": 0,
                    "textAlign": "center",
                    "font-size": 50,
                    "font-color": "#666",
                    "padding": 30,
                    "anchor": "c",
                    "text": t,
                    "backgroundColor": "#eee",
                    "tooltip": {
                        "padding": 25,
                        "font-size": 15,
                        "font-color": "#eee",
                        "backgroundColor": "#666",
                        "text": res[1][5],
                        "shadow": 0
                    }
                }],
                "alpha": 1
            }]
        };

        zingchart.render({
            id: 'myChart2',
            data: myConfig2,
            height: 80,
            width: 600
        });

        /*-------------------------*/

        zingchart.render({
            id: 'myChart',
            data: myConfig,
            height:400,
            width: 600
        });

    });


}]);
