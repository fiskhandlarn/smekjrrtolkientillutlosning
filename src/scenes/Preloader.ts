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

    // this.load.image('', '.png');
    this.load.image('background', 'Graphics_2_bg.png');
    this.load.image('blunda', 'Graphics_16_blunda.png');
    this.load.image('buttonActive', 'buttonActive.png');
    this.load.image('buttonInActive', 'buttonInActive.png');
    this.load.image('champagne_flaska', 'champagne_flaska.png');
    this.load.image('controllers', 'controllers.png');
    this.load.image('controllers_mask', 'controllers_mask1.png');
    this.load.image('controllers_tidfyllnad', 'controllers_tidfyllnad.png');
    this.load.image('controllers_upphetsningfyll', 'controllers_upphetsningfyll.png');
    this.load.image('corners', 'corners.png');
    this.load.image('fire1', 'fire1.png');
    this.load.image('fire2', 'fire2.png');
    this.load.image('gram_mask2', 'gram_mask2.png');
    this.load.image('gramofon', 'gramofon.png');
    this.load.image('huvud_arg', 'Graphics_18_huvud_arg.png');
    this.load.image('huvud_arg2', 'Graphics_20_huvud_arg2.png');
    this.load.image('introText', 'Graphics_70_rubriklager.png');
    this.load.image('kork', 'kork.png');
    this.load.image('ljus_a', 'ljus_a.png');
    this.load.image('ljus_b', 'ljus_b.png');
    this.load.image('not1', 'not1.png');
    this.load.image('not2', 'not2.png');
    this.load.image('not4', 'not4.png');
    this.load.image('pipa1', 'pipa1.png');
    this.load.image('pipa2', 'pipa2.png');
    this.load.image('pipa3', 'pipa3.png');
    this.load.image('pipa4', 'pipa4.png');
    this.load.image('pipa5', 'pipa5.png');
    this.load.image('pipa6', 'pipa6.png');
    this.load.image('pipa7', 'pipa7.png');
    this.load.image('popperanim1', 'popperanim1.png');
    this.load.image('popperanim2', 'popperanim2.png');
    this.load.image('popperanim3', 'popperanim3.png');
    this.load.image('popperanim4', 'popperanim4.png');
    this.load.image('popperanim5', 'popperanim5.png');
    this.load.image('poppers', 'poppers.png');
    this.load.image('tolkien', 'Graphics_22_tolkien.png');
    this.load.image('tolkien_arm1', 'tolkien_arm1.png');
    this.load.image('tolkien_arm2', 'tolkien_arm2.png');

    //    this.load.audio('intro', 'Sounds_4_peergynt.mp3');
    this.load.audio('intro', 'peergynt.mp3');
    this.load.audio('popper', 'popper.mp3');
    this.load.audio('sound1', 'sound1.mp3');
    this.load.audio('sound2', 'sound2.mp3');
    this.load.audio('sound3', 'sound3.mp3');

    // DEBUG:
    // this.load.audio('sound1', 'slutston2.mp3');
    // this.load.audio('sound2', 'champagne.mp3');
    // this.load.audio('sound3', 'popper.mp3');
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
