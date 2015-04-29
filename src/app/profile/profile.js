'use strict';
angular.module('fantasy')
.controller('SearchCtrl', function(FirebaseUrl, $firebaseObject, $stateParams, Auth, $firebaseArray){
  var self = this;

  // Setup `currentUser`
  this.currentUser = $firebaseArray(FirebaseUrl.child('users').child($stateParams.id));
  Auth.onAuth(function(user){
    self.user = user;
    
  });

  // Load `Team` if any is there
  this.currentUser.$loaded(function(){
    self.teams = $firebaseObject(FirebaseUrl.child('userTeam').child($stateParams.id).child('team'));
  });

  // Get  `Players`
  this.players = $firebaseArray(FirebaseUrl.child('leaderboard'));

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
          var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(player.$id);
          var teamUser = FirebaseUrl.child('teamUser').child(self.user.fullName).child(player.$id);

          // Update both `userTeam` and `teamUser` with `Players`
          userTeam.update({
            name:player.Name
          });

           teamUser.update({
             name:player.Name,
             points:player.Points
           });
        }
      }
    });
  };

  // Get the `id` and `player` from the `remove` button
  this.removePlayer = function(id, player){
    this.remove(player, id);
  };

  // Remove the `player` and update the `counter`
  this.remove = function(player, id){
    FirebaseUrl.child('userTeam').child(self.user.uid).child('counter').transaction(function(id){
      return(id || 0)-1;
    }, function(err, committed, ss){
      if(err){
        console.log(err);
      }else if(committed){
        var i = ss.val();
        var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(id);
        var teamUser = FirebaseUrl.child('teamUser').child(self.user.fullName).child(id);
        teamUser.remove();
        userTeam.remove();
        console.log(i);
      }
    });
  };
});