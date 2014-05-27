var score = 0;


var AlienFlock = function AlienFlock() {
  this.invulnrable = true;
  this.dx = 10; this.dy = 0;
  this.hit = 1; this.lastHit = 0;
  this.speed = 10;                                                      // This determines how fast the aliens step is

  this.draw = function() {};

  this.die = function() {
    if(Game.board.nextLevel()) {
      Game.loadBoard(new GameBoard(Game.board.nextLevel())); 
    } else {
      Game.callbacks['win']();
    }
  }

  this.step = function(dt) { 
    if(this.hit && this.hit != this.lastHit) {
      this.lastHit = this.hit;
      this.dy = this.speed;
    } else {
      this.dy=0;                                                        // This determines if the aliens move down the y-axis while they step 
    }
    this.dx = this.speed * this.hit;

    var max = {}, cnt = 0;
    this.board.iterate(function() {
      if(this instanceof Alien)  {
        if(!max[this.x] || this.y > max[this.x]) {
          max[this.x] = this.y; 
        }
        cnt++;
      } 
    });

    if(cnt == 0) { this.die(); } 

    this.max_y = max;
    return true;
  };

}



var Alien = function Alien(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;                                                          // This determines the start position of the aliens on the x-axis
}

Alien.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

Alien.prototype.die = function() {
  GameAudio.play('die');
  this.flock.speed += 1;                                                // This determines how fast the alines move once one has been killed
  this.board.remove(this); 
// This functions defines that the alien is then removed upon collision 
    score = score +10;
    document.getElementById('score').innerHTML="Score : " + score;
                        
}

Alien.prototype.step = function(dt) { 													/* Here you can edit how the alien moves */ 
  this.mx += dt * this.flock.dx;
  this.y += this.flock.dy;
  if(Math.abs(this.mx) > 10) {                                          // This determines how frequent the frame rate is. The lower the number, the quicker the frame rate 
    if(this.y == this.flock.max_y[this.x]) {
      this.fireSometimes();                                             // This enables whether you want the aliens to fire or not  
    }
    this.x += this.mx;
    this.mx = 0;
    this.frame = (this.frame+1) % 2;
    if(this.x > Game.width - Sprites.map.alien1.w * 2) this.flock.hit = -1;
    if(this.x < Sprites.map.alien1.w) this.flock.hit = 1;
  }
  return true;
}

Alien.prototype.fireSometimes = function() { 											/* This represents how frequently the alien fires its missile(s) */
      if(Math.random()*100 < 10) {
        this.board.addSprite('missile',this.x + this.w/2 - Sprites.map.missile.w/2,
                                      this.y + this.h, 
                                     { dy: 115 });                      // This determines how the fast the bullets move down the y-axis
      }
}

var Player = function Player(opts) { 
  this.reloading = 0;
}

Player.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'player',this.x,this.y, this.frame);
}


Player.prototype.die = function() {
  GameAudio.play('die');                                                // This section represents the sound the accompanies the dieing function 
  Game.callbacks['die']();
}

Player.prototype.step = function(dt) {
  
    this.frame = 0;  /* Added */
    if(Game.keys['left']) { this.x -= 110 * dt; } 
  if(Game.keys['right']) { this.x += 110 * dt; }                        // This determines how fast the player moves when they press either the left and right key

  if(this.x < 0) this.x = 0;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;

  this.reloading--;

/* This overall section effects the functions and variables for the missile */
 
  if(Game.keys['fire'] && this.reloading <= 0 && this.board.missiles < 3) {  			/* This line of represents how many shots that can be fired at once */
      
    this.frame = 2;  /*Added */
    
    GameAudio.play('fire'); 															/* The sound that accompanies the missle */
    this.board.addSprite('missile',
                          this.x + this.w/2 - Sprites.map.missile.w/2,
                          this.y-this.h,
                          { dy: -190, player: true });                    // This determines how fast the players bullets fire 
    this.board.missiles++;
    this.reloading = 10;
  }
  return true;
}


var Missile = function Missile(opts) {
   this.dy = opts.dy;
   this.player = opts.player;
}

Missile.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'missile',this.x,this.y);
}

Missile.prototype.step = function(dt) {
   this.y += this.dy * dt;

   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

Missile.prototype.die = function() {
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}



var BossAlien = function BossAlien (opts) 

{ this.dx = opts.dx; 
 this.frame = 0;
 this.player= opts.player; }

BossAlien.prototype.draw = function(canvas) 
{ Sprites.draw(canvas, 'alien4', this.x, this.y, this.frame);}

BossAlien.prototype.step = function(dt)
{ this.x += this.dx;
 this.frame = (this.frame+1) % 2; 
 return true; } 

BossAlien.prototype.die = function() {
    GameAudio.play('bossfire');
    this.board.remove(this);
    this.player.frame=1;
}                                                                           // This section show the new alien that I added to run across the top


