import { GameObjects, Scene } from 'phaser';

export class Preloader extends Scene
{
  text: GameObjects.Text;

  constructor () {
    super('Preloader');
  }

  init () {
    // TODO preload animation
    /*
    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + (460 * progress);
    });
   */
  }

  preload () {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath('assets');

    this.load.image('background', 'Graphics_2_bg.png');
    this.load.image('blunda', 'Graphics_16_blunda.png');
    this.load.image('huvud_arg', 'Graphics_18_huvud_arg.png');
    this.load.image('huvud_arg2', 'Graphics_20_huvud_arg2.png');
    this.load.image('introText', 'Graphics_70_rubriklager.png');
    this.load.image('tolkien', 'Graphics_22_tolkien.png');
    this.load.image('tolkien_arm1', 'tolkien_arm1.png');
    this.load.image('tolkien_arm2', 'tolkien_arm2.png');

    this.load.audio('intro', 'Sounds_4_peergynt.mp3');
  }

  create () {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    // TODO replace with gfx
    const text = this.add.text(0, 0, 'START (todo replace me with gfx)', { font: '16px Courier', fill: '#00ff00' });
    text.setInteractive();
    text.once('pointerdown', () => {
      this.scene.start('MainMenu');
    });
  }
}
