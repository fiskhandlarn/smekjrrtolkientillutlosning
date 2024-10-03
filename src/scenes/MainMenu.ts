import { Scene, GameObjects } from 'phaser';
import { config } from '../main';

export class MainMenu extends Scene
{
  background: GameObjects.Image;
  introText: GameObjects.Image;
  title: GameObjects.Text;

  constructor ()
    {
      super('MainMenu');
    }

  create ()
    {
      this.background = this.add.image(config.width / 2, config.height / 2, 'background');

      this.introText = this.add.image(config.width / 2 + 5, config.height / 2 - 9, 'introText');
      console.log(config);

      this.title = this.add.text(512, 460, 'Main Menu', {
        fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        stroke: '#000000', strokeThickness: 8,
        align: 'center'
      }).setOrigin(0.5);

      this.input.once('pointerdown', () => {

        this.scene.start('Game');

      });
    }
}
