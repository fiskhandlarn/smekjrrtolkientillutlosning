import { Scene, GameObjects } from 'phaser';
import { config } from '../main';

export class MainMenu extends Scene
{
  background: GameObjects.Image;
  introText: GameObjects.Image;
  overlay: GameObjects.Rectangle;

  constructor ()
    {
      super('MainMenu');
    }

  create ()
    {
      this.background = this.add.image(config.width / 2, config.height / 2, 'background');

      this.overlay = this.add.rectangle(config.width / 2, config.height / 2, config.width, config.height, 0X000000 );
      this.overlay.alpha = 0.5;

      this.introText = this.add.image(config.width / 2 + 5, config.height / 2 - 9, 'introText');

      this.input.once('pointerdown', () => {
        this.scene.start('Game');
      });
    }
}
