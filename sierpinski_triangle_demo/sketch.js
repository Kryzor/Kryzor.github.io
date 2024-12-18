// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let initialTriangle = [
  {x: 625, y: 50},
  {x: 50, y: 800},
  {x: 1250, y:  800}
];

let theDepth = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  sierpinski(initialTriangle, theDepth);
}

function mousePressed() {
  if (theDepth < 7){
    theDepth++;
  }
}

function midPoint(point1, point2){
  let midX = (point1.x + point2.x)/2;
  let midY = (point1.y + point2.y)/2;
  return{x: midX, y: midY};
}

function sierpinski(points, depth){
  triangle(points[0].x, points[0].y, 
    points[1].x, points[1].y, 
    points[2].x, points[2].y);
  if(depth > 0){
    //up
    sierpinski([points[0],midPoint(points[0], points[1]),midPoint(points[0], points[2])],depth -1);

    //left
    sierpinski([points[1],midPoint(points[0], points[1]),midPoint(points[1], points[2])],depth -1);
    //right
    sierpinski([points[2],midPoint(points[0], points[2]),midPoint(points[1], points[2])],depth -1);
  }
}