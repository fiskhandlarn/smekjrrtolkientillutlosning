import { Scene, GameObjects } from 'phaser';
import { config } from '../main';
import { logWithTime } from '../logWithTime';
import { Blunda } from '../sprites/Blunda';
import { Huvud } from '../sprites/Huvud';

export class Game extends Scene
{
  background: GameObjects.Image;
  introText: GameObjects.Image;
  blunda: Blunda;
  huvud: Huvud;
  tolkien: GameObjects.Image;
  pupillLeft: GameObjects.Rectangle;
  pupillRight: GameObjects.Rectangle;
  overlay: GameObjects.Rectangle;

  constructor () {
    super('Game');
  }

  create() {
    logWithTime('Game.create');

    this.background = this.add.image(config.width / 2, config.height / 2, 'background');

    this.overlay = this.add.rectangle(config.width / 2, config.height / 2, config.width, config.height, 0X000000 );
    this.overlay.alpha = 0.5;

    this.tolkien = this.add.image(274+1, 205, 'tolkien');
    this.pupillLeft = this.add.rectangle(263, 51, 2, 2, 0X000000 );
    this.pupillRight = this.add.rectangle(279, 51, 2, 2, 0X000000 );

    this.blunda = new Blunda(this, 270, 48);
    this.huvud = new Huvud(this, 278, 46);

    // this.input.once('pointerdown', () => {
    //   this.scene.start('GameOver');
    // });
  }

  update() {
    this.blunda.update();
  }
}
