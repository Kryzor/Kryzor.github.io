// Character in Grid Demo
// Katos Booth
// October 23rd 2024

let grid;
let cellSize;
const GRID_SIZE = 10;
const OPEN_TILE = 0;
const IMPASSABLE= 1;
const PLAYER = 9;
let thePlayer = {
  x:0,
  y:0,
};
let grassImg;
let pathImg;

function preload(){
  grassImg = loadImage("grass.jpg");
  pathImg = loadImage("path.jpg");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  //add player to grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function windowResized(){
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowHeight);
  }
  cellSize = height/GRID_SIZE;
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed(){
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //toggle self
  toggleCell(x, y);
}

function toggleCell(x, y){
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE){
    if (grid[y][x] === OPEN_TILE){
      grid[y][x] = IMPASSABLE;
    }
    else if (grid[y][x] === IMPASSABLE) {
      grid[y][x] = OPEN_TILE;
    }
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "s"){
    //move down
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  if (key === "w"){
    //move up
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  if (key === "d"){
    //move right
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
  if (key === "a"){
    //move left
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
}

function movePlayer(x, y){
  //dont move off grid
  if(x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE && grid[y][x] === OPEN_TILE){

    let oldX = thePlayer.x;
    let oldY = thePlayer.y;
  
    //keeping track of where the player is
    thePlayer.x = x;
    thePlayer.y = y;
  
    //reset the previous location
    grid[oldY][oldX] = OPEN_TILE;
  
    //put the player into the grid
    grid[thePlayer.x][thePlayer.x] = PLAYER;
  }

}


function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === IMPASSABLE) {
        image(grassImg, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === OPEN_TILE) {
        image(pathImg, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if  (grid[y][x] === PLAYER){
        fill("red");
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
      //make it a 1 half the time, a 0 half the time
      if (random(100) < 50) {
        newGrid[y].push(IMPASSABLE);
      }
      else {
        newGrid[y].push(OPEN_TILE);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}