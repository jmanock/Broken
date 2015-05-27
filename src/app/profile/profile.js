'use strict';
angular.module('fantasy')
.controller('SearchCtrl', function(FirebaseUrl, $scope, $firebaseArray, $firebaseObject, $stateParams, Auth){

var self = this;
// Setup `CurrentUser`
$scope.currentUser = $firebaseArray(FirebaseUrl.child('users').child($stateParams.id));
Auth.onAuth(function(user){
  self.user = user;
});

// Load `LeaderBoard`
$scope.players = $firebaseArray(FirebaseUrl.child('leaderboard'));

// Make the buttons do something
$scope.add = function(p){
  $scope.count(p);
};

$scope.count = function(p){
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
      var teamUser = FirebaseUrl.child('teamUser');

      userTeam.update({
        name: p.Name
      });
      teamUser.update({
        user: self.user.fullName
      });
    }
  });
};
});