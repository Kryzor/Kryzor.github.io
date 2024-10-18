// Simple little ball playground
// Katos Booth
// October 9th 2024
//
// Extra for Experts:
// Adding some form of physics to the balls to bounce around and interact with the window
// Making the setup useless? i dont think that would count but it was super good to update the window
// as it was being messed with so the balls can accurately interact with the window properly
// i dont remember anything about adding variables to a string in class
// i may be wrong though

let screenState = 0;
let ballCreationTimes = 1;
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

//setup is made useless so the canvas can update and change its size when the window is changed
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

  //the text telling you how to do something
  textSize(20);
  fill(240);
  textAlign(LEFT);
  text("Press R to remove all the balls from the screen", 0, 10, width);
  text("Click to spawn a ball", 0, 35, width);
  text("Press the plus key to add more balls to your clicks and minus key to remove balls from your clicks", 0,60, width);

  setupButton();
}

//the game screen that shows when the main menu button is pressed
function gameScreen() {
  background(220);

  //the text to show the values of stuff
  textSize(15);
  fill(0);
  textAlign(LEFT);
  text(`${ballsArray.length} balls exist`, 0, 10, width);
  text(`${ballCreationTimes} balls will be created upon clicking`, 0, 30, width);
  ballBasicStuff();
  editingStuff();
}

//the setup for the start menu button
function setupButton(){
  fill(30,220,80);

  //detects moouse hovering over the button
  if (mouseX > button.x && button.w && mouseX < button.x + button.w && mouseY > button.y && button.h && mouseY < button.y + button.h){
    stroke(10,170,10);
    strokeWeight(5);

    //detects the click to change screen
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
function createBall(ballX, ballY){
  let ball = {
    x: ballX,
    y: ballY,
    velocityX: random(-10,10),
    velocityY: random(-10,10),
    gravity: 1.0,
    friction: 0.5,

    //this is a percentage
    bounce: 90,

    radius: random(10,50),
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

    //the ball collision detection on the window
    if (ball.x + ball.radius >= width){
      ball.x = width - ball.radius;
      ball.velocityX *= -ball.bounce/100;
    }
    if (ball.x - ball.radius <= 0){
      ball.x = ball.radius;
      ball.velocityX *= -ball.bounce/100;
    }
    if (ball.y + ball.radius >= height){
      ball.y = height - ball.radius;
      ball.velocityY *= -ball.bounce/100;
    }
    if (ball.y - ball.radius <= 0){
      ball.y = ball.radius;
      ball.velocityY *= -ball.bounce/100;
    }
  }
}

//creates the balls
function mousePressed(){
  if (screenState === 1){
    for (let i = 0; i < ballCreationTimes; i++){
      createBall(mouseX, mouseY);
    }   
  }
}

//this stores the stuff that edits certain stuff
function editingStuff(){
  if (keyIsDown(187) === true){
    ballCreationTimes += 1;
  }
  if (keyIsDown(189) === true){
    ballCreationTimes -= 1;
  }
  if (keyIsDown(82) === true){
    ballsArray = [];
  }
}