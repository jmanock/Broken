'use strict';
var fs = require('fs');

var content = fs.readFileSync('field.json');
var jsonContent = JSON.parse(content);
var url = 'http://www.pgatour.com/data/r/033/2015/scorecards';
var request = require('request');

var something = [];
var players = jsonContent.Tournament.Players;
for(var i = 0; i<players.length; i++){
  var id = players[i].TournamentPlayerId;
  var parts = players[i].PlayerName.split(', ');
  var pName = parts[1]+' '+parts[0];
  something.push({
    Name:pName,
    Id:id
  });
}
var urls = [];
for(var x = 0; x<something.length; x++){
  var rId = something[x].Id;
  var link = url+'/'+rId+'.json';
  urls.push({
    Links:link,
    Name:something[x].Name
  });
}
var thing = function(id,rounds){
  for(var i = 0; i<rounds.length; i++){
    console.log(rounds[i]);
  }
};
var callMe = function(Link){
  var something = [];
  request(Link, function(error, response, header){
    if(!error && response.statusCode === 200){
      var jc = JSON.parse(header);
      var id = jc.p.id;
      var rounds = jc.p.rnds;
      thing(id,rounds);
    }
  });

};
for(var z = 0; z<urls.length; z++){
  var link = urls[z].Links;
  var Name = urls[z].Names;
  callMe(link,Name);
}
