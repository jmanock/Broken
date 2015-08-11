'use strict';
$(document).ready(function(){
  var fedex = [];
  $.getJSON('app/profile/fedexStandings.json', function(x){
    var some = x.tours;
    for(var i = 0; i<some.length; i++){
      var somet = some[i].years;
      for(var q = 0; q<somet.length; q++){
        var someth = somet[q].stats;
        for(var w = 0; w<someth.length; w++){
          var something = someth[w].details;
          for(var a = 0; a<something.length; a++){
            var firstName = something[a].plrName.first;
            var lastName = something[a].plrName.last;
            var fullName = firstName + ' ' + lastName;
            fedex.push({
              Name:fullName
            });

          }
        }
      }
    }
    var players = [];
    $.getJSON('app/profile/log0.json', function(b){
      var nums = b.Tournament.Players;
      for(var c = 0; c<nums.length; c++){
        var pName = nums[c].PlayerName;
        var parts = pName.split(', ');
        var first = parts[1]+' '+parts[0];
        players.push({
          Name:first
        });

      }
      var rankings = [];
      for(var d = 0; d<fedex.length; d++){
        var fist = fedex[d].Name;
        for(var e = 0; e<players.length; e++){
          var second = players[e].Name;
          if(fist === second){
            rankings.push({
              Name:second
            });
          }
        }

      }
      var aPlayers = rankings.slice(0,25);
      var bPlayers = rankings.slice(26,72);
      var cPlayers = rankings.slice(73);
      // console.log(aPlayers);
      // console.log(bPlayers);
      // console.log(cPlayers);

    });
  }); // End `FedexStandings`

});
