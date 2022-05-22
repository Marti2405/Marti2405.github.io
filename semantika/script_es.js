$(function(){

    var t = 0;
    setInterval(placehold,150);
    
    function placehold(){
        t++;
        var load_animation_text = "Entra una palabra...";
        if (t%95==0){
            t =0;
        }
        if (t<50){
            document.getElementById("choix").setAttribute('placeholder',load_animation_text.slice(0,t))
        }
        else{
            var aux = 70 -t;
            if (aux<0){
                aux=0;
            }
            document.getElementById("choix").setAttribute('placeholder',load_animation_text.slice(0,aux))
        }
        
    }



})