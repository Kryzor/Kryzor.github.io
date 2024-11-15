// Grid Based Game
// This was supposed to be an endlessly generating pac man game
// but i took too long to get some parts finished
// Katos Booth
// October 28th 2024
// Extra for experts: the generation for the maze took some time but i got it working
// the generation can be infinite but it will be very laggy
// thats why i limited the size. I will continue this for my major project though
//

let mazeGrid;
let cellSize;

const MAZE_SIZE = 100;

//visual grid size for the amount of blocks will be seen on screen
let gridSize = 20;

//grid states
const OPEN_TILE = 0;
const IMPASSIBLE = 1;

//player variables
let thePlayer = {
  x:0,
  y:0,
  speed: 0,
  spawnPositionX: 0,
  spawnPositionY: 0,
  spawnBox: 0,
};

//the state for the players movement
let PacManMoveState = 0;

let spriteState = 0;
let lastSpriteTime;
const SPRITE_ANIMATION_DURATION = 200;

let defaultPacManSprite;

let rightPacManSprite;
let rightPacManSprite1;
let rightPacManSprite2;
let rightPacManSprite3;
let rightPacManSprite4;
let rightPacManSprite5;

let downPacManSprite;

let leftPacManSprite;

let upPacManSprite;

//the state for the screen
let screenState = 1;

//loads the sprites
function preload(){
  defaultPacManSprite = loadImage("images/pacman/pacman-default.png"); 

  rightPacManSprite = loadImage("images/pacman/pacman-right0.png"); 
  rightPacManSprite1 = loadImage("images/pacman/pacman-right1.png"); 
  rightPacManSprite2 = loadImage("images/pacman/pacman-right2.png");
  rightPacManSprite3 = loadImage("images/pacman/pacman-right3.png"); 
  rightPacManSprite4 = loadImage("images/pacman/pacman-right4.png");
  rightPacManSprite5 = loadImage("images/pacman/pacman-right5.png"); 
  
  downPacManSprite = loadImage("images/pacman/pacman-down0.png");
  
  leftPacManSprite = loadImage("images/pacman/pacman-left0.png"); 
  
  upPacManSprite = loadImage("images/pacman/pacman-up0.png"); 
}

function setup() {
  frameRate(60);
  //creates the screen
  createCanvas(windowWidth, windowHeight);
  
  //makes cellSize scale to the height of the screen
  cellSize = height/gridSize;
  
  //creates the spawn position for pac man
  thePlayer.spawnBox = Math.round(gridSize/2);
  thePlayer.x = thePlayer.spawnBox * cellSize+cellSize/2;
  thePlayer.y = thePlayer.spawnBox * cellSize+cellSize/2;

  mazeGrid = generateRandomGrid(MAZE_SIZE, MAZE_SIZE);
  imageMode(CENTER);
  noSmooth();
  background(0);
}

//Detect when the window is resized to update certain stuff so it wont look bugged
function windowResized(){
  createCanvas(windowWidth, windowHeight);
  noSmooth();
}

function draw() {
  cellSize = height/gridSize;
  //makes the speed go the same speed for the size of the grid, if it was a static number
  //it would go super fast on a screen fitting a large amount of squares
  //or super slow on a screen fitting a little amount of squares
  thePlayer.speed = cellSize*0.1;
  screenController();
}

//Controls which screen is allowed to be visible
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
  background(0);
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

  //directional points
  let playerUpperGridY = Math.floor(thePlayer.y/cellSize-0.45); //up
  let playerLowerGridY = Math.floor(thePlayer.y/cellSize+0.45); //down
  let playerLeftGridX = Math.floor(thePlayer.x/cellSize-0.45); //left
  let playerRightGridY = Math.floor(thePlayer.x/cellSize+0.45); //right
  
  //Checks states to move the player depending on that state
  if (PacManMoveState === 1){ //up
    thePlayer.y -= thePlayer.speed;
  }
  else if (PacManMoveState === 2){ //left
    thePlayer.x -= thePlayer.speed;
  }
  else if (PacManMoveState === 3){ //down
    thePlayer.y += thePlayer.speed;
  }
  else if (PacManMoveState === 4){ //right
    thePlayer.x += thePlayer.speed;
  }
  
  playerGridCollision(playerGridX, playerGridY, playerUpperGridY, playerLowerGridY,  playerLeftGridX, playerRightGridY);
  inputsForGame();
}

