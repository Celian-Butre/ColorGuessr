const errorMargin = 20

const liveSquare = document.getElementById("colorLiveSquare");
const goalSquare = document.getElementById("colorGoalSquare");
// Get the slider elements
const redSlider = document.getElementById("redSlider");
const greenSlider = document.getElementById("greenSlider");
const blueSlider = document.getElementById("blueSlider");

// Get the value display elements
const redValueDisplay = document.getElementById("redValue");
const greenValueDisplay = document.getElementById("greenValue");
const blueValueDisplay = document.getElementById("blueValue");

const revealButton = document.getElementById("revealButton");
let revealRestart = false;

const distanceText = document.getElementById("AnswerDistance");
const ValueText = document.getElementById("AnswerValue");

const proButton = document.getElementById("proButton");
let proMode = false;

proButton.addEventListener("click", function() {
    proMode = !proMode;
  if (proMode) {
    proButton.textContent = "Learning Mode";
  } else {
    proButton.textContent = "Pro Mode";
  }
});

revealButton.addEventListener("click", function() {
    revealRestart = !revealRestart;
  if (revealRestart) {
    revealButton.textContent = "Restart";
    reveal();
  } else {
    revealButton.textContent = "Reveal";
    gameLoop();
  }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const Color = {
    R: 0,
    G: 0,
    B: 0,
    print: function(){
        console.log(`R : ${this.R} \nG : ${this.G} \nB : ${this.B} \n`);
    },
    distance : function(originColor){
        return(((originColor.R-this.R)**2+(originColor.G-this.G)**2+(originColor.B-this.B)**2)**0.5);
    },
    rgbCSS: function(){
        return(`rgb(${this.R}, ${this.G}, ${this.B})`);
    }
};

function winCondition(goalColor, playerColor){
    return([goalColor.distance(playerColor) <= errorMargin, goalColor.distance(playerColor)]);
}


let liveColor = Object.create(Color);
let goalColor = Object.create(Color);

// Event listener for redSlider value change
redSlider.addEventListener("input", function() {
    liveColor.R = redSlider.value;
    redValueDisplay.textContent = liveColor.R;
    if (!proMode) {
    liveSquare.style.backgroundColor = liveColor.rgbCSS();
    }
});

// Event listener for greenSlider value change
greenSlider.addEventListener("input", function() {
    liveColor.G = greenSlider.value;
    greenValueDisplay.textContent = liveColor.G;
    if (!proMode) {
        liveSquare.style.backgroundColor = liveColor.rgbCSS();
    }
});

// Event listener for blueSlider value change
blueSlider.addEventListener("input", function() {
    liveColor.B = blueSlider.value;
    blueValueDisplay.textContent = liveColor.B;
    if (!proMode) {
        liveSquare.style.backgroundColor = liveColor.rgbCSS();
    }
});



function gameLoop(){
    liveColor.R = 0;
    liveColor.G = 0;
    liveColor.B = 0;
    liveSquare.style.backgroundColor = liveColor.rgbCSS();
    //testColor.print();

    goalColor.R = getRandomInt(256);
    goalColor.G = getRandomInt(256);
    goalColor.B = getRandomInt(256);
    goalSquare.style.backgroundColor = goalColor.rgbCSS();

    redSlider.value = 0;
    greenSlider.value = 0;
    blueSlider.value = 0;

    redValueDisplay.textContent = 0;
    greenValueDisplay.textContent = 0;
    blueValueDisplay.textContent = 0;

    distanceText.textContent = `Distance :`;
    ValueText.textContent = `Value : `;
    console.log("restart");
}


function reveal(){
    liveSquare.style.backgroundColor = liveColor.rgbCSS();
    distance = Math.ceil(winCondition(goalColor, liveColor)[1]);
    distanceText.textContent = `Distance : ${distance}`;
    ValueText.textContent = `Value : ${goalColor.R},${goalColor.G},${goalColor.B}`;
    console.log("reveal");
}



function main(){
    let testColor = Object.create(Color);
    testColor.R = 255;
    testColor.G = 0;
    testColor.B = 0;
    
    //testColor.print();
    
    let otherColor = Object.create(Color);
    otherColor.R = 0;
    otherColor.G = 255;
    otherColor.B = 255;
    
    //console.log(testColor.distance(otherColor));
    console.log("biboup");
    gameLoop();
}

main();