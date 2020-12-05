//const e = require("express")

const name = document.getElementById('name')
const prenume = document.getElementById('prenume')
const email = document.getElementById('email')
const password = document.getElementById('pwd')
const varsta = document.getElementById('age')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')
const submit=document.getElementById("submit");
var container=document.getElementById("box");
var form1=document.getElementsByClassName("form1")[0];
let isValid=true;
var startGame=false;
var body = document.getElementsByTagName("body")[0]



var music=document.createElement('audio');
music.src='music.mp3';
body.appendChild(music);
// music.autoplay=true;
// music.loop=true;
music.play;

document.getElementById("deconectare").style.display='none';


// ALEGEREA CULORII FUNDALULUI:

var alb=document.getElementById("white");
var gri=document.getElementById("grey");
var getColor=window.getComputedStyle(body).getPropertyValue('background-color');
alb.addEventListener("click",changecolor1);
gri.addEventListener("click",changecolor2);
function changecolor1()
{

        body.style.background='rgba(0, 0, 0, 0)';
        
    
 
}
function changecolor2()
{
  
   body.style.background='rgb(26,24,24)';

}



// LA CREAREA UNUI NOU CONT, VERIFICAM DACA SE INDEPLINESTE FORMATUL PT FIECARE TIP DE INPUT. DACA DATELE SUNT INCORECTE VA APAREA O ALERTA PE ECRAN

var jocOK=1;
document.getElementById("cont").style.display='block';
submit.addEventListener('click', async (e) => {
  errorElement.innerText="";

  isValid=true;
  let messages = []
  if (name.value === '' || name.value == null) {
    messages.push('Name is required')
    isValid=false;
  }

  if (password.value.length <= 6) {
    messages.push('Password must be longer than 6 characters')
 
  }

  if (password.value.length >= 20) {
    messages.push('Password must be less than 20 characters')
  
  }

  if (password.value === 'password') {
    messages.push('Password cannot be password')
 
  }

  //DACA LUNGIMEA LISTEI MESSAGES>0 INSEAMNA CA S-A GASIT UN INPUT INCORECT, DECI FORMULARUL ESTE INVALID
  if (messages.length > 0) {
    e.preventDefault()
    myAlert_b();
    isValid=false;
    jocOK=0;
  }
 else {
   jocOK=1;
     
  let gender="masculin";
  let genderBtn = document.querySelectorAll('input[name="gender"]');
  if (genderBtn[1].checked) {
    gender = 'feminin';
 }
 let caracter=document.getElementById("pers").value;
 
 //variabila user va retine toate datele unui utilizator nou, pe care il adaugam in lista de utilizatori in node

 //chooseCharacter();


  let user={"nume": name.value,
            "prenume": prenume.value,
            "email": email.value,
            "parola":password.value,
            "gen": gender,
            "varsta":varsta.value,
            "caracter":pers.value 

           }
  let newUsersList = postData('http://localhost:3000/adauga-utilizator', user);
  
  
        }
    if(isValid==true)

    {   e.preventDefault()
        helloUser.innerHTML = `Bun venit  ${name.value} ${prenume.value}!`;
        document.getElementById("form").reset();
        document.getElementById("form").style.display='none';
        document.getElementsByClassName("form1")[0].style.display='none';
        document.getElementById("conectare").style.display='none';
        document.getElementById("deconectare").style.display='block';

    }
        

})
var ok=0;
var formm=document.getElementById("formm");



//DACA JUCATORUL ARE DEJA UN CONT, SE POATE CONECTA CU NUMELE,PRENUMELE SI PAROLA. DACA UNA DIN ELE ESTE GRESITA, APARE UN MESAJ DE ALERTA PE ECRAN 

