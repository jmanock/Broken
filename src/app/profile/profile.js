'use strict';
angular.module('fantasy')
.controller('SearchCtrl', function( $firebaseArray, FirebaseUrl, Auth, $stateParams, $firebaseObject, $scope){
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
    this.incId(player);
  };

  this.incId = function(player){
    FirebaseUrl.child('userTeam').child(self.user.uid).child('counter').transaction(function(id){
      if(id >=5){
        console.log('no more fucking players can be added!');
      }else{
      console.log(id);
      return(id||0)+1;
    }

    }, function(err, committed, ss){
      if(err){
        console.log(err);
      }else if(committed){
        var id = ss.val();
        if(id <=5){
        var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(player.$id);
        var teamUser = FirebaseUrl.child('teamUser').child(player.$id);
        userTeam.update({
          name:player.Name
        });

        teamUser.update({
          name:player.Name,
          user: self.user.uid
        });

      }
      }
    });
  };

  this.removePlayer = function(id,player){
    this.remove(player, id);
  };

  this.remove = function(player, id){
    console.log('this should be called when remove is pressed???');
     FirebaseUrl.child('userTeam').child(self.user.uid).child('counter').transaction(function(id){
      return(id || 0)-1;
    }, function(err, committed, ss){
      if(err){
        console.log(err);
      }else if(committed){
        var i = ss.val();
        var userTeam = FirebaseUrl.child('userTeam').child(self.user.uid).child('team').child(id);
        var teamUser = FirebaseUrl.child('teamUser').child(id);
        teamUser.remove();
        userTeam.remove();
        console.log(i);
      }
    });
  };

});
