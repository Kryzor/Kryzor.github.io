// Image Demo
// Katos
// September 23rd 2023

let spongebob;

function preload(){
  spongebob = loadImage('spongedude.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(spongebob, mouseX,mouseY,50,50);
}
