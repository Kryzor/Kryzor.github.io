// sound effects demo
// Katos Booth
// October 16th 2024
let bgMusic;

function preload(){
  bgMusic = loadSound('background_music.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function mousePressed(){
  if (!bgMusic.isPlaying()){
    bgMusic.loop();
  }
}