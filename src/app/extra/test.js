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
var something = [35,66, 66, 75, 85, 88, 88,66, 88, 90, 100, 66, 55, 66];
something.sort(function(a,b) {

  return b - a
});
var rank = [];
var count = 0;
for(var i =0; i< something.length; i++){
  if(something[i] === something[i -1] || something[i+1] === something[i]){
    
      var x = i + 1 - count;
      //console.log(count);
      rank.push(x)
    count++;
  }else{
    rank.push(i+1);
    count = 0;
  }
  //console.log(rank);

}

$scope.rank = function(){
  // angular.forEach(players, function(k){
  //   var something = [];
  //   var points = k.Points;
  //   something.push(points);
  //   something.sort(function(a,b){return b-a});
  //   console.log(something);
  // })
console.log();
}
  
  // if(something[i] === something[i-1] && something[i] === something[i-2]&& something[i] === something[i-3]){
  //   rank.push(i-2);
    
  // }else if( something[i] === something[i-1] && something[i] === something[i-2]){
  //   rank.push(i-1)
    
  // }else if(something[i] === something[i-1]){
  //   rank.push(i);
  // }else{
  //   rank.push(i+1);
  // }
  




$scope.players = $firebaseArray(FirebaseUrl.child('leaderboard'));

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

// orderby example see if this will work
var shiz = new Firebase('https://fireseedangular.firebaseio.com/team');
shiz.orderByChild('name').on('child_added', function(snap){
//console.log(snap.val().name);

});
});
