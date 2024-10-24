import { Game, Types } from "phaser";
import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

export const FPS = 25;

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
export const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 532,
  height: 418,
  parent: 'game-container',
  backgroundColor: '#000000',
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  fps: {
    target: FPS,
    forceSetTimeOut: true
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      fps: FPS
    }
  },
  scene: [
    Boot,
    Preloader,
    MainMenu,
    MainGame,
    GameOver
  ]
};

export default new Game(config);
