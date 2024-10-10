// Bubble arrray object notation demo
// Katos Booth
// October 10th 2024

let theBubbles = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 5; i++){
    spawnBubble();
  }
  //create new bubble every half second
  window.setInterval(spawnBubble, 50);
}

function draw() {
  background(0);
  //moveBubblesRandomly();
  moveBubblesWithNoise();
  displayBubbles();
}

function moveBubblesWithNoise(){
  for (let bubble of theBubbles){
    let x = noise(bubble.timeX) * width;
    let y = noise(bubble.timeY) * height;
    bubble.x = x;
    bubble.y = y;
    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
  }
}

function mousePressed(){
  for (let bubble of theBubbles){
    if (clickedInBubble(mouseX, mouseY, bubble)){
      let theIndex = theBubbles.indexOf(bubble);
      theBubbles.splice(theIndex, 1);
    }
  }
}

function clickedInBubble(x, y, theBubble){
  let distanceAway = dist(x, y, theBubble.x, theBubble.y);
  if (distanceAway < theBubble.radius){
    return true;
  }
  else {
    return false;
  }
}

function displayBubbles(){
  for (let bubble of theBubbles){
    stroke(0,0,0,55);
    fill(bubble.r,bubble.g,bubble.b,bubble.a);
    circle(bubble.x, bubble.y, bubble.radius*2);
  }
}

function moveBubblesRandomly(){
  for (let bubble of theBubbles){
    let choise = random(100);
    if (choise<50){
      //move up
      bubble.y -= bubble.speed;
    }
    else if (choise < 65){
      bubble.y += bubble.speed;
    }
    else if (choise < 80){
      bubble.x += bubble.speed;
    }
    else{
      bubble.x -= bubble.speed;
    }
  }
}

function spawnBubble(){
  let someBubble = {
    x: random(width),
    y: height + random(0,25),
    speed: random(2,5),
    radius: random(20,40),
    r: random(255),
    g: random(255),
    b: random(255),
    a: 55,
    timeX: random(1000000),
    timeY: random(1000000),
    deltaTime: 0.001,
  };
  theBubbles.push(someBubble);
}