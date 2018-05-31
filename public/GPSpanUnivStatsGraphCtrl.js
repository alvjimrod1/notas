/* global angular */
/* global $ */
/* global Highcharts */
/* global google */
/* global Chartist */
/* global CanvasJS */
/* global AmCharts */

angular.module("AppManager").controller("GPSpanUnivStatsGraphCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph Controller Initialized!");
    var apiSpanUnivStats = "/api/v2/span-univ-stats";
    var apiGP = "/proxyGP/api/v1/motogp-stats";
    var apiDayNames = "/proxyDayNames/get/namedays?day=30&month=5&country=es";
    var apiJobs = "/proxyJobs/positions.json?description=java&location=spain";
    var apiAttacks = "/proxyAttacks/api/v1/attacks-data";
    var apiBaseball = "/proxyBaseball/api/v2/baseball-stats";


    $scope.return = function() {
        $location.path("/spanUnivStats");
    };


    /* CHARTS */

    /* eliminar elementos duplicados*/

    Array.prototype.unique = function(a) {
        return function() { return this.filter(a) }
    }(function(a, b, c) {
        return c.indexOf(a, b + 1) < 0
    });

    /*ordenar array*/

    Array.prototype.sortNumbers = function() {
        return this.sort(
            function(a, b) {
                return a - b
            }
        );
    }




    var years = [];


    /* SPANISH UNIVERSITIES STATS*/
    $http.get(apiSpanUnivStats).then(function(responseSpanUnivStats) {

        var totalScore = [];
        var totalEnrolledNumber = [];

        for (var i = 0; i < responseSpanUnivStats.data.length; i++) {
            years.push(responseSpanUnivStats.data[i].year);

        }









        /*  1) GP STATS */


        $http.get(apiGP).then(function(responseGP) {


            for (var i = 0; i < responseGP.data.length; i++) {
                years.push(responseGP.data[i].year);

            }


            var dataSpanUniv = [];
            var dataMotoGp = [];
            var newDataSpanUniv = [];
            var newDataMotoGp = [];

            for (var i = 0; i < years.sortNumbers().unique().length; i++) {
                var yearEnrolledNumber = 0;
                var yearScore = 0;
                var actualYear = years.sortNumbers().unique()[i];


                for (var j = 0; j < responseSpanUnivStats.data.length; j++) {
                    if (responseSpanUnivStats.data[j].year == actualYear) {
                        yearEnrolledNumber += responseSpanUnivStats.data[j].enrolledNumber;

                    }
                }
                newDataSpanUniv = [actualYear, yearEnrolledNumber, 10];
                dataSpanUniv.push(newDataSpanUniv);

                for (var j = 0; j < responseGP.data.length; j++) {
                    if (responseGP.data[j].year == actualYear) {
                        yearScore += responseGP.data[j].score;
                    }
                }
                newDataMotoGp = [actualYear, yearScore, 10];
                dataMotoGp.push(newDataMotoGp);


            }




            /* HIGHCHART */


            Highcharts.chart('gpSpanUnivStats', {

                chart: {
                    type: 'bubble',
                    plotBorderWidth: 1,
                    zoomType: 'xy'
                },

                title: {
                    text: 'MotoGPApi and SpanUnivStatsApi Integration'
                },

                xAxis: {
                    gridLineWidth: 1
                },

                yAxis: {
                    startOnTick: false,
                    endOnTick: false
                },

                series: [{
                    data: dataSpanUniv,
                    marker: {
                        fillColor: {
                            radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                            stops: [
                                [0, 'rgba(255,255,255,0.5)'],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
                            ]
                        }
                    }
                }, {
                    data: dataMotoGp,
                    marker: {
                        fillColor: {
                            radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                            stops: [
                                [0, 'rgba(255,255,255,0.5)'],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
                            ]
                        }
                    }
                }]

            });


        });









        /* 2) DAYNAMES API */


        $http.get(apiDayNames).then(function(responseDayNames) {


            console.log("responseDayNames: ", responseDayNames.data.data["name_es"]);


            var objectDayNames = {};
            var namesNumber = responseDayNames.data.data["name_es"].split(",").length + 3000;
            objectDayNames["y"] = namesNumber;
            objectDayNames["name"] = "Names";

            var objectSpan = {};
            var fSCycleNumber = responseSpanUnivStats.data[0].firstSecondCycle;
            objectSpan["y"] = fSCycleNumber;
            objectSpan["name"] = "FSCycle";

            var objectList = [];
            objectList.push(objectDayNames);
            objectList.push(objectSpan);


            /* CANVASJS */

            var chart = new CanvasJS.Chart("DayNamesChart", {
                theme: "light2",
                exportFileName: "Doughnut Chart",
                exportEnabled: true,
                animationEnabled: true,
                title: {
                    text: "DayNamesApi and SpanUnivStatsApi Integration"
                },
                legend: {
                    cursor: "pointer",
                    itemclick: explodePie
                },
                data: [{
                    type: "doughnut",
                    innerRadius: 90,
                    showInLegend: true,
                    toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
                    indexLabel: "{name} - #percent%",
                    dataPoints: objectList
                }]
            });
            chart.render();

            function explodePie(e) {
                if (typeof(e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
                    e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
                }
                else {
                    e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
                }
                e.chart.render();
            }
        });









        /* 3) JOBS API */

        $http.get(apiJobs).then(function(responseJobs) {
            console.log("responseJobs : ", responseJobs.data);

            var listObjbects = [];

            var objectDegree = {};
            var objectMaster = {};
            var objectJobs = {};

            objectDegree["y"] = responseSpanUnivStats.data[0].degree - 2000;
            objectDegree["label"] = "Degree Number";

            objectMaster["y"] = responseSpanUnivStats.data[0].master + 5500;
            objectMaster["label"] = "Master Number";

            objectJobs["y"] = responseJobs.data.length + 5500;
            objectJobs["label"] = "Java jobs in Spain"

            listObjbects.push(objectDegree, objectMaster, objectJobs);



            /* CANVASJS */


            var chart = new CanvasJS.Chart("jobsChart", {
                animationEnabled: true,
                theme: "light2", //"light1", "dark1", "dark2"
                title: {
                    text: "JobsApi and SpanUnivStatsApi Integration"
                },
                data: [{
                    type: "funnel",
                    indexLabelPlacement: "inside",
                    indexLabelFontColor: "white",
                    toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                    indexLabel: "{label} ({percentage}%)",
                    dataPoints: listObjbects
                }]
            });
            calculatePercentage();
            chart.render();

            function calculatePercentage() {
                var dataPoint = chart.options.data[0].dataPoints;
                var total = dataPoint[0].y;
                for (var i = 0; i < dataPoint.length; i++) {
                    if (i == 0) {
                        chart.options.data[0].dataPoints[i].percentage = 100;
                    }
                    else {
                        chart.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
                    }
                }
            }
        });









        /* 4) ATTACKS API */


        $http.get(apiAttacks).then(function(responseAttacks) {
            console.log("responseAttacks : ", responseAttacks.data);

            var objectList = [];
            var totalMaster = 0;
            var totalInjured = 0;

            for (var i = 0; i < responseSpanUnivStats.data.length; i++) {
                totalMaster += responseSpanUnivStats.data[i].master;
            }

            for (var i = 0; i < responseAttacks.data.length; i++) {
                totalInjured += responseAttacks.data[i].injured;
            }

            var objectAttack = {};
            objectAttack["name"] = "Attacks-TotalInjured";
            objectAttack["open"] = 0;
            objectAttack["close"] = totalInjured;
            objectAttack["color"] = "#169b2f";
            objectAttack["balloonValue"] = totalInjured;


            var objectDiference = {};
            objectDiference["name"] = "Diference";
            objectDiference["open"] = Math.min(totalInjured, totalMaster);
            objectDiference["close"] = Math.max(totalInjured, totalMaster);
            objectDiference["color"] = "#1c8ceb";
            objectDiference["balloonValue"] = Math.abs(totalInjured - totalMaster);


            var objectSpanUniv = {};
            objectSpanUniv["name"] = "SpanUnivStats-TotalMaster";
            objectSpanUniv["open"] = 0;
            objectSpanUniv["close"] = totalMaster;
            objectSpanUniv["color"] = "#1c8ceb";
            objectSpanUniv["balloonValue"] = totalMaster;


            objectList.push(objectAttack, objectDiference, objectSpanUniv);



            /* AMCHART */

            var chart = AmCharts.makeChart("attackChart", {
                "type": "serial",
                "theme": "light",
                "dataProvider": objectList,
                "valueAxes": [{
                    "axisAlpha": 0,
                    "gridAlpha": 0.1,
                    "position": "left"
                }],
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "<span style='color:[[color]]'>[[category]]</span><br><b>$[[balloonValue]] Mln</b>",
                    "colorField": "color",
                    "fillAlphas": 0.8,
                    "labelText": "$[[balloonValue]]",
                    "lineColor": "#BBBBBB",
                    "openField": "open",
                    "type": "column",
                    "valueField": "close"
                }],
                "trendLines": [{
                    "dashLength": 3,
                    "finalCategory": "Income B",
                    "finalValue": 11.13,
                    "initialCategory": "Income A",
                    "initialValue": 11.13,
                    "lineColor": "#888888"
                }, {
                    "dashLength": 3,
                    "finalCategory": "Expenses A",
                    "finalValue": 15.81,
                    "initialCategory": "Income B",
                    "initialValue": 15.81,
                    "lineColor": "#888888"
                }, {
                    "dashLength": 3,
                    "finalCategory": "Expenses B",
                    "finalValue": 12.92,
                    "initialCategory": "Expenses A",
                    "initialValue": 12.92,
                    "lineColor": "#888888"
                }, {
                    "dashLength": 3,
                    "finalCategory": "Revenue",
                    "finalValue": 8.64,
                    "initialCategory": "Expenses B",
                    "initialValue": 8.64,
                    "lineColor": "#888888"
                }],
                "columnWidth": 0.6,
                "categoryField": "name",
                "categoryAxis": {
                    "gridPosition": "start",
                    "axisAlpha": 0,
                    "gridAlpha": 0.1
                },
                "export": {
                    "enabled": true
                }
            });

        });









        /* 4) BASEBALL API */


        $http.get(apiBaseball).then(function(responseBaseball) {

            console.log("responseBaseball  : ", responseBaseball.data);

            var years = [];
            var dateYear = 0;

            responseSpanUnivStats.data.forEach((stat) => {
                years.push(stat.year);
            });
            responseBaseball.data.forEach((stat) => {
                dateYear = parseInt(stat.date.substr(0, 4));
                years.push(dateYear);
            });

            years = years.sortNumbers().unique();

            var degreeYear = [];
            var hitYear = [];
            var totalDegree = 0;
            var totalHit = 0;

            years.forEach((y)=>{
               totalDegree=0;
               responseSpanUnivStats.data.forEach((stat)=>{
                   if(stat.year == y ){
                       totalDegree += stat.degree;
                   }
               });
               degreeYear.push([y,totalDegree]);
               totalHit=0;
               responseBaseball.data.forEach((bs)=>{
                  if(parseInt(bs.date.substr(0,4))==y){
                      totalHit += parseInt(bs.hit);
                  } 
               });
               hitYear.push([y,totalHit]);
            });

            

            /* AMCHART */


            var chart = AmCharts.makeChart("baseballChart", {
                "type": "radar",
                "theme": "light",
                "dataProvider": [],
                "valueAxes": [{
                    "gridType": "circles",
                    "minimum": 0
                }],
                "startDuration": 1,
                "polarScatter": {
                    "minimum": 0,
                    "maximum": 2018,
                    "step": 1
                },
                "legend": {
                    "position": "right"
                },
                "graphs": [{
                    "title": "SpanUnivStats Degree",
                    "balloonText": "[[category]]: [[value]] ",
                    "bullet": "round",
                    "lineAlpha": 0,
                    "series": degreeYear
                }, {
                    "title": "Baseball Hit",
                    "balloonText": "[[category]]: [[value]] ",
                    "bullet": "round",
                    "lineAlpha": 0,
                    "series": hitYear
                }],
                "export": {
                    "enabled": true
                }
            });

        });


    });
}]);
