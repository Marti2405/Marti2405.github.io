import liste_pere from './list_of_the_day.json' assert {type: 'json'};
$(function(){
var liste_tous_mots = liste_pere["liste"];

document.getElementById("rejouer").onclick = rejouerclick;

function liste_victoire(){
    var text = "";

      for (var i = 0; i<30; i++){

          text +="<tr>";
          text +="<th class=\"number\" id=\"ordre\">"+(i+1)+"</th>";
          text +="<th class=\"word\" id=\"mots\">"+liste_tous_mots[i]+"</th>";
          text +="<th class=\"number\" id=\"score\">"+(10000-i)+"</th>";
          text +="</tr>";

      }

      document.getElementById("guesses_victoire").innerHTML = text;

}
liste_victoire();

function rejouerclick() {
  window.location.replace('./index.html');
}

})
