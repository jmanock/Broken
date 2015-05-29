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
$scope.hide = true;
// Load `LeaderBoard`
this.players = $firebaseArray(FirebaseUrl.child('leaderboard'));

// Add the `Player` to the `Team`
this.add = function(p){
  $scope.hide=false;
  this.count(p);
};

this.count = function(p){
  // Set-up a `Counter` to limit `Players` added
  FirebaseUrl.child('userTeam').child(self.user.uid).child('count')
  .transaction(function(count){
    if(count === null){
      count = 0;
      $scope.hide = true;
    }
    if(count >= 5){
      // Change to an alert or something
      console.log('That is all the players you can have!');
    }else{
      $scope.hide = false;
      return(count || 0)+1;
    }
  },function(err, committed, ss){
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

// Remove a `Player` from `Team`
this.removePlayer = function(id){
  this.remove(id);
};

this.remove = function(id){
  FirebaseUrl.child('userTeam').child(self.user.uid).child('count')
  .transaction(function(id){
    return(id || 0)-1;
  }, function(err, committed, ss){
    if(err){
      console.log(err);
    }else if(committed){
      var i = ss.val();
      var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(id);

      userTeam.remove();
      if(i === 0){
        $scope.hide = true;
      }
    }
  });
};

// Save the `Team` to call in the `Standings` page
this.save = function(){
  // need to change this var name
  var something = FirebaseUrl.child('teams').child(self.user.fullName);
  something.remove();
  angular.forEach(self.teams, function(s){
    something.push({
      player: s.name
    });
  });
};

// Reset the `Team` back to Empty
this.reset = function(){
  var something = FirebaseUrl.child('teams').child(self.user.fullName);
  var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid);
  $scope.hide = true;
  userTeam.remove();
  something.remove();
};

});// END CONTROLLER


