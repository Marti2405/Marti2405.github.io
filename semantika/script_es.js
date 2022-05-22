$(function(){

    var t = 0;
    setInterval(placehold,80);
    setInterval(choose_words,37599)
    var piscina = "piscina";
    var coche = "coche";
    var pajaro = "pájaro";
    function choose_words(){
        var liste_mots = ["piscina","coche","pájaro","sombrero","harina","almacén","piloto","poker","película","agujero","alfombra","queso","ropa","bombilla","regalo","pez","rugby","espejo",
                            "circo","patinar","juego","caminar","mar","escalar","catedral","espina","liana","planta","guitarra","médico","cuadro","descansar","espuma","meteorito","servilleta","vida",
                            "cebolla","sello","transportar","cielo","enterrar","punta","pintura","ordenador","perlas","escopeta","plátano","guante","antena","dirigible","plata","abuela","traje"];
        piscina = liste_mots[Math.floor(Math.random() * liste_mots.length +1)];
        coche = liste_mots[Math.floor(Math.random() * liste_mots.length +1)];
        pajaro = liste_mots[Math.floor(Math.random() * liste_mots.length +1)];
    }
    choose_words();
    function placehold(){
        t++;
        var load_animation_text = "Entra una palabra...";
        
        
        if (t%470==0){
            t =0;
        }
        if (t<50){
            document.getElementById("choix").setAttribute('placeholder',load_animation_text.slice(0,t))
        }
        else if(t<100){
            var aux = 80 -t;
            
            if (aux<0){
                aux=0;
            }
            document.getElementById("choix").setAttribute('placeholder',load_animation_text.slice(0,aux))
        }
        else if(t<150){
            var aux = t- 110;
            if (aux<0) {
                aux = 0;
            }
            document.getElementById("choix").setAttribute('placeholder',piscina.slice(0,aux))
        }
        else if(t<200){
            var aux2 = 180 -t;
            
            if (aux2<0){
                aux2=0;
            }
            document.getElementById("choix").setAttribute('placeholder',piscina.slice(0,aux2))
        }
        else if(t<250){
            var aux = t- 210;
            if (aux<0) {
                aux = 0;
            }
            document.getElementById("choix").setAttribute('placeholder',coche.slice(0,aux))
        }
        else if(t<300){
            var aux3 = 285 -t;
            
            if (aux3<0){
                aux3=0;
            }
            document.getElementById("choix").setAttribute('placeholder',coche.slice(0,aux3))
        }
        else if(t<350){
            var aux = t- 310;
            if (aux<0) {
                aux = 0;
            }
            document.getElementById("choix").setAttribute('placeholder',pajaro.slice(0,aux))
        }
        else if(t<410){
            var aux4 = 409 -t;
            
            if (aux4<0){
                aux4=0;
            }
            document.getElementById("choix").setAttribute('placeholder',pajaro.slice(0,aux4))
        }
        
    }



})