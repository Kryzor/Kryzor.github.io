// Grid Based Game
// Endless pac-man kind of thing
// Katos Booth
// October 28th 2024

let mazeGrid;
let cellSize;
const GRID_SIZE = 25;
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
  mazeGrid = generateRandomGrid(GRID_SIZE,GRID_SIZE);
  
  //creates the spawn position for pac man
  thePlayer.spawnPositionX = cellSize*1.5;
  thePlayer.spawnPositionY = cellSize*1.5;
  thePlayer.x = thePlayer.spawnPositionX;
  thePlayer.y = thePlayer.spawnPositionY;
  noStroke();
  background(0);
}

//Detect when the window is resized
function windowResized(){
  createCanvas(windowWidth, windowHeight);
  noSmooth();
}

function draw() {
  screenController();
}

//Controls which screen is allowed tobe visible
function screenController(){
  if (screenState === 1){
    displayGameScreen();
  }
  else {
    displayMainScreen();
  }
}

//Displays the game screen
function displayGameScreen(){
  displayGrid();
  createPlayer();
}

//Displays the main screen
function displayMainScreen(){
  background(0);
}

function createPlayer(){
  displayPlayer();
  movePlayer();
}

function movePlayer() {
  //center point
  let playerGridX = Math.floor(thePlayer.x/cellSize);
  let playerGridY = Math.floor(thePlayer.y/cellSize);

  let playerUpperGridY = Math.floor(thePlayer.y/cellSize-0.45);

  let playerLowerGridY = Math.floor(thePlayer.y/cellSize+0.45);

  let playerLeftGridX = Math.floor(thePlayer.x/cellSize-0.45);

  let playerRightGridY = Math.floor(thePlayer.x/cellSize+0.45);
  
  //Detect states to move the player
  if (PacManMoveState === 1){
    thePlayer.y -= thePlayer.speed;
  }
  else if (PacManMoveState === 2){
    thePlayer.x -= thePlayer.speed;
  }
  else if (PacManMoveState === 3){
    thePlayer.y += thePlayer.speed;
  }
  else if (PacManMoveState === 4){
    thePlayer.x += thePlayer.speed;
  }
  
  //Check for collision with the window
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
  
  
  playerGridCollision(playerGridX, playerGridY, playerUpperGridY, playerLowerGridY,  playerLeftGridX, playerRightGridY);
}

//Detects the grid collision
function playerGridCollision(gridX, gridY, upperGridY, lowerGridY, leftGridX, rightGridX){
  if (mazeGrid[upperGridY][gridX] === IMPASSIBLE){
    thePlayer.y = thePlayer.y+cellSize/10;
  }
  if (mazeGrid[lowerGridY][gridX] === IMPASSIBLE){
    thePlayer.y = thePlayer.y-cellSize/10;
  }
  if (mazeGrid[gridY][leftGridX] === IMPASSIBLE){
    thePlayer.x = thePlayer.x+cellSize/10;
  }
  if (mazeGrid[gridY][rightGridX] === IMPASSIBLE){
    thePlayer.x = thePlayer.x-cellSize/10;
  }
  inputsForGame();
}

//Get the inputs for the game
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

//Display the player
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

//Generates the grid
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

//Displays the grid
function displayGrid() {
  //Checks each tile
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {

      //Checks the tile and gives it colour appropiate to its state
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