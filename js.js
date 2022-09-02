const divResultat = document.querySelector('.resultat')
const divInfo = document.querySelector('.info')
var tabJeu = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
   
]
//window.localStorage.clear();
var tabScore = []
var score=0
var clickCompteur = 0
var tabResultat = genereTabAlea ()
var oldSelection = []
var nbAffiche = 0 
var ready = true
afficherTableau()

function afficherTableau() {
    var txt = ""
    AfficherInfo()

    for(var i=0; i <tabJeu.length; i++)
    {
        txt +="<div>"
        for( var j =0; j<tabJeu[i].length; j++)
        {
            if(tabJeu[i][j] ===0){
            txt +="<button class='btn btn-primary m-2' style='width:100px;height:100px' onClick='verif(\""+i+"-"+j+"\")'>Afficher</button>"
        }
            else
        {
            txt+= "<img src='"+getimage(tabJeu[i][j])+"' style='width:100px;height:100px' class='m-2'>"
        }


        }
        
        txt += "</div>"
    }



    divResultat.innerHTML = txt;

}
function getimage(valeur){
    var imgTxt = "images/"
    switch(valeur)
    {
        case 1 : imgTxt += "1.png"
        break
        case 2 : imgTxt += "2.png"
        break
        case 3 : imgTxt += "3.png"
        break
        case 4 : imgTxt += "4.png"
        break
        case 5 : imgTxt += "5.png"
        break
        case 6 : imgTxt += "6.png"
        break
        case 7 : imgTxt += "7.png"
        break
        case 8 : imgTxt += "8.png"
        break
        case 9 : imgTxt += "9.png"
        break
        case 10 : imgTxt += "10.png"
        break
        default : console.log("cas pas pris en compte")
    }
    return imgTxt


}
function verif(bouton){
    if(ready)
    {

    clickCompteur++
    nbAffiche++
    var ligne = bouton.substr(0,1)
    var colonne = bouton.substr(2,1)
    tabJeu[ligne][colonne] = tabResultat [ligne][colonne]
    afficherTableau();

    if(nbAffiche>1)
    {
        ready =false;
        setTimeout(()=>{

            if(tabJeu[ligne][colonne] !== tabResultat[oldSelection[0]][oldSelection[1]]){
            tabJeu[ligne][colonne] = 0
            tabJeu[oldSelection[0]][oldSelection[1]] = 0

        }
        afficherTableau()
        ready = true

        nbAffiche=0
        oldSelection = [ligne,colonne]


        },500)
        
        
    }
    else{
        oldSelection = [ligne,colonne]
    }

    
    }

    endOfGame ()
}
function genereTabAlea () {
    var tab = []

    var nbImgPosition=[0,0,0,0,0,0,0,0,0,0]

    for(var i =0 ; i<4 ; i++)
    {
        var ligne = []
        for(var j = 0; j<5 ; j++)
        {
            var fin = false
            while (!fin) {
                var randomImg = Math.floor(Math.random()*10)
            if(nbImgPosition[randomImg]<2)
            {
                ligne.push(randomImg+1)
                nbImgPosition[randomImg]++
                fin = true
            }

            }
        }
        tab.push(ligne)

    }


    return tab
}

function AfficherInfo () {

    var infoClick = "Nombre de click = "+clickCompteur
    divInfo.innerHTML= infoClick
}
AfficherInfo()



var s =0
var m =0
var h = 0 

var seconde
var minute
var heure

function setSecond () 
{
    s+=1
    if(s==60)
    {
        s=0
    }
    
    document.getElementById('s').innerHTML=s +' Sec'
}
function setMinute () 
{
    m+=1
    if(m==60)
    {
        m=0
    }
    
    document.getElementById('m').innerHTML=m +' min'
}

function setHeure()
{
    h+=1
    document.getElementById('h').innerHTML=h + ' h'
}

function chronoStart ()
{
    heure = setInterval(setHeure,3600000)
    minute = setInterval(setMinute, 60000)
    seconde = setInterval(setSecond, 1000)
   
}
function stop()
{
    clearInterval(heure)
    clearInterval(seconde)
    clearInterval(minute)
    
}

chronoStart()


function endOfGame ()
{
    var testEnd=true
    for(var i=0; i <tabJeu.length; i++)
    {
        for( var j =0; j<tabJeu[i].length; j++)
        {
            if(tabJeu[i][j]===0)
            {
                testEnd=false
            }
        }
    }
    if (testEnd==true)
    {
        
        stop()
      

        const timer = localStorage.getItem("secondem")
        console.log(timer)
        if(timer === null)
        {
            localStorage.setItem("heurem", h)
            localStorage.setItem("minutem", m)
            localStorage.setItem("secondem", s)
            localStorage.setItem("clickm",clickCompteur)    
            bestTime()    
        }
        else
        {

            const heureTest = localStorage.getItem("heurem")
            const minuteTest = localStorage.getItem("minutem")
            const secondeTest = localStorage.getItem("secondem")
            var comparValeurStorage= ((heureTest*3600000)+(minuteTest*60000)+(secondeTest*1000))
            var comparValeurNow = ((h*3600000)+(m*60000)+(s*1000))
            if(comparValeurNow<comparValeurStorage)
            {
            localStorage.setItem("heurem", h)
            localStorage.setItem("minutem", m)
            localStorage.setItem("secondem", s)
            localStorage.setItem("clickm",clickCompteur) 
            }

             
            bestTime()    
        }
       
        location.reload()    
    }
}

const test = localStorage.getItem("secondem")
if (test != null)
{
    bestTime()
}


function bestTime ()
{
    const bestTime = document.querySelector('.bestTime')
    const heureAffichage = localStorage.getItem("heurem")
    const minuteAffichage = localStorage.getItem("minutem")
    const secondeAffichage = localStorage.getItem("secondem")
    const clickAffichage = localStorage.getItem("clickm")
    bestTime.style.backgroundColor = 'darkslateblue';

    var temps = ''
    if( heureAffichage != 0)
    {
        temps= temps + heureAffichage +" h "
    }
        temps= temps + minuteAffichage +" min "
        temps= temps + secondeAffichage +" sec"
    bestTime.innerHTML = '<h2>Votre meilleur temps est de</h2>'+temps+'</br> Le nombre de click est de : '+clickAffichage
}