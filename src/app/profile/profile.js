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





'use strict';
angular.module('fantasy')
.controller('SearchCtrl', function($http, $scope, Auth, FirebaseUrl, $firebaseArray, $firebaseObject, $stateParams){

   var self = this;
   // Setup `CurrentUser`
   this.currentUser = $firebaseArray(FirebaseUrl.child('users').child($stateParams.id));
   Auth.onAuth(function(user){
   self.user = user;
   });

   this.currentUser.$loaded(function(){
     var team = $firebaseArray(FirebaseUrl.child('userTeam').child(self.user.fullName).child('team'));
      $scope.teams = team;
   });


/*
  ToDo
    ~ Showing the team
      - Need to keep track of the count for a,b,c players
      Ideas???
      ~ pass the count with everything else?
      ~ remove the count with the remove button
      - So you cant add 100 players on a refresh
    ~ Remove button from both Firebase and the count

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
  if(countA<=1){
    countA++;
    $scope.add(p,'A',countA);

  }else{
    console.log('To Many A players');
  }
}; // End `aPlayersAdd` Function

$scope.bPlayersAdd = function(p){
  if(countB<=1){
    countB++;
    $scope.add(p,'B',countB);
  }else{
    console.log('To Many B players');
  }
}; // End `bPlayersAdd` Function

$scope.cPlayersAdd = function(p){
  if(countC<=1){
    countC++;
    $scope.add(p,'C',countC);
  }else{
    console.log('To Many C players');
  }
}; // End `cPlayersAdd`


$scope.add = function(p,x,c){
  var userTeam = FirebaseUrl.child('userTeam').child(self.user.fullName).child('team').child(p);
  userTeam.update({
    Rank:x
  });
  var userTeamCount = FirebaseUrl.child('userTeam').child(self.user.fullName);

  if(x === 'A'){
    userTeamCount.update({
      countA:c
    });
  }else if(x === 'B'){
    userTeamCount.update({
      countB:c
    });
  }else if(x === 'C'){
    userTeamCount.update({
      countC:c
    });
  }

}; // End `Add` Function

$scope.remove = function(obj){
console.log(obj.Rank);
/*
  ~ Need to remove the player √
  ~ Need to adjust the counter of the right letter
*/
var removePlayer = FirebaseUrl.child('userTeam').child(self.user.fullName).child('team').child(obj.$id);

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
