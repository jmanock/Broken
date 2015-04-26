// 'use strict';
// angular.module('fantasy')
// .controller('TestCtrl',function($scope, $http){
//   $http.get('app/helper/test.json').success(function(data){
//     $scope.countries = data;
//   });
//   $http.get('app/helper/playerTest.json').success(function(data){
//     $scope.players = data;
//   });



//   $scope.name = 'Testing';
//   var par = ['4','5','4','5','3','4','3','4','5'];
//   var score = ['3','3','4','6','6','3','1','4','4'];

//   $scope.points = [];
//   $scope.movies = [];
//   for(var i=0; i<score.length; i++){
//     $scope.movies[i] = {
//       hole:i + 1,
//       par:par[i],
//       score:score[i],
//       points:par[i]-score[i],
//       };
//       // 5 points for a hole in one
//       if($scope.movies[i].score === '1'){
//         $scope.movies[i].points = 5;
//       }
//       // -2 points for double or worse
//       if($scope.movies[i].points <= -2){
//         $scope.movies[i].points = -2;
//       }
//       // 3 points for an eagle
//       if($scope.movies[i].points >= 2 && $scope.movies[i].score !== '1'){
//         $scope.movies[i].points = 3;
//       }

//   }

//  })
//  // adds together all the points
//  .filter('sumOf', function(){
//    return function(data, key){
//      var sum = 0;
//      for (var i=0; i<data.length; i++){
//        sum = sum + data[i][key];

//      }return sum;
//    };
//  });
'use strict';
angular.module('fantasy')
.controller('TestCtrl', function($scope){
$scope.two =[{
  name:'jon'
},{
  name:'brit'
},{
  name:'steve'
},{
  name:'ryan'
},{
  name:'jason'
}];
$scope.one = [{
  name:'brit',
  points:100
},{
  name:'ryan',
  points:200
},{
  name:'steve',
  points:-2
},{
  name:'orange',
  ponts:213
},{
  name:'jason',
  points:300
},{
  name:'jon',
  points:2033
}];
var players = []
angular.forEach($scope.two, function(value, index){
   var name = value.name
  return players.push(name);
  
  });
angular.forEach($scope.one, function(value, index){
console.log(value.name);
console.log(players);
})

})