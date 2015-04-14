'use strict';
angular.module('fantasy')
.controller('TestCtrl',function($scope, $http){
  $http.get('app/helper/test.json').success(function(data){
    $scope.countries = data;
  });
  $http.get('app/helper/playerTest.json').success(function(data){
    $scope.players = data;
  });
  $scope.name = 'Testing';
  var title = [];
  var link = [];
  title[0] = '4';
  title[1] = '5';
  title[2] = '4';
  title[3] = '5';
  link[0] = '3';
  link[1] = '4';
  link[2] = '4';
  link[3] = '6';

  $scope.movies = [];
  for(var i=0; i<4; i++){
    $scope.movies[i] = {t:title[i], l:link[i], e:title[i]-link[i]};
  }
});
