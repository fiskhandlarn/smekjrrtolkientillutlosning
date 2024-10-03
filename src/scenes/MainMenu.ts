import { Scene, GameObjects } from 'phaser';
import game, { config } from '../main';

export class MainMenu extends Scene
{
  background: GameObjects.Image;
  introText: GameObjects.Image;
  overlay: GameObjects.Rectangle;
  start: integer;

  constructor () {
    super('MainMenu');
  }

  create () {
    this.start = Date.now();
    this.logWithTime('create');

    this.time.addEvent({
      delay: this.framesToMilliseconds(5);
      loop: false,
      callback: () => this.begin(),
      callbackScope: this,
    });
  }

  begin () {
    this.logWithTime('begin');

    this.background = this.add.image(config.width / 2, config.height / 2, 'background');

    this.overlay = this.add.rectangle(config.width / 2, config.height / 2, config.width, config.height, 0X000000 );
    this.overlay.alpha = 0.5;

    this.introText = this.add.image(config.width / 2 + 5, config.height / 2 - 9 - 311, 'introText');

    // this.input.once('pointerdown', () => {
    //   this.scene.start('Game');
    // });

    this.tweens.add({
      targets: this.introText,
      props: {
        y: {
          value: '+=311',
          ease: 'none',
        }
      },
      delay: this.framesToMilliseconds(20-5);
      duration: this.framesToMilliseconds(49-20-5);
      onComplete: () => {
        this.logWithTime('complete intro anim!');
      }
    });
  }

  framesToMilliseconds(frames: integer):integer {
    return frames * (1000/config.fps.target);
  }

  logWithTime(message: string) {
    console.log(message, ((Date.now() - this.start) / config.fps.target));
  }
}
