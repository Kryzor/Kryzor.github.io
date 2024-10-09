// Simple little game
// Katos Booth
// October 9th 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let screenState = 0;

let button = {
  w: 500,
  h: 100,
  x: 0,
  y: 0,
  tl: 4,
  tr: 4,
  bl: 4,
  br: 4,
};

function setup() {
  createCanvas(windowWidth, windowHeight);

  //sets button positions to be effected by the windows size
  button.x = (windowWidth - button.w)/2;
  button.y = (windowHeight - button.h)/2;
}

function draw() {
  background(220);
  screenController();
}

//this controls what screens will be displayed
function screenController(){
  if (screenState === 0){
    mainScreen();
  }
}

function mainScreen(){
  fill(30,220,80);
  if (mouseX > button.x && button.w && mouseX < button.w){
    stroke(255,5,5);
    strokeWeight(2);
  }
  else {
    stroke(0);
    strokeWeight(1);
  }
  rect(button.x, button.y, button.w, button.h, button.tl, button.tr);
}

function gameScreen() {

}

