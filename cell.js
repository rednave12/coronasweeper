 var sf = 8/32;
 
 function Cell(i, j) {
	this.i = i;
	this.j = j;
	this.x = i * cellW;
	this.y = j * cellW + topBarH;
	cellW = cellW;

	this.revealed = false;
	this.flagged = false;
	this.mine = false;
	this.counter = 0;

	this.adjacentMines = 0;
	this.edgeState = [0, 0, 0, 0];
	this.cornerType = [0, 0, 0, 0];
}

 Cell.prototype.show = function() {
	textFont(font);
	fill(94);
	noStroke();
	rect(this.x, this.y, cellW);
	if (this.revealed) {
		if (this.mine) {
			image(virus, this.x + 3, this.y + 3, cellW * 0.8, cellW * 0.8)
		} else {
			textAlign(CENTER);
			if (this.adjacentMines == 0) {
				grid[this.i][this.j].findEdgeState();
				if(this.EdgeState != [0,0,0,0]) {
					grid[this.i][this.j].findExtCorners();
					grid[this.i][this.j].findIntCorners();
				}
				fill(81, 255, 153);
				rect(this.x, this.y, cellW);
				if (this.edgeState[0] == 1) {
					//text('U', this.x+ cellW/2, this.y+12);
					image(up, this.x, this.y, cellW, cellW*sf);
				}
				if (this.edgeState[1] == 1) {
					//text('R', this.x + cellW - 5, this.y + cellW/2);
					image(right, this.x+cellW-cellW*sf, this.y, cellW*sf, cellW);
				}
				if (this.edgeState[2] == 1) {
					//text('D', this.x + cellW/2, this.y + cellW);
					image(down, this.x, this.y+cellW-cellW*sf, cellW, cellW*sf);
				}
				if (this.edgeState[3] == 1) {
					//text('L', this.x + 5, this.y + cellW / 2);
					image(left, this.x, this.y, cellW*sf, cellW);
				}
				grid[this.i][this.j].drawCorners();
			} else {
				fill(255);
			}
			if (this.adjacentMines == 0) {
				noFill();
			}
			text(this.adjacentMines, this.x + cellW / 2, this.y + cellW / 2 + 5);
		}
	} else if (this.flagged) {
		image(vaccine, this.x + 3, this.y + 3, cellW * 0.8, cellW * 0.8);
	}
	for (var i = 0; i < cols; i++) {
		stroke(0);
		line(this.x, this.y, this.x, this.y+gameH);
	}
	line(gameW, topBarH, gameW, canvH);
   
	for (var j = 0; j < rows; j++) {
		line(this.x, this.y+cellW, this.x+gameW, this.y+cellW);
	}
 }

 Cell.prototype.countMines = function() {
	var mines = 0;
	if (this.mine) {
		this.adjacentMines = -1;
	}
	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			var inRange = isInRange(this.i + i, this.j + j);
			if (inRange) {
				var neighbour = grid[this.i + i][this.j + j];
				if (neighbour.mine) {
					mines++;
				}
			}
		}
	}
	this.adjacentMines = mines;
 }

 Cell.prototype.contains = function(x, y) {
	if (x > this.x && x < this.x + cellW && y > this.y && y < this.y + cellW) {
		return true;
	}
 }

 Cell.prototype.flood = function() {
	var adjacentMines = grid[this.i][this.j].countMines();
	if (this.adjacentMines != 0) {
		return;
	} else {
		for (var i = -1; i <= 1; i++) {
			for (var j = -1; j <= 1; j++) {
				var inRange = isInRange(this.i + i, this.j + j);
				if (inRange) {
					if (i != 0 || j != 0) {
						if (!grid[this.i + i][this.j + j].revealed) {
							grid[this.i + i][this.j + j].flood();
						}
					}
					grid[this.i + i][this.j + j].revealed = true;
				}
			}
		}
	}
 }

 Cell.prototype.generateMines = function(mineCount) {
	for (var i = 0; i < mineCount; i++) {
		var mineI = (this.i + floor(random(cols+1))) % cols;
		var mineJ = (this.j + floor(random(rows+1))) % rows;

		while (grid[mineI][mineJ].mine || (mineI == this.i && mineJ == this.j)) {
			mineI = (this.i + floor(random(cols+1))) % cols;
			mineJ = (this.j + floor(random(rows+1))) % rows;
		}
		grid[mineI][mineJ].mine = true;
	}
 }

 Cell.prototype.findEdgeState = function() {
	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			var inRange = isInRange(this.i + i, this.j + j);
			if ((abs(i) != abs(j)) && inRange && grid[this.i + i][this.j + j].adjacentMines != 0) {
				if (i == 0 && j == 1) {
					this.edgeState[2] = 1;
				} else if (i == 0 && j == -1) {
					this.edgeState[0] = 1;
				} else if (i == 1 && j == 0) {
					this.edgeState[1] = 1;
				} else if (i == -1 && j == 0) {
					this.edgeState[3] = 1;
				}
			}
		}
	}
 }

 Cell.prototype.findExtCorners = function() {
	if (this.edgeState[0] == 1) {
		if (this.edgeState[1] == 1) {
			//top right
			this.cornerType[1] = 1;
		}
		if (this.edgeState[3] == 1) {
			//top left
			this.cornerType[0] = 1;
		}
	}
	if (this.edgeState[2] == 1) {
		if (this.edgeState[1] == 1) {
			//bottom right
			this.cornerType[2] = 1;
		}
		if (this.edgeState[3] == 1) {
			//bottom left
			this.cornerType[3] = 1;
		}
	}
}

