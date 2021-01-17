function topBar(w, h) {
  this.mines = mineCount - flags;
  this.w = w;
  this.h = h;
  this.x = 0;
  this.y = this.h/2;
}

topBar.prototype.show = function() {
  stroke(0);
  fill(200);
  rect(0, 0, this.w, this.h);
  textFont(font);
  textAlign(LEFT);
  fill(255);
  text('Viruses: ' + this.mines, this.x+20, this.y+6);
  
  if (gameState == -1) {
    text('GAME OVER', this.x+this.w-200, this.y+6);
  }
  
  if (gameState == 1) {
    text('YOU WIN!', this.x+this.w*0.5, this.y+6);
  }
  
  //text('Drawing: ' + toDraw.length, this.x+20, this.y+6);
}