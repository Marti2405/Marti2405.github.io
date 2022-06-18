let today = new Date().getDate();
import liste_all from './list_for_the_month.json' assert {type: 'json'};
import liste_full_mots from './mots.json' assert {type: 'json'};

$(function(){

    var liste_pere = liste_all[today.toString()];
    var mot_victoire = liste_pere["mot"];
    var liste_tous_mots = liste_pere["liste"];
    var liste_mot = [];
    var liste_score = [];
    var numero_tentative = [];
    var mot_recent = "";
    var position_recente = 0;
    var placement_recent = 0;
    var insert_pos = 0;
    const liste_check = new Set(Object.values(liste_full_mots));



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

    var fade_ok = false;

    
    function tryclick() {
        var input = document.getElementById("choix").value.toLowerCase();
        var position = verif_liste(input);
        const isMotInList = liste_check.has(input);
        mot_recent = input;
        position_recente = position;
        if (position==-1){
            document.getElementById("message").innerHTML = "";
            document.getElementById("message").style.background = "transparent" ;
            document.getElementById("message").style.color ="transparent";
            //placer_mot(input,position);
            //update_liste();
            //document.cookie = "filter=value";
            window.location.replace('./victoire.html');
        }
        else if (position==0){
            if (isMotInList) {
                document.getElementById("message").innerHTML = "Esta palabra no está en las palabras más próximas!";
                document.getElementById("message").style.background = "rgba(255, 255, 255, 0.343)" ;
                document.getElementById("message").style.color ="rgba(255, 255, 255, 1)";
                fade_ok = true;
                i =0;
                insert_pos+=1;
                placement_recent +=1;
                position_recente = 50000;
                update_liste();
            }
            else {
                document.getElementById("message").innerHTML = "Palabra no reconocida";
                document.getElementById("message").style.background = "rgba(255, 255, 255, 0.343)" ;
                document.getElementById("message").style.color ="rgba(255, 255, 255, 1)";
                fade_ok = true;
                i=0;
            }
        }
        else {
            document.getElementById("message").style.background = "transparent" ;
            document.getElementById("message").innerHTML = "";
            document.getElementById("message").style.color ="transparent";
            placer_mot(input,position);
            update_liste();
        }
        document.querySelector('#choix').value = "";
        
    }

    var i = 0;
    setInterval(fade,50);


    function fade(){
        if (fade_ok){
            i+=0.005;
            
            if(i>0.34) {
                fade_ok = false;
                //document.getElementById("message").innerHTML = "";
                document.getElementById("message").style.background = "transparent" ;
                document.getElementById("message").style.color ="transparent";
                i=0;
            }
            else {
                var fd = 0.343-i;
                var fd2 = 1-i;
                var txte = "rgba(255, 255, 255, ";
                var txte2 = txte;
                txte+= fd;
                txte2+=fd2;
                txte+=")"
                txte2+=")"
                document.getElementById("message").style.background = txte ;
                document.getElementById("message").style.color = txte2 ;
                
            }
        }        
        
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
        insert_pos +=1;
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
        text +="<th class=\"number\" id=\"score\">"+(50000-position_recente)+"</th>";
        text +="</tr>";
        text += "<tr><td id=\"jtefume\" colspan=\"6\"><hr></td></tr>"

        for (var i = 0; i<taille; i++){
            
            text +="<tr>";
            text +="<th class=\"number\" id=\"ordre\">"+numero_tentative[i]+"</th>";
            text +="<th class=\"word\" id=\"mots\">"+liste_mot[i]+"</th>";
            text +="<th class=\"number\" id=\"score\">"+(50000-liste_score[i])+"</th>";

        }

        document.getElementById("guesses").innerHTML = text;
    }

    let tdy = new Date().toDateString().split(' ');
    var present_day = tdy[2] + " " + tdy[1] + " " + tdy[3];
    console.log("Word for the "+present_day+".");
    console.log("You can see how the algorithm works and view the code at : ");
    console.log("https://github.com/Marti2405/Marti2405.github.io/tree/main/semantika");
    console.log();


})



