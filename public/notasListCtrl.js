 /* global angular */
 /* global $ */
 angular.module("AppManager").controller("notasListCtrl", ["$scope", "$http", function($scope, $http) {
  console.log("List Ctrl initialited");
  var api = "/api/v1/notas";


  $scope.addUniv = function() {
   $http.post(api, $scope.newUniv).then(function successCallback(response) {
    $('#added').modal('show');
    getSpanishUniversities();
   }, function errorCallback(response) {
    console.log(response.status);
    if (response.status == 400) {
     $('#fail_400').modal('show');
    }
    if (response.status == 409) {
     $('#fail_409').modal('show');
    }
   });
   delete $scope.newUniv;
   getSpanishUniversities();


  };

  $scope.deleteUniv = function(asignatura) {
   console.log("Asignatura has been deleted: " + asignatura);
   $http.delete(api + "/" + asignatura).then(function(response) {
    $('#deleted').modal('show');
    getSpanishUniversities();
   });
  };

  $scope.deleteAllUnivs = function() {
   $('#deleteAll').modal('show');
   var $btn = $('#yes');
   $btn.on("click", function() {
    $http.delete(api);
    getSpanishUniversities();

   });

   getSpanishUniversities();

  };
  $scope.deleteAllUnivs2 = function() {
   $('#confirm').modal('show');
   getSpanishUniversities();

  };



  function getSpanishUniversities() {

   $http.get(api).then(function(response) {
    $scope.univs = response.data;
   });

  };




  getSpanishUniversities();


 }]);
 