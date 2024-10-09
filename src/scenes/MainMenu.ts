import { Scene, GameObjects } from 'phaser';
import { config } from '../main';
import { framesToMilliseconds } from '../framesToMilliseconds';
import { logWithTime } from '../logWithTime';

export class MainMenu extends Scene
{
  introText: GameObjects.Image;

  constructor () {
    super('MainMenu');
  }

  create () {
    logWithTime('create');

    this.time.addEvent({
      delay: framesToMilliseconds(5),
      loop: false,
      callback: () => this.begin(),
      callbackScope: this,
    });
  }

  begin () {
    logWithTime('begin');

    this.add.image(config.width / 2, config.height / 2, 'background');

    const overlay = this.add.rectangle(config.width / 2, config.height / 2, config.width, config.height, 0X000000 );
    overlay.alpha = 0.5;

    this.introText = this.add.image(config.width / 2 + 5, config.height / 2 - 9 - 311, 'introText');

    this.add.image(config.width / 2, config.height / 2, 'corners');

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
      delay: framesToMilliseconds(20-5),
      duration: framesToMilliseconds(49-20-5),
      onComplete: () => {
        logWithTime('complete intro anim!');
      }
    });
  }

  onCompleteMusic() {
    logWithTime('complete music');

    this.children.remove(this.introText);

    this.time.addEvent({
      delay: framesToMilliseconds(3),
      loop: false,
      callback: () => this.startGame(),
      callbackScope: this,
    });
  }

  startGame() {
    logWithTime('startGame');
    this.scene.start('Game');
  }
}
