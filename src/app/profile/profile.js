// 'use strict';
// angular.module('fantasy')
// .controller('SearchCtrl', function(FirebaseUrl, $scope, $firebaseArray, $firebaseObject, $stateParams, Auth){
//
// var self = this;
// // Setup `CurrentUser`
// this.currentUser = $firebaseArray(FirebaseUrl.child('users').child($stateParams.id));
// Auth.onAuth(function(user){
//   self.user = user;
// });
//
//
// // Load `Team`
// this.currentUser.$loaded(function(){
//   self.teams = $firebaseObject(FirebaseUrl.child('userTeam').child($stateParams.id).child('team'));
//   var value = $firebaseObject(FirebaseUrl.child('userTeam').child($stateParams.id).child('count'));
//   value.$loaded(function(data){
//     var show = data.$value;
//     if(show === null){
//       $scope.hide = true;
//     }
//   });
// });
//
// // Load `LeaderBoard`
// this.players = $firebaseArray(FirebaseUrl.child('leaderboard'));
//
//
// // Add the `Player` to the `Team`
// this.add = function(p){
//   $scope.hide=false;
//   this.count(p);
// };
//
// this.count = function(p){
//   // Set-up a `Counter` to limit `Players` added
//   FirebaseUrl.child('userTeam').child(self.user.uid).child('count')
//   .transaction(function(count){
//     if(count === null){
//       count = 0;
//       $scope.hide = true;
//     }
//     if(count >= 5){
//       // Change to an alert or something
//       console.log('That is all the players you can have!');
//     }else{
//       $scope.hide = false;
//       return(count || 0)+1;
//     }
//   },function(err, committed, ss){
//     if(err){
//       console.log(err);
//     }else if(committed){
//       var id = ss.val()-1;
//       console.log(id);
//       var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(p.$id);
//
//       userTeam.update({
//         name: p.Name
//       });
//     }
//   });
// };
//
// // Remove a `Player` from `Team`
// this.removePlayer = function(id){
//   this.remove(id);
// };
//
// this.remove = function(id){
//   FirebaseUrl.child('userTeam').child(self.user.uid).child('count')
//   .transaction(function(id){
//     return(id || 0)-1;
//   }, function(err, committed, ss){
//     if(err){
//       console.log(err);
//     }else if(committed){
//       var i = ss.val();
//       var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(id);
//
//       userTeam.remove();
//       if(i === 0){
//         $scope.hide = true;
//       }
//     }
//   });
// };
//
// // Save the `Team` to call in the `Standings` page
// this.save = function(){
//   // need to change this var name
//   var something = FirebaseUrl.child('teams').child(self.user.fullName).child('team');
//   something.remove();
//   angular.forEach(self.teams, function(s){
//     something.push({
//       player: s.name
//     });
//   });
// };
//
// // Reset the `Team` back to Empty
// this.reset = function(){
//   var something = FirebaseUrl.child('teams').child(self.user.fullName);
//   var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid);
//   $scope.hide = true;
//   userTeam.remove();
//   something.remove();
// };
//
// });// END CONTROLLER
'use strict';
angular.module('fantasy')
.controller('SearchCtrl', function($http, $scope){
  $http.get('app/profile/wgc.json')
  .success(function(something){
    var players = something.Tournament.Players;
     $scope.players = [];
     for(var i = 0; i<players.length; i++){
       $scope.players.push(i);
     }
    var t = [];
    angular.forEach(players, function(x){
      t.push(x.PlayerName);
      return t;
    });

    // Shuffle the players
    function shuffle(array){
      var currentIndex = array.length, temporaryValue, randomIndex;
      while(0 !== currentIndex){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -=1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
    shuffle(t);
    $scope.random = t;


  }); // End of `Get` call

  /* ToDo Front-End
    * Object
      - Should out put A:#, A:#, B:#, B:#, C:#
    * FireBase
      - Save to FireBase
    * Map
      - Numbers to players
  */

  /*
    * Ideas
     - How to get scores
      ~ json file??? (curl every hour?)
  */




var teamA = [];
var teamB = [];
var teamC = [];
$scope.isDisabled = false;
$scope.add = function(t){
  if(t <= 26){
    if(teamA.length < 2){
      teamA.push(t);
    }else{
        console.log('To Many A players!!!');
    }
  }else if(t <= 52){
    if(teamB.length < 2){
      teamB.push(t);
    }else{
      console.log('To Mano B players!!!');
    }
  }else{
    if(teamC < 1){
      teamC.push(t);
    }else{
      console.log('You have a C player!');
    }
  }
  $scope.teamA = teamA;
  $scope.teamB = teamB;
  $scope.teamC = teamC;


  // if(team.length < 5 ){
  //   team.push(t);
  //   this.isDisabled = true;
  //   $scope.team = team;
  // }else{
  //   $scope.isDisabled = true;
  //   console.log('That is Enough players');
  // }
}; // End `Add` Function

})// End controller
.filter('firstName', function(){
  return function(x){
    var parts = x.PlayerName.split(',');
    var first = parts[1]+ ' '+parts[0];
    return first;
  };

})
.filter('secondName', function(){
  return function(x){
    var parts = x.split(',');
    var second = parts[1]+ ' '+ parts[0];
    return second;
  };
});
