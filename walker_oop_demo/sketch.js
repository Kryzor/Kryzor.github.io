//Walker OOP Demo

class Walker {
  constructor(x, y, theColor){
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.radius = 5;
    this.color = theColor;
  }
  display(){
    noStroke();
    fill(this.color);
    square(this.x, this.y, this.radius*2);
  }
  move() {
    let choice = random(100);
    if (choice < 25){
      this.y -= this.speed;
    }
    else if (choice < 50){
      this.y += this.speed;
    }
    else if (choice < 75){
      this.x -= this.speed;
    }
    else {
      this.x += this.speed;
    }
  }
}

let winston;
let radia;
let ant;
let grape;

function setup() {
  createCanvas(windowWidth, windowHeight);
  winston = new Walker(width/2, height/2, "red");
  radia = new Walker(width/2, height/2, "blue");
  ant = new Walker(width2, height/2, "black");
  grape = new Walker(width/2, height/2, "purple");
}

function draw() {
  winston.display();
  winston.move();
  radia.display();
  radia.move();
  ant.display();
  ant.move();
  grape.display();
  grape.move();
}
