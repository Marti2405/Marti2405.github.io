let today = new Date().getDate();
import liste_all from './list_for_the_month.json' assert {type: 'json'};

$(function(){
var liste_pere = liste_all[today.toString()];
var liste_tous_mots = liste_pere["liste"];
var mot_victoire = liste_pere["mot"];
document.getElementById("rejouer").onclick = rejouerclick;

function liste_victoire(){
    var text = "";

      for (var i = 0; i<30; i++){

          text +="<tr>";
          text +="<th class=\"number\" id=\"ordre\">"+(i+1)+"</th>";
          text +="<th class=\"word\" id=\"mots\">"+liste_tous_mots[i]+"</th>";
          text +="<th class=\"number\" id=\"score\">"+(9999-i)+"</th>";
          text +="</tr>";

      }

      document.getElementById("guesses_victoire").innerHTML = text;
      document.getElementById("mot").innerHTML ="Palabra de hoy : "+mot_victoire;

}
liste_victoire();

function rejouerclick() {
  window.location.replace('./index.html');
}


var i = 0;
setInterval(Anim,20);

function Anim(){
  i += 0.15;
  var angle = (i+170)%360;
  var texte = ""
  texte += "linear-gradient(";
  texte += angle
  texte += "deg, rgba(2,0,36,1) 37%, rgba(130,24,66,1) 68%, rgba(255,137,41,1) 100%)"
  document.getElementById("bodd").style.background = texte;
}
let tdy = new Date().toDateString().split(' ');
var present_day = tdy[2] + " " + tdy[1] + " " + tdy[3];
console.log("Word for the "+present_day+".");
console.log("You can see how the algorithm works and view the code at https://github.com/Marti2405/Marti2405.github.io/tree/main/semantika");
console.log();

})