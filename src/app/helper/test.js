'use strict';
angular.module('fantasy')
.controller('TestCtrl',function($scope, $http){
  $http.get('app/helper/test.json').success(function(data){
    $scope.countries = data;
  });
  $http.get('app/helper/playerTest.json').success(function(data){
    $scope.players = data;
  });
});
