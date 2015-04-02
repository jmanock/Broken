'use strict';
angular.module('fantasy')
.controller('SearchCtrl', function( $firebaseArray, FirebaseUrl, Auth, $stateParams, $firebaseObject){
  var self = this;
  var ref = new Firebase('https://toga.firebaseio.com/');
  this.players = $firebaseArray(ref);
  this.currentUser = $firebaseArray(FirebaseUrl.child('users').child($stateParams.id));
  Auth.onAuth(function(user){
    self.user = user;
  });

  this.currentUser.$loaded(function(){
    self.teams = $firebaseObject(FirebaseUrl.child('userTeam').child($stateParams.id).child('team'));
    self.user.$loaded(function(){
      self.show = (self.currentUser.uid === self.user.uid);
    });
  });

  this.addPlayer = function(player){
    var count = 1;
    var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(count).child(player.$id);
    userTeam.update({
      name: player.Name
    });
    count =+1;
  };

  this.removePlayer = function(id){
    var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(id);
    userTeam.remove();
  };
});
