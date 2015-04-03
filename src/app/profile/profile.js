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
    // var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(player.$id);
    //   userTeam.update({
    //     name:player.Name
    // });
    this.incId(player);
  };

  this.incId = function(player){
    FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child('counter').transaction(function(id){
      return(id||0)+1;
    }, function(err, committed, ss){
      if(err){
        console.log(err);
      }else if(committed){
        var id = ss.val();
        var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(player.$id);
        userTeam.update({
          name:player.Name
        });
      }
    });
  }

  this.removePlayer = function(id){
    var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(id);
    userTeam.remove();

  };

});
