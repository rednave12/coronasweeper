// MINESWEEPER //

//to do
//generally tidy up a lot of stuff...
//fix being able to reveal mines after game has been won / lost.
//IMPROVE PERFORMANCE
//only need to draw grid on click.
//topbar still needs animating i guess...but could just do on slider input and game state changes!
//REDESIGN DRAWING FUNCTIONS!!!!!!!! ONLY DRAW REVEALED OR UPDATED SQUARES :)

document.addEventListener('contextmenu', event => event.preventDefault());
p5.disableFriendlyErrors = true

var cols = 10;
var rows = 10;
var factor = 15*0.01;

var slider = 1;

function sliderUpdate(val) {
	slider = val;
	if (clickCount == 0) { 
		newGame();
	}
}

var mineCount = Math.floor(cols*rows*factor*slider);

var h = Math.floor(window.innerHeight * 0.75);
var topBarH = 40;
var cellW = Math.floor((h-topBarH) / rows);
var canvH = (cellW * rows) + topBarH;
var gameH = canvH - topBarH;
var canvW = cellW * cols;
var gameW = canvW;
var topBarW = canvW;

let virus, vaccine;
let up, down, left, right;
let topright, topleft, bottomright, bottomleft;
let intbr, intbl, inttr, inttl;
let font;

var grid;
var bar;

var clickCount = 0;
var flags = 0;
var minesFound = 0;
var gameState = 0;

var diff = 'beginner';
	
function make2DArray(cols, rows) {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

function preload() {
	virus = loadImage('assets/Virus2.png');
	vaccine = loadImage('assets/syringe.png');
	up = loadImage('assets/up.png');
	down = loadImage('assets/down.png');
	left = loadImage('assets/left.png');
	right = loadImage('assets/right.png');
	topright = loadImage('assets/topright.png');
	topleft = loadImage('assets/topleft.png');
	bottomright = loadImage('assets/bottomright.png');
	bottomleft = loadImage('assets/bottomleft.png');
	intbr = loadImage('assets/intbr.png');
	intbl = loadImage('assets/intbl.png');
	inttr = loadImage('assets/inttr.png');
	inttl = loadImage('assets/inttl.png');
	font = loadFont('assets/PressStart2P-Regular.ttf');
}

function newGame() {
	if (diff == 'beginner') {
		cols = 10;
		rows = 10;
	} else if (diff == 'intermediate') {
		cols = 20;
		rows = 15;
	} else if (diff == 'expert') {
		cols = 30;
		rows = 20;
	}
	clear();
	reset();
	setup();
	draw();
}

function setup() {
	noLoop();
	createCanvas(canvW, canvH);
	grid = make2DArray(cols, rows);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i, j);
		}
	}
}

function mousePressed() {
	draw();
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].contains(mouseX, mouseY)) {
				if (mouseButton == LEFT && gameState != -1) {
					if (clickCount == 0) {
						grid[i][j].generateMines(mineCount);
					}
					clickCount++;
					grid[i][j].flood();
					grid[i][j].revealed = true;
					if(grid[i][j].mine) {
						gameState = -1;
					}

				} else if (mouseButton == RIGHT && gameState != -1) {
					if (grid[i][j].flagged) {
						grid[i][j].flagged = false;
						flags--;
						if (grid[i][j].mine) {
							minesFound--;
						}
					} else {
						grid[i][j].flagged = true;
						flags++;
						if (grid[i][j].mine) {
							minesFound++;
						}
					}
				}
			}
		}
  }
  draw();
}

function checkWin() {
	if (minesFound == mineCount) {
		gameState = 1;
	}
}


function isInRange(i, j) {
	if (i >= 0 && i < cols && j >= 0 && j < rows) {
		return true;
	} else {
		return false;
	}
}

function gameOver() {
	if (gameState != 0) {
		fill(200);
		rectMode(CENTER);
		rect(gameW/2, gameH/2-8, 400, topBarH);
		rectMode(CORNER);
		fill(255);
		textSize(15);
		textAlign(CENTER);
		text('PRESS ENTER TO PLAY AGAIN', gameW/2, gameH/2);
		textSize(12);
	}
}

function keyPressed() {
	if (keyCode == ENTER && gameState != 0) {
		gameState = 0;
		clear();
		reset();
		setup();
		draw();
	}
}

function reset() {
	mineCount = Math.floor(cols*rows*factor*slider);
	clickCount = 0;
	minesFound = 0;
	flags = 0;
	gameState = 0;
	cellW = Math.floor((h-topBarH) / rows);
	canvH = (cellW * rows) + topBarH;
	gameH = canvH - topBarH;
	canvW = cellW * cols;
	gameW = canvW;
	topBarW = canvW;
}

function draw() {
	clear();
	background(255);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show();
		}
	}
	checkWin();
	gameOver();
	bar = new topBar(topBarW, topBarH);
	bar.show();
}