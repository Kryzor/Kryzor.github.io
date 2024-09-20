// Interactive Scene
// Katos Booth
// September 2024


let screenIsVisible = true;
let highlighted = false;
let pressed = false;
let x = 128;
let y = 128;
let buttonWidth = 500;
let buttonHeight = 50;

function setup() {}
function draw() {
  createCanvas(windowWidth,windowHeight);
  if (screenIsVisible){
    startScreen();
    button();
  }
  else {
    gameScreen();
  } 
}
function startScreen(){
  background(56,120,200);
}
function gameScreen(){
  background(150,60,80);
  circle(50,50,50)
}
function button(){
  buttonIsHighlighted();
  buttonIsPressed();
  x = (windowWidth/2)-buttonWidth/2;
  y = (windowHeight/2)-buttonHeight/2;
  if (highlighted){
    fill(150);
    strokeWeight(4);
    stroke(255,255,0);
  }
  else if (pressed){
    fill(100);
    stroke(255,255,0);
  }
  else {
    strokeWeight(2);
    fill(150);
    stroke(255);
  }
  rect(x, y, buttonWidth, buttonHeight);
  textAlign(CENTER);
  textSize(20);
  text('Start the uhhhhhhhh game', x, y+buttonHeight/3, buttonWidth, buttonHeight);
}
function buttonIsPressed() {
  if (mouseX > x && mouseX < x + buttonWidth && mouseY > y && mouseY < y + buttonHeight && mouseIsPressed) {
    pressed = true;
    screenIsVisible = false;
  }
  else{
    pressed = false;
  }
}
function buttonIsHighlighted() {
  if (mouseX > x && mouseX < x + buttonWidth && mouseY > y && mouseY < y + buttonHeight && !mouseIsPressed) {
    highlighted = true;
  }
  else {
    highlighted = false
  }
}