var salveazaAnim;
var failTime=[]
var nrConectariEsuate=0;
async function conectare()
{
    
    event.preventDefault(); 
    let nume=document.getElementById("name1").value;
    let prenume=document.getElementById("prenume1").value;
    let parola=document.getElementById("pwd1").value;
    let URL = "http://localhost:3000/utilizatori/";
    let list = await getUsers(URL);
    let car=0;
    var emaill;
    var contCorect=true;
    list.forEach(u=>{ if(u.nume==nume && u.prenume==prenume&& u.parola==parola)
                        {ok=1; contCorect=true;}
                        else if(u.nume==nume && u.prenume==prenume && u.parola!=parola)
                           {contCorect=false; emaill=u.email;}
                        //else contCorect=0;
                        car=u.caracter;
                        
                        
                             
                    } );
      
    
    
    if(ok==1)
            {
              failTime=[];
              nrConectariEsuate=0;
                if(car=="p1")
                {dog.style.visibility='hidden';
                anim=rabbit;
                salveazaAnim='p1';
                }
            else if(car=="p2")
                  
                  {rabbit.style.visibility='hidden';
                  anim=dog;
                  salveazaAnim='p2';
                  }
             


            const item =
         {
        nume,
        prenume,
        parola,
        salveazaAnim  
        }

   //adauga aceste noi date si in local storage
   
   accounts.push(item);
   localStorage.setItem('items', JSON.stringify(accounts));
   
   helloUser.innerHTML = `Bun venit  ${nume} ${prenume}!`;
  
   document.getElementById("formm").reset();
   formm.style.display='none';
   form1.style.display='none';

   document.getElementById("conectare").style.display='none';
   document.getElementById("deconectare").style.display='block';                                                      
                                                        
    
            }
        else  {

          if(contCorect==false)
                                {
           failTime.push(Date());
           setTimeout(function() {failTime.shift();},60000 );
           let obj={emaill,nume};
           if( failTime.length==5 ) 
                                  {
                                    document.getElementById('connect').style.display='none';
                                    setTimeout(function(){document.getElementById('connect').style.display='block';},10000);
                                    let sendTo = postData('http://localhost:3000/trimite-mail', obj);
                                  }
           console.log(failTime); 
           console.log(emaill);
                                }
           Swal.fire({
            
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
          })
                }
}


document.getElementById("conectare").addEventListener("click",function(){document.getElementsByClassName("form1")[0].style.display='none';form.style.display='none'; formm.style.display='block';})

document.getElementById("connect").addEventListener("click",conectare);


async function getUsers(url = '') {
    const response = await fetch(url, {
       method: 'GET',
    });
    return response.json();
 }


async function postData(url = '', data = {}) {
    
    const response = await fetch(url,
       {
        
          method: 'POST', 
          headers:
          {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
       }); 
       return response.json();
    }
var myInput = document.getElementById("pwd");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// Cand utilizatorul apasa pe casuta pt parola,apare mesajul cu restrictiile pentru parola
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

//Cand utilizatorul apasa in afara casutei parola,mesajul dispare
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}


myInput.onkeyup = function() {

  // Validare litere mici

  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
}

  // Validare majuscule

  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validare cifre

  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validare lungime

  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}


var slider = document.getElementById("age");
var output = document.getElementById("demo");


output.innerHTML = slider.value;

slider.oninput = function() 
{
  output.innerHTML = this.value;
}



let accounts= JSON.parse(localStorage.getItem('items')) || []; // selectez tagul h2 in care pun mesajul "BUN VENIT " + nume

const helloUser = document.querySelector('h2');
if(accounts.length>0)
{
helloUser.innerHTML = `Bun venit  ${accounts[0].nume} ${accounts[0].prenume}!`;
document.getElementById("deconectare").style.display="block";
document.getElementById("conectare").style.display='none';
document.getElementsByClassName("form1")[0].style.display='none';
if(accounts[0].salveazaAnim=='p1')
        {
          document.getElementById("character1").style.visibility='hidden';
          anim=document.getElementById("character");
        }
    else {
      document.getElementById("character").style.visibility='hidden';
      anim=document.getElementById("character1");
    }
    startGame=true;
  

}
if(accounts.length==0)
{
var person = window.prompt("Cum te numesti?", "");
if (person != null) {
  var paragraf=document.createElement('p');
  paragraf.style.position='absolute';
  paragraf.style.top=250+'px';
  paragraf.style.left=480+'px';
  paragraf.style.zIndex=100;
  paragraf.style.color='#CE2400';
  paragraf.style.fontWeight='900';
  paragraf.style.fontSize=100+'px';
  document.body.appendChild(paragraf);
  if(person!=""){
  paragraf.innerHTML =
  "Salut, " + person + "!";
  setTimeout(function(){
    // document.getElementById("pr").innerHTML = '';
    document.body.removeChild(paragraf);
  }, 2000);
  }
}
}





  
//document.getElementById("deconectare").style.display="none";


//CAND UTILIZATORUL APASA PE BUTONUL "DECONECTARE", SE STERGE NUMELE ACESTUIA DIN MESAJUL DE BUN VENIT SI REAPARE FORMULARUL DE INREGISTRARE

  function deconectare()
    {
      helloUser.innerHTML="Bun venit!";
      localStorage.clear('items');
      accounts=[];
      document.getElementById("form").style.display="block";
      document.getElementById("deconectare").style.display="none";
      document.querySelector(".form1").style.display='block';
      document.getElementById("cont").style.display='block';
      document.getElementById("conectare").style.display='block';
      
    }

  document.getElementById("deconectare").addEventListener("click",deconectare);


  var dog=document.getElementById("character1");
  var rabbit=document.getElementById("character");
  var pers=document.getElementById("pers");


