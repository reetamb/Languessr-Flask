var languages, phones, language, phonemes;

var start = document.getElementById("start");
var answer = document.getElementById("answer");
var result = document.getElementById("result");
var reveal = document.getElementById("reveal");
var score = document.getElementById("score");
var newgame = document.getElementById("new");
var input = document.getElementById("preguess");

var consonants = document.getElementById("consonants");
var vowels = document.getElementById("vowels");
var tones = document.getElementById("tones")

await fetch('static/data/languages.json').then(r1 => r1.json())
.then(d1 => {
    languages = d1;
})

await fetch('static/data/phonemes.json').then(r2 => r2.json())
.then(d2 => {
    phones = d2;
});

await fetch('/lang').then(r3 => r3.json())
.then(d3 => {
    language = d3.language;
    phonemes = d3.phonemes;
});

let row, col;
phonemes.forEach((phoneme) => {
    console.log(phoneme);
    
    let data = phones[phoneme];
    row, col = 0;
    if (data.type == 'consonant') {
        if (data.manner == 'nasal') { row = 1; }
        if (data.manner == 'plosive') { row = 2; }
        if (data.manner == 'affricate') { row = 3; }
        if (data.manner == 'fricative') { row = 4; }
        if (data.manner == 'liquid') { row = 5; }
        if (data.manner == 'non-pulmonic') { row = 6; }

        if (data.place == 'labial') { col = 1; }
        if (data.place == 'coronal') { col = 2; }
        if (data.place == 'retroflex') { col = 3; }
        if (data.place == 'palatal') { col = 4; }
        if (data.place == 'velar') { col = 5; }
        if (data.place == 'laryngeal') { col = 6; }

        consonants.rows[row].cells[col].innerHTML += phoneme + " ";
    } else if (data.type == 'vowel') {
        if (data.height == 'close') { row = 1; }
        if (data.height == 'close-mid') { row = 2; }
        if (data.height == 'open-mid') { row = 3; }
        if (data.height == 'open') { row = 4; }
        
        if (data.backness == 'front') { col = 1; }
        if (data.backness == 'central') { col = 2; }
        if (data.backness == 'back') { col = 3; }

        vowels.rows[row].cells[col].innerHTML += phoneme + " ";
    } else if (data.type == 'tone') {
        col = 0;
        if (data.contour) { col = 1 }

        tones.rows[1].cells[col].innerHTML += phoneme + " ";
    }
})