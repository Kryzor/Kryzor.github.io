// Grid Based Game
// Endless pac-man kind of thing
// Katos Booth
// October 28th 2024

let grid;
let cellSize;
const GRID_SIZE = 25;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const PLAYER = 9;
let thePlayer = {
  x:0,
  y:0,
  speed: 5,
};

let PacManSpriteState = 0;
let defaultPacManSprite;
let rightPacManSprite;
let downPacManSprite;
let leftPacManSprite;
let upPacManSprite;

function preload(){
  defaultPacManSprite = loadImage("images/pacman/pacman-default.png"); 
  rightPacManSprite = loadImage("images/pacman/pacman-right0.png"); 
  downPacManSprite = loadImage("images/pacman/pacman-down0.png"); 
  leftPacManSprite = loadImage("images/pacman/pacman-left0.png"); 
  upPacManSprite = loadImage("images/pacman/pacman-up0.png"); 
}

function setup() {
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  cellSize = height/GRID_SIZE;
  thePlayer.x = cellSize/2;
  thePlayer.y = cellSize/2;
  thePlayer.speed = cellSize*0.1;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
}

function windowResized(){
  noSmooth();
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  screenDisplayer();
}

function screenDisplayer(){
  pixelDensity(1);
  background(0);
  noStroke();
  displayGrid();
  createPlayer();
}

function createPlayer(){
  displayPlayer();
  movePlayer();
}

function movePlayer() {
  let playerGridX = Math.floor(thePlayer.x/cellSize);
  let playerGridY = Math.floor(thePlayer.x/cellSize);
  if (key === 'd'){
    PacManSpriteState = 1;
    thePlayer.x += thePlayer.speed;
  }
  if (key === 'a'){
    PacManSpriteState = 2;
    thePlayer.x -= thePlayer.speed;
  }
  if (key === 's'){
    PacManSpriteState = 3;
    thePlayer.y += thePlayer.speed;
  }
  if (key === 'w'){
    PacManSpriteState = 4;
    thePlayer.y -= thePlayer.speed;
  }

  //collision
  if (thePlayer.x + cellSize/2 > width){
    thePlayer.x = width - cellSize/2;
  }
  if (thePlayer.x - cellSize/2 < 0){
    thePlayer.x = cellSize/2;
  }
  if (thePlayer.y - cellSize/2 < 0){
    thePlayer.y = cellSize/2;
  }
  if (thePlayer.y + cellSize/2 > height){
    thePlayer.y = height - cellSize/2;
  }
}

function displayPlayer(){
  if (PacManSpriteState === 0){
    image(defaultPacManSprite, thePlayer.x, thePlayer.y, cellSize, cellSize);
  }
  if (PacManSpriteState === 1){
    image(rightPacManSprite, thePlayer.x, thePlayer.y, cellSize, cellSize);
  }
  if (PacManSpriteState === 2){
    image(leftPacManSprite, thePlayer.x, thePlayer.y, cellSize, cellSize);
  }
  if (PacManSpriteState === 3){
    image(downPacManSprite, thePlayer.x, thePlayer.y, cellSize, cellSize);
  }
  if (PacManSpriteState === 4){
    image(upPacManSprite, thePlayer.x, thePlayer.y, cellSize, cellSize);
  }
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === IMPASSIBLE) {
        fill(0);
        square(x * cellSize, y * cellSize, cellSize);
      }
      else if (grid[y][x] === OPEN_TILE) {
        fill(0, 0, 255);
        square(x * cellSize, y * cellSize, cellSize);
      }
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(IMPASSIBLE);
      }
      else {
        newGrid[y].push(OPEN_TILE);
      }
    }
  }
  return newGrid;
}