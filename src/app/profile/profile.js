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

// Make the buttons do something
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
      var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(id);
      var teamUser = FirebaseUrl.child('teamUser').child(self.user.fullName).child(id);

      userTeam.update({
        name: p.Name
      });
      teamUser.update({
        name:p.Name
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
      var teamUser = FirebaseUrl.child('teamUser').child(self.user.fullName).child(id);

      userTeam.remove();
      teamUser.remove();
      console.log(i);
      
    }
  });
};

});