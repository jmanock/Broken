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

  // Set up the `Players` List
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

// Load `Team` and Remove players
this.currentUser.$loaded(function(){
  var team = $firebaseArray(FirebaseUrl.child('userTeam').child(self.user.fullName).child('team'));

  team.$loaded().then(function(data){
    angular.forEach(data, function(x){
      var index;
      if(x.Rank === 'A'){
        index = $scope.aPlayers.indexOf(x.$id);
        $scope.aPlayers.splice(index,1);
      }else if(x.Rank === 'B'){
        index = $scope.bPlayers.indexOf(x.$id);
        $scope.bPlayers.splice(index,1);
      }else{
        index = $scope.cPlayers.indexOf(x.$id);
        $scope.cPlayers.splice(index,1);
      }
    });
  });
   $scope.team = team;
}); // End `Loaded`

// Send Players to `add` Function and Remove from Players list
$scope.aPlayersAdd = function(p){
  var index = $scope.aPlayers.indexOf(p);
  $scope.aPlayers.splice(index,1);
  $scope.add(p,'A');
}; // End `aPlayersAdd` Function

$scope.bPlayersAdd = function(p){
  var index = $scope.bPlayers.indexOf(p);
  $scope.bPlayers.splice(index,1);
  $scope.add(p,'B');
}; // End `bPlayersAdd` Function

$scope.cPlayersAdd = function(p){
  var index = $scope.cPlayers.indexOf(p);
  $scope.cPlayers.splice(index,1);
  $scope.add(p,'C');
}; // End `cPlayersAdd`

// Add player and Counter to Firebase
$scope.add = function(p,x){
  var userTeam = FirebaseUrl.child('userTeam').child(self.user.fullName).child('team').child(p);
  var count = function(c){
    FirebaseUrl.child('userTeam').child(self.user.fullName).child('Count'+x)
    .transaction(function(count){
      if(count === null){
        count = 0;
      }
      if(count >= c){
        console.log('That is all the '+x+' Players you can have');
      }else{
        return(count || 0)+1;
      }
    },function(err,committed){
      if(err){
        console.log(err);
      }else if(committed){
        userTeam.update({
          Rank:x
        });
      }
    });
  }; // End `Count` Function
  if(x === 'A'){
    count(2);
  }else if(x === 'B'){
    count(2);
  }else{
    count(1);
  }
}; // End `Add` Function

// `Remove` player and add them back to player list
$scope.remove = function(x){
  var userTeam = FirebaseUrl.child('userTeam').child(self.user.fullName).child('team').child(x.$id);
  var count = function(){
    FirebaseUrl.child('userTeam').child(self.user.fullName).child('Count'+x.Rank)
    .transaction(function(id){
      return(id || 0)-1;
    }, function(err, committed){
      if(err){
        console.log(err);
      }else if(committed){
        userTeam.remove();
      }
    });
  }; // End `Count` Function
  if(x.Rank === 'A'){
    $scope.aPlayers.push(x.$id);
    count();
  }else if(x.Rank === 'B'){
    $scope.bPlayers.push(x.$id);
    count();
  }else{
    $scope.cPlayers.push(x.$id);
    count();
  }
}; // End `Remove` Function

// Tab Sections
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