//Detects the grid collision
function playerGridCollision(gridX, gridY, upperGridY, lowerGridY, leftGridX, rightGridX){
  if (mazeGrid[upperGridY][gridX] === IMPASSIBLE){ //up
    thePlayer.y = thePlayer.y+cellSize/10;
  }
  if (mazeGrid[lowerGridY][gridX] === IMPASSIBLE){ //down
    thePlayer.y = thePlayer.y-cellSize/10;
  }
  if (mazeGrid[gridY][leftGridX] === IMPASSIBLE){ //left
    thePlayer.x = thePlayer.x+cellSize/10;
  }
  if (mazeGrid[gridY][rightGridX] === IMPASSIBLE){ //right
    thePlayer.x = thePlayer.x-cellSize/10;
  }
}

//Get the inputs for the game
function inputsForGame(){
  if (keyIsDown(38) === true || keyIsDown(87) === true){ //up
    PacManMoveState = 1;
  }
  if (keyIsDown(37) === true || keyIsDown(65) === true){ //left
    PacManMoveState = 2;
  }
  if (keyIsDown(40) === true || keyIsDown(83) === true){ //down
    PacManMoveState = 3;
  }
  if (keyIsDown(39) === true || keyIsDown(68) === true){ //right
    PacManMoveState = 4;
  }
  if (keyIsDown(189) === true){ // plus
    gridSize += 0.1;
  }
  if (keyIsDown(187) === true){ // minus
    gridSize -= 0.1;
  }
}

//Displays the player
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

  //carves the path
  function carvePath(x,y){
    const directions = [
      {dx: 0, dy: -1},//up
      {dx: 0, dy: 1},//down
      {dx: 1, dy: 0},//right
      {dx: -1, dy: 0},//left
    ];

    //change the random number to change how often lines will be made
    //decrease the value for more vertical lines
    //increase the value for more horizontal lines
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

  //sets the 9 middle boxes to an open tile for spawn point
  grid[thePlayer.spawnBox-2][thePlayer.spawnBox] = OPEN_TILE; //higher top middle
  grid[thePlayer.spawnBox-1][thePlayer.spawnBox-1] = OPEN_TILE; //top left
  grid[thePlayer.spawnBox-1][thePlayer.spawnBox] = OPEN_TILE; //top middle
  grid[thePlayer.spawnBox-1][thePlayer.spawnBox+1] = OPEN_TILE; //top right
  grid[thePlayer.spawnBox][thePlayer.spawnBox-1] = OPEN_TILE; //left middle
  grid[thePlayer.spawnBox][thePlayer.spawnBox] = OPEN_TILE; //center
  grid[thePlayer.spawnBox][thePlayer.spawnBox+1] = OPEN_TILE; //right middle
  grid[thePlayer.spawnBox+1][thePlayer.spawnBox-1] = OPEN_TILE; //bottom left
  grid[thePlayer.spawnBox+1][thePlayer.spawnBox] = OPEN_TILE; //bottom middle
  grid[thePlayer.spawnBox+1][thePlayer.spawnBox+1] = OPEN_TILE; //bottom right

  carvePath(1,1);

  return grid;
}

//Displays the grid
function displayGrid() {
  //Checks each tile
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {

      //gives the squares colour appropiate to its state
      if (mazeGrid[y][x] === OPEN_TILE) {
        fill("black");
        noStroke();
        square(x * cellSize, y * cellSize, cellSize);
      }
      else if (mazeGrid[y][x] === IMPASSIBLE) {
        fill("blue");
        stroke("blue");
        square(x * cellSize, y * cellSize, cellSize);
      }
    }
  }
}