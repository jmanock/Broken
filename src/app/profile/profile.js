'use strict';
angular.module('fantasy')
.controller('SearchCtrl', function(FirebaseUrl, $scope, $firebaseArray, $firebaseObject, $stateParams, Auth){

var self = this;
// Setup `CurrentUser`
this.currentUser = $firebaseArray(FirebaseUrl.child('users').child($stateParams.id));
Auth.onAuth(function(user){
  self.user = user;
});

// Load `Team`
this.currentUser.$loaded(function(){
  self.teams = $firebaseObject(FirebaseUrl.child('userTeam').child($stateParams.id).child('team'));
});

// Load `LeaderBoard`
this.players = $firebaseArray(FirebaseUrl.child('leaderboard'));

// Add the `Player` to the `Team`
this.add = function(p){
  this.count(p);
};

this.count = function(p){
  // Set up a `Counter` to limit `Players` added
  FirebaseUrl.child('userTeam').child(self.user.uid).child('count')
  .transaction(function(count){
    if(count === null){
      count = 0;
    }
    if(count >= 5){
      console.log('That is all the players you can have');
    }else{
      //console.log(id);
      return(count ||0)+1;
    }
  }, function(err, committed, ss){
    if(err){
      console.log(err);
    }else if(committed){      
      var id = ss.val()-1;
      console.log(id);
      var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(p.$id);
      
      userTeam.update({
        name: p.Name
      });
      
    }
  });
};

this.removePlayer = function(id){
  this.remove( id);
};

this.remove = function(id){
  FirebaseUrl.child('userTeam').child(self.user.uid).child('count').transaction(function(id){
    return(id || 0)-1;
  }, function(err, committed, ss){
    if(err){
      console.log(err);
    }else if(committed){
      var i = ss.val();
      var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(id);

      userTeam.remove();
      
      console.log(i);
      
    }
  });
};

// Save the `Team` into the `Standings` array??
 this.save = function(){
  /* This is used to store the team to be called in the standings page
    * the goal is to be able to get rid of the key value in standings
    WHAT I NEED
      * players
      * user
    PROBLEMS I SEE
      * indexing the different teams
      * not sure what to use, ie array or hash seems like the best idea
      * how to not make it 100 levels deep
      * is it going to work for the standings page 
        * easy to call for points and total
        * also easy to reorder based on rank
      * how long is this going to take would like to be done sometime soon
  */
  angular.forEach(self.teams, function(s){
    console.log(s);
  });
  
 };
});