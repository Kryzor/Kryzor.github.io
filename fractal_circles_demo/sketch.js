// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  recursiveCircles(width/2, height/2, mouseX);
}

function recursiveCircles(x, y, radius){
  circle(x, y, radius*2);

  if (radius > 20){
    recursiveCircles(x + radius/2, y, radius/2);
    recursiveCircles(x - radius/2, y, radius/2);
  }
}
