// Traffic Light Starter Code
// Katos
// September 24th 2024

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let colourState = 0;
let waitTime = 1000;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(30);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  lights();
  if (colourState === 0){
    fill('red');
  }
  else {
    fill(0);
  }
  ellipse(width/2, height/2 - 65, 50, 50); //top
  fill('yellow');
  ellipse(width/2, height/2, 50, 50); //middle
  fill('green');
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function lights(){
  if (colourState === 0){
    if (millis() < waitTime){
      colourState = 1;
    }
  }
  else if (colourState === 1){
    if  (millis() < waitTime){
      colourState = 0;
    }
  }
}