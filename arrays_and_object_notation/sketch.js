// Simple little game
// Katos Booth
// October 9th 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let screenState = 0;
let ballsArray = [];

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


function setup() {}

function draw() {

  //updates the window variables as the window is messed with to prevent weird visual issues
  createCanvas(windowWidth, windowHeight);
  button.x = (windowWidth - button.w)/2;
  button.y = (windowHeight - button.h)/2;

  screenController();
}

//this controls what screens will be displayed
function screenController(){
  if (screenState === 0){
    mainScreen();
  }
  if (screenState === 1){
    gameScreen();
  }
}

//the main screen that shows up upon starting the project
function mainScreen(){
  background(100,160,200);
  setupButton();
}

//the game screen that shows when the main menu button is pressed
function gameScreen() {
  background(220);
  createBall(random(windowWidth), random(windowHeight));
}

//the setup for the start menu button
function setupButton(){
  fill(30,220,80);
  if (mouseX > button.x && button.w && mouseX < button.x + button.w && mouseY > button.y && button.h && mouseY < button.y + button.h){
    stroke(10,170,10);
    strokeWeight(5);
    if (mouseIsPressed){
      screenState = 1;
    }
  }
  else {
    stroke(0);
    strokeWeight(1);
  }
  rect(button.x, button.y, button.w, button.h, button.tl, button.tr);
  textSize(40);
  textAlign(CENTER);
  fill(240);
  text("Start the ball playground", button.x + button.w/2, button.y + button.h/1.6);
}

//creates the ball
function createBall(ballX, ballY){
  noStroke();
  fill(ball.r,ball.g,ball.b);
  circle(theBall.x, theBall.y, theBall.radius*2);
  let ball = {
    x: ballX,
    y: ballY,
    radius: 10,
    r: random(255),
    g: random(255),
    b: random(255),
  };
  ballsArray.push(ball);
}

function ballMovement(){

}