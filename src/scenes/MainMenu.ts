import { Scene, GameObjects } from 'phaser';
import { config } from '../main';

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
      delay: this.framesToMilliseconds(5),
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

    const music = this.sound.add('intro');
    music.play();
    music.addListener('complete', () => this.onCompleteMusic());

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
      delay: this.framesToMilliseconds(20-5),
      duration: this.framesToMilliseconds(49-20-5),
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

  onCompleteMusic() {
    this.logWithTime('complete music');

    this.children.remove(this.introText);

    this.time.addEvent({
      delay: this.framesToMilliseconds(3),
      loop: false,
      callback: () => this.startGame(),
      callbackScope: this,
    });
  }

  startGame() {
    this.logWithTime('startGame');
    this.scene.start('Game');
  }
}
