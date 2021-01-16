var c = document.getElementById("bg");

var ctx = c.getContext("2d");

var count = 15;

var img = new Image;

var viruses = new Array(count);

function Virus() {
  this.x = (Math.random() * (c.width-20)) + 10;
  this.y = (Math.random() * (c.height-20)) + 10;
 
  var scale = Math.random();
  
  if (scale < 0.5) {
  	f = -1;
  } else {
  	f = 1;
  }
  
  this.xv = Math.random() * f;
  this.yv = Math.random() * f;
}

Virus.prototype.show = function() {
	ctx.drawImage(img, this.x, this.y);
}

Virus.prototype.update = function() {
  //Collision with walls
  if (this.y + 20 >= c.height || this.y - 20 <= 0) {
  	this.yv = -this.yv;
  }
  if (this.x + 25 >= c.width || this.x + 5 <= 0) {
  	this.xv = -this.xv;
  }
  
  this.x += this.xv;
  this.y += this.yv;
  
}

function preloading() {
	img.src = 'assets/Virus2.png';
}

function setupping() {
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	
	ctx.fillStyle = '#000000';
	
   for (var j = 0; j < count; j++) {
      viruses[j] = new Virus();
    }
	window.requestAnimationFrame(drawing);
}

function drawing() {
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.fillRect(0, 0, c.width, c.height);
	for (var i = 0; i < viruses.length; i++) {
  	viruses[i].update();
  	viruses[i].show();
  }
  window.requestAnimationFrame(drawing);
}

preloading();
setupping();