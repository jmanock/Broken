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

$scope.aPlayersAdd = function(p){

  $scope.add(p,'A');
}; // End `aPlayersAdd` Function

$scope.bPlayersAdd = function(p){
  $scope.add(p,'B');
}; // End `bPlayersAdd` Function

$scope.cPlayersAdd = function(p){
  $scope.add(p,'C');
}; // End `cPlayersAdd`
var players = [
  'joe','steve', 'brit', 'mason', 'kelly'
];
var teamie = [];
$scope.players = players;
$scope.addMe = function(x){
  console.log(x);
  teamie.push(x);
};

$scope.removeMe = function(x){
  console.log(x);
  teamie.slice(x,1);
};
$scope.teamie = teamie;
var teamPlayers = [];
$scope.add = function(p,x){
  /*
    * Disable the button
    * Add to team array √
    * Add remove button √
  */
  $scope.isDisabled = true;
  teamPlayers.push(p);
  $scope.team = teamPlayers;


}; // End `Add` Function

$scope.remove = function(){
  /*
    * Remove player from team
    * Enable add button
  */
  console.log('this should say something');
  $scope.isDiabled = false;
};
$scope.remover = function(t){
  // Remove player from team list
  // enable from players list

  var userTeam = FirebaseUrl.child('userTeam').child(self.user.fullName).child('team').child(t.$id);
  if(t.Rank === 'A'){
    FirebaseUrl.child('userTeam').child(self.user.fullName).child('CountA')
    .transaction(function(id){
      return(id || 0)-1;
    }, function(err, committed){
      if(err){
        console.log(err);
      }else if(committed){
        userTeam.remove();
      }
    });
  }else if(t.Rank === 'B'){
    FirebaseUrl.child('userTeam').child(self.user.fullName).child('CountB')
    .transaction(function(id){
      return(id || 0)-1;
    },function(err, committed){
      if(err){
        console.log(err);
      }else if(committed){
        userTeam.remove();
      }
    });
  }else if(t.Rank === 'C'){
    FirebaseUrl.child('userTeam').child(self.user.fullName).child('CountC')
    .transaction(function(id){
      return(id || 0)-1;
    },function(err, committed){
      if(err){
        console.log(err);
      }else if(committed){
        userTeam.remove();
      }
    });
  }

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
