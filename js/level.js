
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
          [0,0,0,0,0,0,0,0,0,0,0]]};																/* 1 & 2 & 3 represents Alien 1 & 2 & 3, whilst 0 represents no alien. Depending on each level, you can change from bottom top what type, how many and what direction the alines come from.  */

  var spriteData = { 
    'alien1': { sx: 0,  sy: 0,  w: 20, h: 18, cls: Alien, frames: 2 }, 								
    'alien2': { sx: 0,  sy: 18, w: 20, h: 18, cls: Alien, frames: 2 },
    'alien3': { sx: 48,  sy: 0, w: 20, h:18, cls: Alien, frames: 2 },
    'player': { sx: 0,  sy: 36, w: 26, h: 17, cls: Player, frames: 3 },
    'missile': { sx: 0,  sy: 86, w: 6,  h: 14, cls: Missile },
    'alien4': { sx: 0, sy: 60, w: 20, h: 18, cls: BossAlien, frames: 2 },
  }                                                                                                 /* This overall section relies on the sprite sheet, by taking the co-ordinates, heigh and width of each individal sprite it corresponds correctly - also has the amount of frames per sprite to represent movement */

  function startGame() {
    var screen = new GameScreen("PACMAN INVADERS","PRESS SPACE TO START",                           /* This represents what is shown in the start screen*/
                                
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
    Game.loop();
    GameAudio.play('start'); 
  }

  function endGame() {
    var screen = new GameScreen("Game Over","(Press space to restart)",                             /* This represents what is shown when you get hit by an alien missile */
                                
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }


  function winGame() {
    var screen = new GameScreen("You Win!","(Press space to restart)",                              /* This represents what is shown when you beat all 3 levels and win the game */
                                
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }

  $(function() {
    GameAudio.load({ 'fire' : 'media/waka.ogg', 'die' : 'media/laserdeath.ogg', 'start' : 'media/startsound.ogg', 'bossfire' : 'media/bosslaser.ogg'}, /* These are the sound files which are enabled and accompany each main action */
                   
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });



