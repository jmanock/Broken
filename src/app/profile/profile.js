// 'use strict';
// angular.module('fantasy')
// .controller('SearchCtrl', function(FirebaseUrl, $scope, $firebaseArray, $firebaseObject, $stateParams, Auth){
//

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




'use strict';
angular.module('fantasy')
.controller('SearchCtrl', function($http, $scope, Auth, FirebaseUrl, $firebaseArray, $stateParams){

   var self = this;
   // Setup `CurrentUser`
   this.currentUser = $firebaseArray(FirebaseUrl.child('users').child($stateParams.id));
   Auth.onAuth(function(user){
   self.user = user;
   });
/*
  ToDo
    ~ Save team to firebase
      - Not sure if I want a save button
      - Or just add them when the button is clicked

    ~ Show a better way of the team
    ~ Maybe disable buttons when limit is reached?
      - Undisable if a player is removed
*/
  $http.get('app/profile/log0.json')
  .success(function(data){
    var players = [];
    var nums = data.Tournament.Players;
    angular.forEach(nums, function(x){
      var pName = x.PlayerName;
      var parts = pName.split(', ');
      var first = parts[1]+' '+parts[0];
      players.push(first);
    });

    $http.get('app/profile/fedexStandings.json')
    .success(function(result){
      var fedEx = [];
      angular.forEach(result.tours, function(a){
        angular.forEach(a.years, function(b){
          angular.forEach(b.stats, function(c){
            angular.forEach(c.details, function(e){
              var firstName = e.plrName.first;
              var lastName = e.plrName.last;
              var fullName = firstName + ' ' + lastName;
              fedEx.push(fullName);
            }); // End `E`
          }); // End `C`
        }); // End `B`
      }); // End `A`
      var rankings = [];

      for(var i = 0; i<fedEx.length; i++){
        for(var j = 0; j<players.length; j++){
          if(players[j] === fedEx[i]){
            rankings.push(fedEx[i]);
            players.splice(j,1);

          }
        }
      }

      var aPlayers = rankings.splice(0,25);
      var bPlayers = rankings.splice(26,88);
      var something =  rankings.concat(players);
      var cPlayers = something;

      $scope.aPlayers = aPlayers;

      $scope.bPlayers = bPlayers;

      $scope.cPlayers = cPlayers;
    }); // End `Get FedExStandings`
  }); // End `Get Players`

var teamPlayers = [];
var countA = 0;
var countB = 0;
var countC = 0;
$scope.aPlayersAdd = function(p){
  /*
    ToDo
    ~ Save to FirebaseUrl
    ~ Be able to Add/ Remove players to/from team
      - With the rules already set up
  */
  if(countA<=1){
    countA++;
    $scope.add(p,'A');

  }else{
    console.log('To Many A players');
  }
}; // End `aPlayersAdd` Function

$scope.bPlayersAdd = function(p){
  if(countB<=1){
    countB++;
    $scope.add(p,'B');
  }else{
    console.log('To Many B players');
  }
}; // End `bPlayersAdd` Function

$scope.cPlayersAdd = function(p){
  if(countC<=1){
    countC++;
    $scope.add(p,'C');
  }else{
    console.log('To Many C players');
  }
}; // End `cPlayersAdd`

$scope.add = function(p,x){
  teamPlayers.push({
    Name:p,
    Rank:x
  });
  $scope.team = teamPlayers;
  console.log(teamPlayers);
}; // End `Add` Function

$scope.remove = function(t,x){
  // Have to remove player and add back to count of the letter
  if(t.Rank === 'A'){
    countA--;
  }else if(t.Rank === 'B'){
    countB--;
  }else if(t.Rank === 'C'){
    countC--;
  }
  teamPlayers.splice(x,1);
}; // End `Remove` Function

this.search = 1;
this.setTab = function(tabId){
  this.search = tabId;
};
this.isSet = function(tabId){
  return this.search === tabId;
};

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
