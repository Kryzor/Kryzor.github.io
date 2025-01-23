// Final
// Katos
// Jan 23rd 2025

//the ball class

class Ball{
  constructor(x, y, velocityX, velocityY, r, g, b){
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.gravity = 1;
    this.size = 25;
    this.bounce = 0.75;
    this.r = r;
    this.g = g;
    this.b = b;
  }
  displayBall(){
    //gives the ball its appearance
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.size);
  }
  moveBall(){
    //applies gravity and velocity to position
    this.velocityY += this.gravity;
    this.x += this.velocityX;
    this.y += this.velocityY;

    //checks if it is going off screen to make it switch directions
    if (this.y + this.size/2 >= height){
      this.y = height - this.size/2;
      this.velocityY *= -this.bounce;
    }
    if (this.y - this.size/2 <= 0){
      this.y = 0 + this.size/2;
      this.velocityY *= -this.bounce;
    }
    if (this.x + this.size/2 >= width){
      this.x = width - this.size/2;
      this.velocityX *= -this.bounce;
    }
    if (this.x - this.size/2 <= 0){
      this.x = 0 + this.size/2;
      this.velocityX *= -this.bounce;
    }
  }
}

//what holds all the balls
let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  //adds balls at start up
  for (let i = 0; i < 5; i++){
    ballArray.push(new Ball(random(0, windowWidth), random(0, windowHeight), random(-5,5), random(-5,5), random(0,255), random(0,255), random(0,255)));
  }
}

function draw() {
  background(220);

  //checks each thing in the array to call the function of that thing
  for (let theBall = 0; theBall < ballArray.length; theBall++){
    ballArray[theBall].displayBall();
    ballArray[theBall].moveBall();
  }
}

//spawns ball when clicked
function mouseClicked(){
  ballArray.push(new Ball(mouseX, mouseY, random(-5,5), random(-5,5), random(0,255), random(0,255), random(0,255)));
}