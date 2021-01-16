document.addEventListener('contextmenu', event => event.preventDefault());

//added to access canvas
var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');

var cols = 10;
var rows = 10;

var factor = 15*0.01;

var slider = 1;

function sliderUpdate(val) {
	document.getElementById("mineSlider").disabled = false;
	if (clickCount != 0) {
		document.getElementById("mineSlider").disabled = true;
	} else {
		slider = val;
		mineCount = Math.floor(cols*rows*factor*slider);
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

//these have all been changed
let virus = new Image;
let vaccine = new Image;
let up = new Image;
let down = new Image;
let left = new Image;
let right = new Image;
let topright = new Image;
let topleft = new Image;
let bottomright = new Image;
let bottomleft = new Image;
let intbr = new Image;
let intbl = new Image;
let inttr = new Image;
let inttl = new Image;
let font = new FontFace('Press Start', 'url(assets/PressStart2P-Regular.ttf)');

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
	
	//all this has been changed
  virus.src = 'assets/Virus2.png';
  vaccine.src = 'assets/syringe.png';
  up.src = 'assets/up.png';
  down.src = 'assets/down.png';
  left.src = 'assets/left.png';
  right.src = 'assets/right.png';
  topright.src = 'assets/topright.png';
  topleft.src = 'assets/topleft.png';
  bottomright.src = 'assets/bottomright.png';
  bottomleft.src = 'assets/bottomleft.png';
  intbr.src = 'assets/intbr.png';
  intbl.src = 'assets/intbl.png';
  inttr.src = 'assets/inttr.png';
  inttl.src = 'assets/inttl.png';
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
	document.getElementById("mineSlider").disabled = false;
	
	//clear();
	ctx.clearRect(0, 0, c.width, c.height);
	
	reset();
	setup();
}

function setup() {
  //createCanvas(canvW, canvH);
  //sub for???
  c.width = canvW;
  c.height = canvH;
  
  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

}

//change to onclick event!
//mouseX and mouseY
//ACTION REQUIRED
function mousePressed() {
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
	  
	  //CHANGE ALL OF THIS DRAWING
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
	
	//CLEARING
    //clear();
	ctx.clearRect(0, 0, c.width, c.height);
	
    reset();
    setup();
  }
}

function reset() {
  mineCount = Math.floor(cols*rows*factor*slider);
  clickCount = 0;
  minesFound = 0;
  flags = 0;
  cellW = Math.floor((h-topBarH) / rows);
  canvH = (cellW * rows) + topBarH;

  gameH = canvH - topBarH;

  canvW = cellW * cols;
  gameW = canvW;
  topBarW = canvW;
}

function draw() {
	//THIS
	clear();
	ctx.clearRect(0, 0, c.width, c.height);
	
  //background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
  bar = new topBar(topBarW, topBarH);
  bar.show();
  checkWin();
  gameOver();
}