//SE ALEGE CARACTERUL PENTRU JOC(CAINELE SAU IEPURELE)

  submit.addEventListener("click",chooseCharacter);
  var anim;

  function chooseCharacter()
    {
        if(pers.value=="p1")
            {dog.style.visibility='hidden';
            anim=rabbit;
            }
        else 
              {rabbit.style.visibility='hidden';
              anim=dog;
              }
          
          window.getComputedStyle(anim).getPropertyValue("left");
    }

    

var img=document.getElementsByName("img");
var left=0;
var sus=0;
var jump=false;
var dreapta=true,stanga=false;

document.getElementById("submit").addEventListener("click",chooseCharacter);

//Functie pentru miscarea caracterului


function animation(e)
{

    if(e.keyCode==37 & jump==false && gameOver==false)
                    {
        
       if(stanga==false) 
        {left+=400; stanga=true;}
        
        anim.style.transition="0s";            
        anim.style.transform="scaleX(-1)";
        
        left-=10;
        
        anim.style.left=left+'px';
        dreapta=false;
        
        if(left<=250)
          left+=10;
                    }



    if(e.keyCode==39 & jump==false && gameOver==false){
     
      if(dreapta==false)
      {left-=400; dreapta=true;}
      stanga=false;
      anim.style.transition="0s";
        
      
        left+=10;
        anim.style.left=left+'px';
        anim.style.transform="scaleX(1)";
        if(left>=750)
          left-=10;
        
    }

}

//Cand se apasa tasta pentru saritura, se apeleaza functia de intoarcere


intoarcere=()=>
{
    sus=0;
    jump=false;
    anim.style.top=0;
    anim.style.transition="0.3s";
  


}



function saritura(e)
{
  
    if(e.keyCode==38 && gameOver==false){
      
        anim.style.transition="1s";
        if(jump==false)
        {
          jump=true;
          
          sus-=150;
          anim.style.transition="1.3s";
          anim.style.top=sus+'px';
          
          setTimeout(intoarcere,1500);
          
          
            
        }
  
     
  
          
      }
  
}

// Pentru saritura folosim onkeyup, pentru a nu ramane in aer caracterul daca jucatorul tine apasat pe tasta 
// Pentru miscarea stanga-dreapta a caracterului am folosit onkeydown pentru a putea tine apasata tasta cat timp vrem ca personajul sa se miste


document.onkeyup=saritura;
document.onkeydown=animation;



 

var gasit=0;
var x;
var gameOver=false;


//Formularul de conectare nu apare in pagina. Daca se apasa butonul pentru conectare, dispare formularul de inregistrare si apare cel de conectare

document.getElementById("formm").style.display='none';
document.getElementById("conectare").addEventListener("click",function(){ document.getElementById("conectare").style.display='none';
                                                      document.getElementById("cont").style.display='none';  gasit=1;       });


  
//jocul incepe dupa ce se apasa butonul de conectare sau cel de inregistrare                                                       
submit.addEventListener("click",s)
document.getElementById("connect").addEventListener("click",s)

function s()
{
    startGame=true;
}

var obstacle1=document.getElementById("obstacle1");



//Functia pentru deplasarea obstacolelor
var aj=900;
var st=-10+'px';



function transObstacle(ob)
{if(gameOver==false)
{
  var auxi=1070;
  aj=900;

aj=aj-10;


  var interv=setInterval(function()
  {
    if(ob.style.left>st){
  ob.style.left=aj+'px';


  var posanim=anim.getBoundingClientRect();
  leftanim1=posanim.left;
  rightanim=posanim.right;



  auxi=auxi-10;;
  if(leftanim1>=auxi-20 && leftanim1<auxi && jump==false && dreapta==true)
    {

    myAlert_a();
    gameOver=true;
    clearInterval(interv);
    clearInterval(creareobstacole);
    
    
    
    }

  ob.style.transition="0.001s";
  aj=aj-10;}
  },30);
  if(gameOver==false)
      setTimeout(function(){container.removeChild(ob)},6000); 
  
  
  
}
}


let scor=0;


//Cream obstacolul si il deplasam



function createObstacle()

{

  if(startGame==true){
    
  obst=document.createElement("img");
  obst.src="IMG/obstacle1.png";
  obst.style.position="absolute";
  obst.style.top=0;
  var stst=250;
  var aux=890;
  var sss=0;
  obst.style.top=stst+'px';
  obst.style.left=0;
  obst.style.left=aux+'px';
  obst.style.height=20;
  obst.style.marginLeft=20+'px';
  container.appendChild(obst);
  transObstacle(obst);
   
document.getElementById("scor").innerHTML="Scor: " + scor;
scor++;


  }
}


