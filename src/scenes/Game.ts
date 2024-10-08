import { Scene, GameObjects } from 'phaser';
import { config } from '../main';
import { framesToMilliseconds } from '../framesToMilliseconds';
import { logWithTime } from '../logWithTime';
import { Arm } from '../containers/Arm';
import { Blunda } from '../containers/Blunda';
import { Huvud } from '../containers/Huvud';
import { GramophoneButton } from '../containers/GramophoneButton';

export class Game extends Scene
{
  arm: Arm;
  background: GameObjects.Image;
  blunda: Blunda;
  gramofon: GameObjects.Image;
  kork: GameObjects.Image;
  champagneFlaska: GameObjects.Image;
  // : GameObjects.Image;
  // : GameObjects.Image;
  // : GameObjects.Image;
  huvud: Huvud;
  gramophoneButton1: GramophoneButton;
  gramophoneButton2: GramophoneButton;
  gramophoneButton3: GramophoneButton;
  gramophoneButtons: array;
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

    this.scene1();
  }

  onToggleGramophoneButton(target) {
    // TODO stop all sounds

    if (target.isActive) {
      this.gramophoneButtons.forEach((button) => {
        if (button !== target) {
          button.disable();
        }
      });

      // TODO play the corresponding sound
    }
  }

  scene1() {
    this.background = this.add.image(config.width / 2, config.height / 2, 'background');

    this.tolkien = this.add.image(274+1, 205, 'tolkien');
    this.pupillLeft = this.add.rectangle(263, 51, 2, 2, 0X000000);
    this.pupillRight = this.add.rectangle(279, 51, 2, 2, 0X000000);

    this.blunda = new Blunda(this, 270, 48);
    this.huvud = new Huvud(this, 278, 46);
    this.arm = new Arm(this, 184, 234);

    // this.input.once('pointerdown', () => {
    //   this.scene.start('GameOver');
    // });

    this.overlay = this.add.rectangle(config.width / 2, config.height / 2, config.width, config.height, 0X000000 );
    this.overlay.alpha = 0.5;
    this.overlay.depth = 10;

    this.time.addEvent({
      delay: framesToMilliseconds(1),
      loop: false,
      callback: () => this.scene2(),
      callbackScope: this,
    });
  }

  scene2() {
    logWithTime('scene2');
    this.gramofon = this.add.image(457, 238, 'gramofon');

    this.time.addEvent({
      delay: framesToMilliseconds(1),
      loop: false,
      callback: () => this.scene3(),
      callbackScope: this,
    });
  }

  scene3() {
    logWithTime('scene3');
    this.kork = this.add.image(49, 247, 'kork');
    this.champagneFlaska = this.add.image(48, 302, 'champagne_flaska');

    this.gramophoneButton1 = new GramophoneButton(this, 453, 291);
    this.gramophoneButton2 = new GramophoneButton(this, 469, 291);
    this.gramophoneButton3 = new GramophoneButton(this, 485, 291);

    this.gramophoneButtons = [
      this.gramophoneButton1,
      this.gramophoneButton2,
      this.gramophoneButton3,
    ];

    // listen to all buttons
    this.events.on('toggle', (target) => this.onToggleGramophoneButton(target));

    // this. = this.add.image(, , '');
    // this. = this.add.image(, , '');
    // this. = this.add.image(, , '');
    // this. = this.add.image(, , '');

    // TODO remove instead
    //this.overlay.depth = -1;
  }

  update() {
    this.blunda.update();
  }
}
