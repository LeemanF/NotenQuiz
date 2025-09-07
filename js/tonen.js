"use strict"

window.addEventListener("load", Initialise);
//window.addEventListener("keypress", CheckSoundByKeyPress);

var randomSound;
var rightSound;
var wrongSound;
var bodyOfDocument;
var btnRandomGeluid;
var btnHerhaalGeluid;
var btnLuisteren;
var cbxOctaaf3;
var cbxOctaaf4;
var cbxOctaaf5;
var musicData;
var quiz = false;

function Initialise(){
    bodyOfDocument = document.querySelector('body');
    btnRandomGeluid = document.getElementById('randomGeluid');
    btnHerhaalGeluid = document.getElementById('herhaalGeluid');
    btnLuisteren = document.getElementById('luisteren');
    cbxOctaaf3 = document.getElementById('octaaf3');
    cbxOctaaf4 = document.getElementById('octaaf4');
    cbxOctaaf5 = document.getElementById('octaaf5');
    
    rightSound = {
        audio: new Audio("assets/audio/juist.mp3")
    }
    wrongSound = {
        audio: new Audio("assets/audio/fout.mp3")
    }

    btnRandomGeluid.addEventListener('click', () => {AddButtons(), SelectRandomSound()});
    btnHerhaalGeluid.addEventListener('click', () => {if(quiz == true) PlaySound(randomSound)});
    btnLuisteren.addEventListener('click', () => {quiz = false, rightSound.audio.play(), document.title = "Tonen herkennen"});
    cbxOctaaf3.addEventListener('change', () => {BuildMusicData(), AddButtons()});
    cbxOctaaf4.addEventListener('change', () => {BuildMusicData(), AddButtons()});
    cbxOctaaf5.addEventListener('change', () => {BuildMusicData(), AddButtons()});

    BuildMusicData();
    AddButtons();
    btnRandomGeluid.focus();

}

function CheckSoundByKeyPress(e) {
    switch(e.key) {
        case "A":
        case "a":
            CheckAnswer("A");
            break;
        case "B":
        case "b":
            CheckAnswer("B");
            break;
        case "C":
        case "c":
            CheckAnswer("C");
            break;
        case "D":
        case "d":
            CheckAnswer("D");
            break;
        case "E":
        case "e":
            CheckAnswer("E");
            break;
        case "F":
        case "f":
            CheckAnswer("F");
            break;
        case "G":
        case "g":
            CheckAnswer("G");
            break;
        case "S":
        case "s":
            SelectRandomSound()
            break;
        case "R":
        case "r":
            PlaySound(randomSound);
            break;
        case "Enter":
        case "Space":
            break;
        default:
            CheckAnswer("X");
    }
}

function SelectRandomSound(){
    let random = Math.floor(Math.random() * musicData.length);
    
    randomSound = {
        audio: new Audio(musicData[random].sound),
        key: musicData[random].key,
        name: musicData[random].name
    }

    PlaySound(randomSound);
    document.title = `${musicData[random].key} - ${musicData[random].name}`
    quiz = true;
}

function PlaySound(selectedSound) {
    selectedSound.audio.loop = false;
    selectedSound.audio.play();
    //console.log(selectedSound);
}

function CheckAnswer(answerToCheck) {
    if(answerToCheck == randomSound.key.substring(0,answerToCheck.length)) {
        rightSound.audio.loop = false;
        rightSound.audio.play();
        btnRandomGeluid.focus();
    }
    else {
        wrongSound.audio.loop = false;
        wrongSound.audio.play();
    }
}

function AddButtons() {
    let btn;
    let pTag;
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let numberOfDiv;
    let selectedSound;
    
    let notendiv = document.getElementById('noten');
    notendiv.innerHTML = "";
    
    div1.className = 'noten';
    div2.className = 'noten';
    div3.className = 'noten';


    for(let i = 0; i < musicData.length; i++) {
        numberOfDiv = parseInt(i/7) +1;
        
        btn = document.createElement('button');
        pTag = document.createElement('p');

        pTag.innerHTML = `${musicData[i].key}<br>${musicData[i].name}`;

        btn.appendChild(pTag);
        btn.addEventListener('click', () => 
            {
                if(quiz == true) 
                    CheckAnswer(musicData[i].key); 
                else 
                    {
                        let selectedSound;
                        selectedSound = {
                            audio: new Audio(musicData[i].sound),
                            key: musicData[i].key,
                            name: musicData[i].name
                        };
                        PlaySound(selectedSound);
                    }
            });

        if(numberOfDiv == 1) div1.appendChild(btn);
        else if(numberOfDiv == 2) div2.appendChild(btn);
        else if(numberOfDiv ==3) div3.appendChild(btn);
    }
    if(div1.childElementCount != 0) notendiv.appendChild(div1);
    if(div2.childElementCount != 0) notendiv.appendChild(div2);
    if(div3.childElementCount != 0) notendiv.appendChild(div3);
}

function BuildMusicData() {
    musicData = musicDataBasis;
    quiz = false;
    document.title = "NotenQuiz";

    if(!cbxOctaaf3.checked) {
        musicData = musicData.filter(a => a.key.substr(1,1) != 3);
    }
    if(!cbxOctaaf4.checked) {
        musicData = musicData.filter(a => a.key.substr(1,1) != 4);
    }
    if(!cbxOctaaf5.checked) {
        musicData = musicData.filter(a => a.key.substr(1,1) != 5);
    }

    if(!cbxOctaaf3.checked && !cbxOctaaf4.checked && !cbxOctaaf5.checked) {
        btnRandomGeluid.style.display = "none";
        btnHerhaalGeluid.style.display = "none";
        btnLuisteren.style.display = "none";
    }
    else {
        btnRandomGeluid.style.display = "inline-block";
        btnHerhaalGeluid.style.display = "inline-block";
        btnLuisteren.style.display = "inline-block";
    }
}