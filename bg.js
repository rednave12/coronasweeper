var c = document.getElementById("bg");
var ctx = c.getContext("2d");

var count = 30;

var v = new Image;
var a = new Image;

var viruses = new Array(count);
var antibodies = new Array(count);

function bgReset() {
	window.cancelAnimationFrame(drawing);
	ctx.clearRect(0, 0, c.width, c.height);
	//preloading();
	setupping();
	//drawing();
}

function Particle(type, index) {
	this.type = type;
	this.index = index;
	
	if (this.type == 0) {
		this.x = (Math.random() * (c.width-20)) + 10;
		this.y = (Math.random() * (c.height-20)) + 10;
		
		var r = Math.random();
		var f;
  
		if (r < 0.5) {
			f = -1;
		} else {
			f = 1;
		}
  
		this.xv = Math.random() * f;
		this.yv = Math.random() * f;
		
	} else if (this.type == 1) {
		this.x = c.width / 2;
		this.y = c.height / 2;
		
		this.xv = 0;
		this.yv = 0;
		
		this.theta = 0;
		this.rotobj = a;
		this.stopper = 0;
	}
}

Particle.prototype.show = function() {
	if (this.type == 0) {
		ctx.drawImage(v, this.x, this.y);
	}
	
	if (this.type == 1) {
		ctx.drawImage(this.rotobj, this.x, this.y);
	}
}

rotateAndCache = function(image,angle) {
  var offscreenCanvas = document.createElement('canvas');
  var offscreenCtx = offscreenCanvas.getContext('2d');

  var size = Math.max(image.width, image.height);
  offscreenCanvas.width = size;
  offscreenCanvas.height = size;

  offscreenCtx.translate(size/2, size/2);
  offscreenCtx.rotate(angle + Math.PI/2);
  offscreenCtx.drawImage(image, -(image.width/2), -(image.height/2));

  return offscreenCanvas;
}

Particle.prototype.update = function() {
	//VIRUSES
	if (this.type == 0) {
		//COLLISION WITH WALLS
		if (this.y + 20 >= c.height || this.y - 20 <= 0) {
			this.yv = -this.yv;
		}
		if (this.x + 25 >= c.width || this.x + 5 <= 0) {
			this.xv = -this.xv;
		}
		
		//loss
		if (gameState == -1) {
			
			if (this.x > (c.width/2 + width/2)) {
				this.xv = this.x - ((c.width/2) + width/2);
			} else if (this.x < (c.width/2 - width/2)) {
				this.xv = this.x - ((c.width/2) - (width/2) - 30);
			} else if (this.y > (c.height/2 + height/2)) {
				this.yv = this.y - ((c.height/2 + height/2));
			} else if (this.y < (c.height/2 - height/2)) {
				this.yv = this.y - ((c.height/2 - height/2) - 30);
			}
			
			this.xv = -this.xv / 40;
			this.yv = -this.yv / 40;
			
			// if (this.y + 20 >= c.height - 90 || this.y - 20 <= 50) {
				// this.yv = -this.yv;
			// }
			// if (this.x + 20 >= c.width - 90 || this.x - 20 <= 50) {
				// this.xv = -this.xv;
			// }
		}		
		//POSITION UPDATED BY VELOCITY
		this.x += this.xv;
		this.y += this.yv;
	}
	
	//ANTIBODIES
	if (this.type == 1) {
		
		if (Math.abs(this.x - viruses[this.index].x) > 20 || Math.abs(this.y - viruses[this.index].y) > 20) {
		
			this.yv = this.y - viruses[this.index].y;
			this.xv = this.x - viruses[this.index].x;
	
			this.theta = Math.atan(this.yv / this.xv);
			//this.theta = this.theta * 180 / Math.PI;

			this.rotobj = rotateAndCache(a, -this.theta);
			
			var k = sqrt(((this.yv * this.yv) + (this.xv * this.xv)) / 10); 
			
			this.yv = -this.yv / k;
			this.xv = -this.xv / k;
			
			this.x += this.xv;
			this.y += this.yv;
			
		} else {
			this.x += viruses[this.index].xv;
			this.y += viruses[this.index].yv;
		}
		//rotate image to follow direction of travel
		//make virus/antibody complex wiggle before virus disappears and antibody flies around in victory
	}
}

function preloading() {
	v.src = 'assets/Virus2.png';
	a.src = 'assets/antibody.png';
}

function setupping() {
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	
	ctx.fillStyle = '#000000';
	
	for (var i = 0; i < count; i++) {
		viruses[i] = new Particle(0, i);
    }
	
	for (var j = 0; j < count; j++) {
		antibodies[j] = new Particle(1, j);
	}
	//window.requestAnimationFrame(drawing);
}

function drawing() {
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.fillRect(0, 0, c.width, c.height);
	for (var i = 0; i < viruses.length; i++) {
		viruses[i].update();
		viruses[i].show();
		
		
		if (gameState == 1) {
			antibodies[i].update();
			antibodies[i].show();
		}
	}
	window.requestAnimationFrame(drawing);
}

preloading();
setupping();
window.requestAnimationFrame(drawing);