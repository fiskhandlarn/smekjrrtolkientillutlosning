import { Scene, GameObjects } from 'phaser';
import { config } from '../main';
import { logWithTime } from '../logWithTime';
import { Arm } from '../containers/Arm';
import { Blunda } from '../containers/Blunda';
import { Huvud } from '../containers/Huvud';

export class Game extends Scene
{
  arm: Arm;
  background: GameObjects.Image;
  blunda: Blunda;
  huvud: Huvud;
  introText: GameObjects.Image;
  overlay: GameObjects.Rectangle;
  pupillLeft: GameObjects.Rectangle;
  pupillRight: GameObjects.Rectangle;
  tolkien: GameObjects.Image;

  constructor () {
    super('Game');
  }

  create() {
    logWithTime('Game.create');

    this.background = this.add.image(config.width / 2, config.height / 2, 'background');

    this.tolkien = this.add.image(274+1, 205, 'tolkien');
    this.pupillLeft = this.add.rectangle(263, 51, 2, 2, 0X000000 );
    this.pupillRight = this.add.rectangle(279, 51, 2, 2, 0X000000 );

    this.blunda = new Blunda(this, 270, 48);
    this.huvud = new Huvud(this, 278, 46);
    this.arm = new Arm(this, 184, 234);

    // this.input.once('pointerdown', () => {
    //   this.scene.start('GameOver');
    // });

    this.overlay = this.add.rectangle(config.width / 2, config.height / 2, config.width, config.height, 0X000000 );
    this.overlay.alpha = 0.5;
  }

  update() {
    this.blunda.update();
  }
}
