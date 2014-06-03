// This is an array. 1 & 2 & 3 represents Alien 1 & 2 & 3 respectively, whilst 0 represents no alien. Depending on each level, you can change from bottom top what type, how many and what direction the alines come from.


var levelData = { 
     1:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,2,2,2,2,0,0,0],
          [0,0,0,0,1,1,1,1,0,0,0]],
     2:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,0,0,0,0,0,0,0,0,0]],
     3:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,3,3,3,3,3,3,3,0,0],
          [0,0,3,3,3,3,3,3,3,0,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,2,1,1,1,1,1,1,1,2,0],
          [1,1,1,1,1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1,1,1,1,1],
          [0,0,0,0,0,0,0,0,0,0,0]]};																
 

// This shows how the sprites are drawn. By taking the value of its x and y axis value in the sprite sheet, width and height in pixels & the amount of frames per sprite - all coressponding corectly 

  var spriteData = { 
    'alien1': { sx: 0,  sy: 0,  w: 20, h: 18, cls: Alien, frames: 2 }, 					'alien2': { sx: 0,  sy: 18, w: 20, h: 18, cls: Alien, frames: 2 },
    'alien3': { sx: 48,  sy: 0, w: 20, h:18, cls: Alien, frames: 2 },
    'player': { sx: 0,  sy: 36, w: 26, h: 17, cls: Player, frames: 3 },
    'missile': { sx: 0,  sy: 86, w: 6,  h: 14, cls: Missile },
    'alien4': { sx: 0, sy: 60, w: 20, h: 18, cls: BossAlien, frames: 2 },
  }                                                                                               
  
  function loseLife(){
      if(this.Player) lives = 0;
      document.getElementById('lives').innerHTML="LIVES : " + lives;
  }
  
  

  function startGame() {
    var screen = new GameScreen("PACMAN INADERS","PRESS SPACE TO SPART",                           // This represents what is shown in the start screen
                                
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
    Game.loop();
    GameAudio.play('start'); 
      lives = 0;
  }

  function endGame() {
    var screen = new GameScreen(" GAME OVER","PRESS SPACE TO RESTART",                             // This represents what is shown when do you get hit by an alien missile 
                                
                                
                                
                                
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                                           
                                     lives = 1; 
                                     
document.getElementById('lives').innerHTML="LIVES : " + lives;                                     
                                       score = 0;
                                     document.getElementById('score').innerHTML="SCORE : " + score;
                                 });
    Game.loadBoard(screen);
  }


  function winGame() {
    var screen = new GameScreen("YOU WIN!","PRESS SPACE TO RESTART",                              // This represents what is shown when you beat all 3 levels and win the game 
                                
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                     score = 0;
                                     document.getElementById('score').innerHTML="SCORE : " + score;
                                 });
    Game.loadBoard(screen);
  }

  $(function() {
    GameAudio.load({ 'fire' : 'media/waka.ogg', 'die' : 'media/laserdeath.ogg', 'start' : 'media/startsound.ogg', 'bossfire' : 'media/laser.ogg'}, // These are the sound files which are enabled and accompany each assigned action 
                   
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });
