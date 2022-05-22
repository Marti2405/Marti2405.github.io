import json
import os
from progress.bar import ShadyBar

def addword(word,day):
    
    print(f"Searching the position of the word {word}...")
    wordfound = False
    
    with open(r'C:\Users\marti\Desktop\Dossiers\Coding\Semanticas\w2v.txt' , encoding='utf-8') as f:
        _ = f.readline().split()
        bar1 = ShadyBar('Searching',max = 100,suffix='%(percent)d%% [%(elapsed)ds]')
        for momo in range(1000653):
            x= f.readline()
            if momo%10000 == 0:
                last_progress = momo%10000
                bar1.next()
            current_word = x.split(" ")[0]
            current_position = x.split(" ")[1:]
            if current_word == word:
                pos1 = current_position
                wordfound = True
                for _ in range(100-last_progress):
                    bar1.next()
                break

    if not wordfound:
        raise TypeError()
  

    print(f"  Position found",u'\u2713')      
    for i in range(len(pos1)):
        pos1[i] = float(pos1[i])
        

    print("----------------------")
    


    #MOT CHOISIT->MOT , POSITION DU MOT CHOISIT->POS

    #--------------------------------------------------------

    #Calcul de distance
    def distance(x,y):
        rac = []
        for i in range(len(x)):
            w = (x[i]-y[i])**2
            rac.append(w)

        return (sum(rac))**(1/2)






    def update(mot,score,listedemots,listedescore):
        #length of the lists of words -------------
        x=50000
        #--------------------------------------
        if listedescore[-1]<score:
            listedemots.append(mot)
            listedescore.append(score)
        elif listedescore[0]>score:
            listedemots.insert(0,mot)
            listedescore.insert(0,score)
        else:
            for i in range(len(listedemots)):
                if listedescore[i]>score:
                    listedemots.insert(i,mot)
                    listedescore.insert(i,score)
                    break
        if len(listedemots)>x:
            listedemots.pop(-1)
            listedescore.pop(-1)
        

    #----------------------------------------------------------
    #initializing all lists
    liste_mots1 = ["aaaa","bbbb","cccc"]
    liste_score1 = [50,60,70]



    with open(r'C:\Users\marti\Desktop\Dossiers\Coding\Semanticas\w2v.txt' , encoding='utf-8') as f:
        print("Starting to create list for the word : ", word)
        bar2 = ShadyBar('Creating',max=101,suffix='%(percent)d%% [Avg remaining %(eta)ds] [Elapsed time %(elapsed)ds]')
        _ = f.readline().split()
        for _ in range(46):
            x = f.readline()
        for i in range(int(1000653-46)):
            if i%10000==0:
                bar2.next()
            x = f.readline()
            y = x.split(" ")
            motc = y[0].lower()
            if word!=motc:
                posc1 = [float(u) for u in y[1::]]
                dist1 = distance(pos1,posc1)
                update(motc,dist1,liste_mots1,liste_score1)
        bar2.next()

    print("  List completed",u'\u2713')

    def save_lists(word_to):
        with open(r'C:\Users\marti\Desktop\Dossiers\Coding\Semanticas\list_for_the_month.json',"r+") as f:
            print("Loading current words...")
            x = json.load(f) 
            print("Words loaded",u'\u2713')
            dic_liste_mots = {"mot":word_to,"liste":liste_mots1}
            x[day] = dic_liste_mots
            print(f"Dictionary created for the word {word}",u'\u2713')
        os.remove(r'C:\Users\marti\Desktop\Dossiers\Coding\Semanticas\list_for_the_month.json')
        print("Old words dictionary removed",u'\u2713')
        with open(r'C:\Users\marti\Desktop\Dossiers\Coding\Semanticas\list_for_the_month.json',"w") as f:
            print("Uploading the new words dictionary...")
            json.dump(x,f)
            print("Dictionary uploaded correctly",u'\u2713')
            
    save_lists(word)
    print(f"Word {word} correctly placed at day number {day}",u'\u2713')


def check_current_words():
    with open(r'C:\Users\marti\Desktop\Dossiers\Coding\Semanticas\list_for_the_month.json',"r") as f:
        x = json.load(f)
        jours = list(x.keys())
        print("Current words in list : " , ', '.join(jours))
        for i in jours:
            q = x[str(i)]["mot"]
            print(f"Day nº{i} : {q}")


def add_word_to_month():
    check_current_words()
    wordfound = False
    while not wordfound:
        ok = False
        i=0
        while not ok:
            if i>0:
                print("- - Word cancelled - -")

            w = str(input("Enter word : "))

            pos_ok = False
            while not pos_ok:
                p = int(input(f"Enter the day for the word {w} : "))
                if 0<p<32:
                    pos_ok=True
                elif type(p)!=type(1):
                    print("Please enter a valid number")
                else:
                    print("Error, the number of the day must be between 0 and 31")
                p = str(p)
                
            
            ok = (str(input(f"The algorithm is going to place the word {w} at day number {p}. Confirm (y) : "))=="y")
            i+=1
            
        try:
            addword(w,p)
            wordfound = True
        except:
            print(f"Word {w} not found, please check the spelling")
            print("Restarting word selector...\n")

add_word_to_month()