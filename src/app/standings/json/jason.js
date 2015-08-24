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
    links:link,
    Name:something[x].Name
  });
}
var callMe = function(x){
  request(x, function(error, response, header){
    if(!error && response.statusCode === 200){
      var jc = JSON.parse(header);
      var id = jc.p.id;
      console.log(id);
    }
  });
};
for(var z = 0; z<urls.length; z++){
  callMe(urls[z].links);
}

/*
  ToDo
  * Got the urls, and names
*/
