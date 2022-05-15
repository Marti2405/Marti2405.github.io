import json
import random



mot_ok = False

while not mot_ok:

    position_mot_voulu = random.randint(47,1000653) #int(input("Entrez la position du mot voulu : ")) 

    with open(r'./w2v.txt' , encoding='utf-8') as f:
        q = f.readline().split()
        nbe_mots = q[0]
        taille_position = q[1]
        for p in range(position_mot_voulu):
            x= f.readline()
        for i in range(1):
            x = f.readline()
            y = x.split(" ")
            motc = y[0].lower()
            posc = [float(u) for u in y[1::]]


    mot = motc
    pos = posc
    print("Mot choisit : " , mot)
    print("----------------------")
    x = int(input("Le mot vous va-t-il ? (Oui->1,Non->0) : "))
    if x==1:
        mot_ok = True


#MOT CHOISIT->MOT , POSITION DU MOT CHOISIT->POS

#--------------------------------------------------------

#Calcul de distance
def distance(x,y):
    rac = []
    for i in range(len(x)):
        w = (x[i]-y[i])**2
        rac.append(w)

    return (sum(rac))**(1/2)




#----------------------------------------------------------
liste_mots = ["aaaa","bbbb","cccc"]
liste_score = [50,60,70]

def update(mot,score):
    x=25000
    if liste_score[-1]<score:
        liste_mots.append(mot)
        liste_score.append(score)
    elif liste_score[0]>score:
        liste_mots.insert(0,mot)
        liste_score.insert(0,score)
    else:
        for i in range(len(liste_mots)):
            if liste_score[i]>score:
                liste_mots.insert(i,mot)
                liste_score.insert(i,score)
                break
    if len(liste_mots)>x:
        liste_mots.pop(-1)
        liste_score.pop(-1)
    
                



with open(r'./w2v.txt' , encoding='utf-8') as f:
    q = f.readline().split()
    nbe_mots = q[0]
    taille_position = q[1]
    for w in range(46):
        x = f.readline()
    for i in range(int(1000653-46)):
        x = f.readline()
        y = x.split(" ")
        motc = y[0].lower()
        if mot!=motc:
            posc = [float(u) for u in y[1::]]
            dist = distance(pos,posc)
            update(motc,dist)
            #print(liste_mots)
            #print(liste_score)


with open(r'./list_of_the_day.json', "w" ) as f:  
    liste_mots = {"mot":mot,"liste":liste_mots}
    json.dump(liste_mots,f)

print("Liste crée. Uploadé dans le fichier list_of_the_day.json")
input()


