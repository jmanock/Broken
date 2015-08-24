'use strict';
var fs = require('fs');
console.log('\n *Start*\n');
var content = fs.readFileSync('field.json');
var jsonContent = JSON.parse(content);

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
console.log(something);