var creareobstacole;
//createObstacle();
creareobstacole=setInterval(createObstacle,7000);


//Functia afiseaza ferestra unei alerte create in html, care are display ul setat 'none'. Close->inchide fereastra; Replay->Se reia jocul

function myAlert_a()
{

  document.getElementById("alert").style.display='block';
  document.getElementById("close").addEventListener("click",function(){document.getElementById("alert").style.display='none';})
  document.getElementById("replay").addEventListener("click",function(){window.location.reload(),startGame=true;});
}



//Functia creeaza o fereastra a unei cand este apelata(appendChild). Close->se sterge fereastra(removeChild)

function myAlert_b()
{
  var createAlert=document.createElement('div');
  createAlert.setAttribute('id','alert2');
  container.appendChild(createAlert);
  createAlert.style.position='fixed';
  createAlert.style.left=580+'px';
  createAlert.style.zIndex=3000;
  createAlert.style.width=400+'px';
  createAlert.style.height=150+'px';
  createAlert.style.top=280+'px';


  var para = document.createElement("p");
  var node = document.createTextNode("Formular completat incorect!");

  createAlert.appendChild(para);
  para.appendChild(node);
  para.style.position='relative';
  para.style.fontSize=25+'px';
  para.style.left=45+'px';


  var close=document.createElement('button');
  var textclose=document.createElement("p");
  var par=document.createTextNode("Inchide");
  createAlert.appendChild(close);
  close.appendChild(textclose);
  textclose.appendChild(par);
  close.style.position='relative';
  close.style.left=150+'px';
  close.style.top=-5+'px';
  close.style.width=100+'px';
  close.style.height=40+'px';
  close.addEventListener("click",function(){container.removeChild(createAlert);startGame=false;});

  
  
}
 


//Cand se apeleaza functia inactiv se creeaza un div care acopera intregul ecran si in care se afiseaza de cate secunde utilizatorul nu a savarsit niciun eveniment
var inactivity;
var numarare=0;
function inactiv()
{
  inactivity=document.createElement('div');
  inactivity.setAttribute('id','inact');
  container.appendChild(inactivity);
  inactivity.style.position='fixed';
  inactivity.style.left=0;
  inactivity.style.zIndex=3030;
  inactivity.style.width=1515+'px';
  inactivity.style.height=750+'px';
  inactivity.style.top=0;
  numarare=1;
   var inactivityTime=document.createElement("p");
  
  
  var para = document.createElement("p");

   inactivity.appendChild(para);
  para.style.position='relative';
  para.style.fontSize=45+'px';
  para.style.left=400+'px';
  para.style.top=250+'px';

  var aux=20000;

//afisam mesajul, actualizat la fiecare secunda 

  var aux1=parseInt(aux/60000);
  var aux2=aux%60000;

  var verificareInactivitate=setInterval( function(){para.innerHTML="Ai fost inactiv "  + aux1 + ' minute si ' + aux2/1000 + ' secunde'; aux=aux+1000; aux1=parseInt(aux/60000); aux2=aux%60000;  },1000);


}


function idleLogout() {
  var t;

  //de fiecare data cand utilizatorul apasa pe o tasta, da click pe mouse sau misca mouse ul se reseteaza timpul de la ultimul eveniment savarsit la 0

  window.onload = resetTimer;
  window.onmousemove = resetTimer;
  window.onmousedown = resetTimer;        
  window.ontouchstart = resetTimer; 
  window.onclick = resetTimer;      
  window.onkeypress = resetTimer;   
  window.onkeydown=resetTimer;
  window.addEventListener('scroll', resetTimer, true); 


  function yourFunction() {
      inactiv();
  
  }

  function resetTimer() {
      clearTimeout(t);
      t = setTimeout(yourFunction, 20000);
      if(numarare==1)
         container.removeChild(inactivity);
      numarare=0;

  }
}
idleLogout();


//Selectez in el elementul cu id-ul h2 

var el=document.getElementsByTagName("h2")[0];
var messagesize=window.getComputedStyle(el).getPropertyValue('font-size');

el.style.transition='2s';
el.style.fontSize=parseInt(messagesize)+10+'px';


// function sendEmail() {
// 	Email.send({
//     SecureToken : "<1234>",
//     To : 'andreeabucur45@yahoo.com',
//     From : "andreeabucur45@yahoo.com",
//     Subject : "Test Email",
//     Body : "<html><h2>Header</h2><strong>Bold text</strong><br></br><em>Italic</em></html>"
//     }).then(
//         message => alert("mail sent successfully")
//     );
// }

// sendEmail();


