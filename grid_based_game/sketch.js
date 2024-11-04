// Grid Based Game
// Endless pac-man kind of thing
// Katos Booth
// October 28th 2024

let mazeGrid;
let cellSize;
const GRID_SIZE = 50;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
let thePlayer = {
  x:0,
  y:0,
  speed: 0,
  spawnPositionX: 0,
  spawnPositionY: 0,
};

let PacManMoveState = 0;

let defaultPacManSprite;
let rightPacManSprite;
let downPacManSprite;
let leftPacManSprite;
let upPacManSprite;

let screenState = 1;

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
  thePlayer.speed = cellSize*0.1;
  mazeGrid = generateRandomGrid(50,50);
  
  //creates the spawn position for pac man
  thePlayer.spawnPositionX = Math.floor(width/2);
  thePlayer.spawnPositionY = Math.floor(height/2);
  thePlayer.x = thePlayer.spawnPositionX;
  thePlayer.y = thePlayer.spawnPositionY;
  noStroke();
  background(0);
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
  noSmooth();
}

function draw() {
  screenController();
}

function screenController(){
  if (screenState === 1){
    displayGameScreen();
  }
  else {
    displayMainScreen();
  }
}

function displayGameScreen(){
  displayGrid();
  createPlayer();
}

function displayMainScreen(){
  background(0);
}

function createPlayer(){
  displayPlayer();
  movePlayer();
}

function movePlayer() {
  let playerGridX = Math.round(thePlayer.x/cellSize);
  let playerGridY = Math.round(thePlayer.y/cellSize);
  if (PacManMoveState === 1){
    thePlayer.y -= thePlayer.speed;
  }
  if (PacManMoveState === 2){
    thePlayer.x -= thePlayer.speed;
  }
  if (PacManMoveState === 3){
    thePlayer.y += thePlayer.speed;
  }
  if (PacManMoveState === 4){
    thePlayer.x += thePlayer.speed;
  }
  
  //with window collision
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
  
  //grid collision
  playerGridCollision(playerGridX, playerGridY);
}

function playerGridCollision(x,y){
  inputsForGame();
}

function inputsForGame(){
  if (keyIsDown(38) === true){
    PacManMoveState = 1;
  }
  if (keyIsDown(37) === true){
    PacManMoveState = 2;
  }
  if (keyIsDown(40) === true){
    PacManMoveState = 3;
  }
  if (keyIsDown(39) === true){
    PacManMoveState = 4;
  }

}

function displayPlayer(){
  if (PacManMoveState === 0){
    image(defaultPacManSprite, thePlayer.x, thePlayer.y, cellSize, cellSize);
  }
  if (PacManMoveState === 1){
    image(upPacManSprite, thePlayer.x, thePlayer.y, cellSize, cellSize);
  }
  if (PacManMoveState === 2){
    image(leftPacManSprite, thePlayer.x, thePlayer.y, cellSize, cellSize);
  }
  if (PacManMoveState === 3){
    image(downPacManSprite, thePlayer.x, thePlayer.y, cellSize, cellSize);
  }
  if (PacManMoveState === 4){
    image(rightPacManSprite, thePlayer.x, thePlayer.y, cellSize, cellSize);
  }
}

//Generates the maze
function generateRandomGrid(cols, rows) {
  const grid = Array.from({length:rows}, () => Array(cols).fill(IMPASSIBLE));

  function carvePath(x,y){
    const directions = [
      {dx: 0, dy: -1},//up
      {dx: 0, dy: 1},//down
      {dx: 1, dy: 0},//right
      {dx: -1, dy: 0},//left
    ];
    directions.sort(() => Math.random() - 0.5);

    directions.forEach(({dx,dy}) => {
      const nx = x + dx * 2;
      const ny = y + dy * 2;
      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && grid[ny][nx] === IMPASSIBLE){
        grid[y + dy][x + dx] = OPEN_TILE;
        grid[ny][nx] = OPEN_TILE;
        carvePath(nx, ny);
      }
    });
  }

  grid[1][1] = OPEN_TILE;
  carvePath(1,1);

  return grid;
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (mazeGrid[y][x] === OPEN_TILE) {
        fill(0);
        square(x * cellSize, y * cellSize, cellSize);
      }
      else if (mazeGrid[y][x] === IMPASSIBLE) {
        fill(0, 0, 255);
        square(x * cellSize, y * cellSize, cellSize);
      }
    }
  }
}