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
.controller('TestCtrl', function($scope, FirebaseUrl, $firebaseArray, $firebaseObject){

// $scope.two =[{
//   name:'jon'
// },{
//   name:'brit'
// },{
//   name:'steve'
// },{
//   name:'ryan'
// },{
//   name:'jason'
// }];

$scope.one = [{
  name:'jon',
  points:100
},{
  name:'ryan',
  points:100
},{
  name:'steve',
  points:99
},{
  name:'brit',
  points:99
},{
  name:'less',
  points:98
},{
  name:'orange',
  points:97
}];

// This works with test data!!!
// angular.forEach($scope.two, function(item1){
//   angular.forEach($scope.one, function(item2){
//     if(item1.name === item2.name){
//       console.log('winner winner chicke dinner!!!!');
//       item1.points = item2.points
//     }
//   })
// })

// Testing sort and rank 
// This works now!!!
var something = [10,10,20,20,33,34,20,55,55,66,66,20,20];
something.sort(function(a,b) {

  return b - a
});
var rank = [];
var count = 0;
for(var i =0; i< something.length; i++){
  if(something[i] === something[i-1] ){
    var x = i  - count;
    //console.log(count);
    rank.push(x);
    count++;
  }else{
    rank.push(i+1)
    count = 0;
  }
  //console.log(something)
  //console.log(rank)
}

  

var play = $firebaseArray(FirebaseUrl.child('leaderboard'));
var first = [];

// THIS WORKS TO SORT AND SHOW POINTS IN ORDER ***
// *** Now to get the rank to show up ****
play.$loaded(function(data){
  angular.forEach(data, function(plays){
    first.push(plays);
    first.sort(function(a,b){
      return b.Points - a.Points;
    });
  });
var rank = [];
for(var i = 0; i<first.length; i++){
  rank.push(first[i].Points);
}
    for(var i = 0; i<rank.length; i++){
      var count = 0
      if(rank[i] === rank[i-1]){
        var x = i - count;
        count++;
        
      }else{
        x = i + 1;
        count = 0;

      }

    }
    $scope.rank = x;

  

  // THIS SHOWS THE ARRAY OR PRINTS OUT THE LAST NUMBER (WRONG)
  // angular.forEach(first, function(some){
  // // some.rank = newRank;
  // for(var i = 0; i<newRank.length; i++){
  //   //some.rank = newRank[i];
  // }
  // })
  $scope.something = first;
  
  
  
});







var ref = new Firebase('https://fireseedangular.firebaseio.com');
$scope.addPlayer = function(player){
  var team = ref.child('team').child(player.$id);
  team.update({
    name: player.Name
  });

};
var something = $firebaseObject(ref.child('team'));

$scope.removePlayer = function(team){
  
};
// search the teams vs leaderboard to get the points
$scope.teams = something;
something.$loaded(function(data){
  angular.forEach(data, function(team){
    angular.forEach($scope.players, function(player){
      if(team.name === player.Name){
        console.log('why does this work only some time?');
        team.points = player.Points;
      }
    });
  });
});


});
