// Grid Based Game
// Endless pac-man kind of thing
// Katos Booth
// October 28th 2024

let grid;
let cellSize;
const GRID_SIZE = 10;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const PLAYER = 9;
let thePlayer = {
  x:0,
  y:0,
};

let defaultPacManSprite;

function preload(){
  defaultPacManSprite = loadImage("images/pacman/pacman-default.png"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  noStroke();
  displayGrid();
}

function movePlayer(x, y) {
  //don't move off grid, and only move in open tiles
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE && grid[y][x] === OPEN_TILE) {

    //previous player location
    let oldX = thePlayer.x;
    let oldY = thePlayer.y;
  
    //keeping track of where the player is
    thePlayer.x = x;
    thePlayer.y = y;
  
    //reset the old location to be an empty tile
    grid[oldY][oldX] = OPEN_TILE;
  
    //put the player into the grid
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }

}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 1) {
        fill(0);
        square(x * cellSize, y * cellSize, cellSize);
      }
      else if (grid[y][x] === 0) {
        fill(0, 0, 255);
        square(x * cellSize, y * cellSize, cellSize);
      }
      else if (grid[y][x] === PLAYER) {
        image(defaultPacManSprite, x * cellSize, y * cellSize, cellSize, cellSize);
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
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);
      }
    }
  }
  return newGrid;
}