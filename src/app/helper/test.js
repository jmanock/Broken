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
      t:par[i],
      l:score[i],
      e:par[i]-score[i],
      };

    // Add all of `e` together to get the total points
    // title [index] - link [index] = points
    // 0 points for par
    // 1 point for birdie
    // 3 points for eagle
    // -1 point for bogie
    // -2 points for double or worse
  }

 })
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

// .filter('sumOfValue', function(){
//   return function(data, key){
//
//     var sum = 0;
//     for(var i = 0; i<data.length; i++){
//       sum = sum + data[i][key];
//     }return sum;
//   };
// })
// .filter('totalSumPriceQty',function(){
//   return function(data, key1, key2){
//
//
//     var sum = 0;
//     for(var i=0; i<data.length; i++){
//       sum = sum + (data[i][key1]* data[i][key2]);
//     }return sum;
//   };
// })
 // .controller('TestCtrl', function($scope){
 //   $scope.courses =[{
 //     'par': 4,
 //     'score': 3,
 //     'points':'par'-'score'
 //   },{
 //     'par':5,
 //     'score':3,
 //
 //   },{
 //     'par':4,
 //     'score':7,
 //
 //   },{
 //     'par':3,
 //     'score':4,
 //
 //   }];
//   $scope.items = [{
//     "id":1,
//     "details":"test11",
//     "quantity":2,
//     "price":100
//   },{
//     "id":2,
//     "details":"test12",
//     "quantity":5,
//     "price":120
//   },{
//     "id":3,
//     "details":"test3",
//     "quantity":6,
//     "price":170
//   },{
//     "id":4,
//     "details":"test4",
//     "quantity":8,
//     "price":70
//   },{
//     "id":5,
//     "details":"test5",
//     "quantity":2,
//     "price":160
//   },{
//     "id":6,
//     "details":"test6",
//     "quantity":9,
//     "price":100
//   }]
