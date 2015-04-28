'use strict';
angular.module('fantasy')
.controller('SearchCtrl', function(FirebaseUrl, $firebaseObject, $stateParams, Auth, $firebaseArray){
  var self = this;
  // Load `Teams` and set-up current user
  this.currentUser = $firebaseArray(FirebaseUrl.child('users').child($stateParams.id));
  Auth.onAuth(function(user){
    self.user = user;
  });

  // Get  `Players`
  this.players = $firebaseObject(FirebaseUrl.child('leaderboard'));

  // Get `Teams`
  this.teams = $firebaseObject(FirebaseUrl.child('teamUsers'));

  // Add `Player` to `Team`
  this.addPlayer = function(player){
    // Send `Player` to `include` function
    this.include(player);
  };
  this.include = function(player){
    // Set up a counter to only add 5 players to a team
    FirebaseUrl.child('userTeam').child(self.user.uid).child('counter')
    .transaction(function(id){
      if(id >= 5){
        // CHANGE TO ALERT
        console.log('Thats enough players');
      }else{
        console.log(id);
        return(id||0)+1;
      }
    }, function(err, committed, ss){
      if(err){
        console.log(err);
      }else if(committed){
        var id = ss.val();
        if(id <= 5){
          var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid)
          .child('team');
          var teamUser = FirebaseUrl.child('teamUser');

          // Update both `userTeam` and `teamUser` with `Players`
          userTeam.update({
            name:player.Name
          });

          teamUser.update({
            name:player.Name
          });
        }
      }
    });
  };
});