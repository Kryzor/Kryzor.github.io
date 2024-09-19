// squaremoving around the screen
// september 19th 2024

let x = 0;
let y =  0;
let speed = 5;
let squareSize = 50;
let state = 0;

function setup() {
  
}

function draw() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  moveSquare();
  drawSquare()
}

function drawSquare(){
  fill(255);
  square(x,y,squareSize);
}

function moveSquare(){
  if (state === 0){
    x += speed;
    if (x >= width - squareSize){
      state =1;
    }
  }
  else if (state === 1){
    y += speed;
    if  (y >= height - squareSize){
      state = 2;
    }
  }
  else if (state === 2){
    x -= speed;
    if  (x <=0){
      state = 3;
    }
  }
  else if (state === 3){
    y -= speed;
    if  (y <=0){
      state = 0;
    }
  }
}