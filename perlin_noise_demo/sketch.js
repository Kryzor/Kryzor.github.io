// Perlin noise ball
// Katos Booth
// October 7th 2024

let x;
let y;
let time = 0;
let timeY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);
  x = noise(time) * width;
  y = noise(time + 100) * height;
  circle(x,y,50);
  time += 0.05;
}
