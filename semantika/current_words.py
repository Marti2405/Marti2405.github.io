import json

def check_current_words():
    with open(r'C:\Users\marti\Desktop\Dossiers\Coding\Semanticas\list_for_the_month.json',"r") as f:
        x = json.load(f)
        jours = list(x.keys())
        print("Jours présents dans la liste : " , ', '.join(jours))
        for i in jours:
            q = x[str(i)]["mot"]
            print(f"Jour nº{i} : {q}")

check_current_words()