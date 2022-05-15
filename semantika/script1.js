import liste_pere from './list_of_the_day.json' assert {type: 'json'};

$(function(){

    var mot_victoire = liste_pere["mot"];
    var liste_tous_mots = liste_pere["liste"];
    var liste_mot = [];
    var liste_score = [];
    var numero_tentative = [];
    var mot_recent = "";
    var position_recente = 0;
    var placement_recent = 0;


    document.getElementById("try").onclick = tryclick;
    
    // Get the input field
var box = document.getElementById("choix");

// Execute a function when the user presses a key on the keyboard
box.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("try").click();
  }
});
    
    function tryclick() {
        var input = document.getElementById("choix").value;
        var position = verif_liste(input);
        mot_recent = input;
        position_recente = position;
        if (position==-1){
            document.getElementById("message").innerHTML = "";
            document.getElementById("message").style.background = "#495172" ;
            placer_mot(input,position);
            update_liste();
            document.cookie = "filter=value";
            window.location.replace('./victoire.html');
        }
        else if (position==0){
            document.getElementById("message").style.background = "#3E54B6" ;
            document.getElementById("message").innerHTML = "Ce mot n'est pas proche du mot à trouver. Essayez à nouveau!";
        }
        else {
            document.getElementById("message").style.background = "#495172" ;
            document.getElementById("message").innerHTML = "";
            placer_mot(input,position);
            update_liste();
        }
        document.querySelector('#choix').value = "";
    }

    //-1 si c'est le bon mot
    //0 si il n'est pas dans la liste
    //x>0 si il est dans la liste
    function verif_liste(mot){
        const clebon = (element) => element == mot;
        if (mot==mot_victoire){
            return -1;
        }
        else {
            return liste_tous_mots.findIndex(clebon)+1;
        }
    }


    function placer_mot(mot,position){
        var tll = liste_score.length;
        var insert_pos = tll+1;
        placement_recent = insert_pos;
        if (tll==0){
            liste_mot.unshift(mot);
            liste_score.unshift(position);
            numero_tentative.unshift(insert_pos);
        }
        else if (position<liste_score[0]){
            liste_mot.unshift(mot);
            liste_score.unshift(position);
            numero_tentative.unshift(insert_pos);
        }
        else if (position==liste_score[0]){
            null;
        }
        else if (position>liste_score[tll-1]){
            liste_mot.push(mot);
            liste_score.push(position);
            numero_tentative.push(insert_pos);
        }
        else if (position>liste_score[tll-1]){
            null;
        }
        else {
            var fin = false;
            var i=0;
            while (true) {
                i++;
                if (position<liste_score[i]){
                    liste_mot.splice(i,0,mot);
                    liste_score.splice(i,0,position);
                    numero_tentative.splice(i,0,insert_pos);
                    fin = true;
                }
                else if (position==liste_score[i]){
                    fin = true;
                    break;
                }
                if (fin) {
                    break;
                }
            }
        }
    }

    function update_liste() {

        var text = "";
        var taille = liste_mot.length;

        text +="<tr>";
        text +="<th class=\"number\" id=\"ordre\">"+placement_recent+"</th>";
        text +="<th class=\"word\" id=\"mots\">"+mot_recent+"</th>";
        text +="<th class=\"number\" id=\"score\">"+(10000-position_recente)+"</th>";
        text +="</tr>";
        text += "<tr><td colspan=\"6\"><hr></td></tr>"

        for (var i = 0; i<taille; i++){

            text +="<tr>";
            text +="<th class=\"number\" id=\"ordre\">"+numero_tentative[i]+"</th>";
            text +="<th class=\"word\" id=\"mots\">"+liste_mot[i]+"</th>";
            text +="<th class=\"number\" id=\"score\">"+(10000-liste_score[i])+"</th>";

        }

        document.getElementById("guesses").innerHTML = text;
    }


    
})



