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
  var par = [];
  var score = [];
  par[0] = '4';
  par[1] = '5';
  par[2] = '4';
  par[3] = '5';
  par[4] ='3';
  par[5] = '4';
  par[6] = '3';
  par[7] = '5';
  par[8] = '4';
  score[0] = '3';
  score[1] = '4';
  score[2] = '4';
  score[3] = '6';
  score[4] = '5';
  score[5] = '3';
  score[6] = '4';
  score[7] = '5';
  score[8] = '5';

  $scope.points = [];
  $scope.movies = [];
  for(var i=0; i<score.length; i++){
    $scope.movies[i] = {
      par:par[i],
      score:score[i],
      points:par[i]-score[i],
      };

    // 0 points for par
    // 1 point for birdie
    // 3 points for eagle
    // -1 point for bogie
    // -2 points for double or worse
  }

 })
 // adds together all the points
 .filter('sumOf', function(){
   return function(data, key){
     var sum = 0;
     for (var i=0; i<data.length; i++){
       sum = sum + data[i][key];
     }return sum;
   };
 });
// .filter('sumOf', function(){
//   return function(data, key){
//     var sum = 0;
//     for(var i = 0; i<data.length; i++){
//       sum = sum + data[i][key];
//
//     }return sum;
//   };
// })
// .filter('totalSum', function(){
//   return function(data, key1, key2){
//     var sum = 0;
//     for(var i = 0; i< data.length; i++){
//       sum = sum +(data[i][key1] - data[i][key2]);
//     }return sum;
//   };