Cell.prototype.findIntCorners = function() {
	for (var i = -1; i <= 1; i ++) {
		for (var j = -1; j <= 1; j++) {
			var inRange = isInRange(this.i+i, this.j+j);
			if (inRange) { 
				if (abs(i) == abs(j) && grid[this.i+i][this.j+j].adjacentMines != 0) {
					//check corresponding two adjacents.
					if (grid[this.i+i][this.j].adjacentMines == 0 && grid[this.i][this.j+j].adjacentMines == 0) {
						if (i == -1 && j == -1) {
							this.cornerType[0] = -1;
						}
						if (i == 1 && j == -1) {
							this.cornerType[1] = -1;
						}
						if (i == 1 && j == 1) {
							this.cornerType[2] = -1;
						}
						if (i == -1 && j == 1) {
							this.cornerType[3] = -1;
						}
					}
				}
			}
		}
	}
}

 Cell.prototype.drawCorners = function() {
	if (this.cornerType[0] == 1) {
		fill(0);
		//text('TL', this.x, this.y);
		image(topleft, this.x, this.y, cellW*sf, cellW*sf);
	} else if (this.cornerType[0] == -1) {
		fill(255);
		//text('TL', this.x, this.y);
		image(inttl, this.x, this.y, cellW*sf, cellW*sf);
	}
	if (this.cornerType[1] == 1) {
		fill(0);
		//text('TR', this.x + cellW, this.y);
		image(topright, this.x + cellW-cellW*sf, this.y, cellW*sf, cellW*sf);
	} else if (this.cornerType[1] == -1) {
		fill(255);
		//text('TR', this.x + cellW, this.y);
		image(inttr, this.x + cellW-cellW*sf, this.y, cellW*sf, cellW*sf);
	}
	if (this.cornerType[2] == 1) {
		fill(0);
		//text('BR', this.x + cellW, this.y + cellW);
		image(bottomright, this.x+cellW-cellW*sf, this.y+cellW-cellW*sf, cellW*sf, cellW*sf);
	} else if (this.cornerType[2] == -1) {
		fill(255);
		//text('BR', this.x + cellW, this.y + cellW);
		image(intbr, this.x+cellW-cellW*sf, this.y+cellW-cellW*sf, cellW*sf, cellW*sf);
	}
	if (this.cornerType[3] == 1) {
		fill(0);
		//text('BL', this.x, this.y + cellW);
		image(bottomleft, this.x, this.y+cellW-cellW*sf, cellW*sf, cellW*sf);
	} else if (this.cornerType[3] == -1) {
		fill(255);
		//text('BL', this.x, this.y + cellW);
		image(intbl, this.x, this.y+cellW-cellW*sf, cellW*sf, cellW*sf);
	}
}