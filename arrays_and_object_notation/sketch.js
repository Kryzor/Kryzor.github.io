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
  ballBasicStuff();
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

//creates the ball variables and adds balls to an array
function createBallVariables(ballX, ballY){
  let ball = {
    x: ballX,
    y: ballY,
    speedX: random(-5, 5),
    speedY: random(-5, 5),
    velocityX: 0,
    velocityY: 0,
    gravity: 1,

    //this is like a percentage, if bounce is 1 then it will lose no velocity
    bounce: 0.5,


    radius: 10,
    r: random(255),
    g: random(255),
    b: random(255),
  };
  ballsArray.push(ball);
}

//creates the ball and the movement of the ball
function ballBasicStuff(){
  for (let ball of ballsArray){

    //sets up the ball
    fill(ball.r,ball.g,ball.b);
    circle(ball.x, ball.y, ball.radius*2);

    //adds movement to the ball
    //the site that i found to help with implementing the physics effect:
    //https://stackoverflow.com/questions/75070602/adding-links-into-a-p5-js-ball-physics-simulation
    ball.velocityY += ball.gravity;
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    let distance = sqrt();

    //the ball collision detection on the window
    if (ball.x + ball.radius >= width){
      ball.x = width - ball.radius;
      ball.velocityX *= -ball.bounce;
    }
    if (ball.x - ball.radius <= 0){
      ball.x = ball.radius;
      ball.velocityX *= -ball.bounce;
    }
    if (ball.y + ball.radius >= height){
      ball.y = height - ball.radius;
      ball.velocityY *= -ball.bounce;
    }
    if (ball.y - ball.radius <= 0){
      ball.y = ball.radius;
      ball.velocityY *= -ball.bounce;
    }
  }
}

//spawns the ball at the mouse cordinates when the mouse is clicked
function mousePressed(){
  if (screenState === 1){
    createBallVariables(mouseX, mouseY);
  }
}