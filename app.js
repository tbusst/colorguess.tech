var easy = document.getElementById("easy");
var hard = document.getElementById("hard");
var hex = document.getElementById("hex");
var rgb = document.getElementById("rgb");

var panels = document.getElementById("panels");
var panelsHard = document.getElementById("panels-hard");
var correctGuess = document.getElementById("guess");

var isRGB = true;
var isEasy = true;

let colorChoice;
let randNum

easy.addEventListener("click", () => {
    on(easy, hard);
    panelsHard.style.display = "none";
    isEasy = true; color();
});
hard.addEventListener("click", () => {
    on(hard, easy);
    panelsHard.style.display = "flex";
    isEasy = false;
    color()
});
hex.addEventListener("click", () => { on(hex, rgb); isRGB = false; color()});
rgb.addEventListener("click", () => { on(rgb, hex); isRGB = true; color()});

function randInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function on(on, off) {
    on.style.backgroundColor = "#0C3B40";
    off.style.backgroundColor = "#112226";
}

function randomColor() {
    if (isRGB) {
        colorChoice = `RGB(${randInt(255)}, ${randInt(255)}, ${randInt(255)})`;
        return colorChoice;
    } else {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        colorChoice = '#' + n.slice(0, 6);
        return colorChoice;
    }
}

function color() {
    for (let i = 0; i < 3; i++) {   
        panels.children[i].style.backgroundColor = randomColor();
        panelsHard.children[i].style.backgroundColor = randomColor();
    }

    var panelsNum;
    if (isEasy) {
        panelsNum = 3;
    } else {
        panelsNum = 6;
    }

    let correctColor = randomColor();
    correctGuess.children[0].innerText = correctColor;

    randNum = randInt(panelsNum) - 1;
    if (randNum < 3){
        panels.children[randNum].style.backgroundColor = colorChoice;
    } else {
        panelsHard.children[randNum - 3].style.backgroundColor = colorChoice;
    }

    console.log(`The correct color is in slot ${randNum + 1}`);
}   

function guess(panel) {
    if (panel == randNum) {
        console.log("Correct!");
        color();
    } else {
        console.log("Incorrect");
        color();
    }
}

color();