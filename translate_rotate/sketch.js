// Translate rotate
// Katos Booth
// October 17th 2024


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  translate(200,200);
  rotate(mouseX);
  square(0,0,50);
  pop();

  fill("green");
  rect(width/2, 400, width*2, 200);
}
