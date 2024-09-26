// Interactive Scene
// Katos Booth
// September 2024
// A silly little snake game


let screenIsVisible = true;
let snakeLength = 1;
let snakeState = 0;
let snakeX = 0;
let snakeY = 0;
let highlighted = false;
let pressed = false;
let buttonX = 128;
let buttonY = 128;
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
    snake();
  } 
}
function startScreen(){
  background(56,120,200);
}
function gameScreen(){
  background(150,60,80);
}
function button(){
  buttonIsHighlighted();
  buttonIsPressed();
  buttonX = windowWidth/2-buttonWidth/2;
  buttonY = windowHeight/2-buttonHeight/2;
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
  rect(buttonX, buttonY, buttonWidth, buttonHeight);
  textAlign(CENTER);
  textSize(20);
  text("Start the uhhhhhhhh game", buttonX, buttonY+buttonHeight/3, buttonWidth, buttonHeight);
}
function buttonIsPressed() {
  if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight && mouseIsPressed) {
    pressed = true;
    screenIsVisible = false;
  }
  else{
    pressed = false;
  }
}
function buttonIsHighlighted() {
  if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight && !mouseIsPressed) {
    highlighted = true;
  }
  else {
    highlighted = false;
  }
}
function snakeStateChanger(){
  if (keyIsDown(68)){
    snakeState = 1;
  }
  else if (keyIsDown(87)){
    snakeState = 2;
  }
  else if(keyIsDown(65)){
    snakeState = 3;
  }
  else if (keyIsDown(83)){
    snakeState = 0;
  }
}
function snake(){
  snakeStateChanger();
  square(snakeX,snakeY,20);
  if (snakeX >= windowWidth){
    rese
  }
  if (snakeState === 0){
    snakeY += 1;
  }
  if (snakeState === 1){
    snakeX += 1;
  }
  if (snakeState === 2){
    snakeY -= 1;
  }
  if (snakeState === 3){
    snakeX -= 1;
  }
}