import { Scene, GameObjects } from 'phaser';
import { config } from '../main';
import { framesToMilliseconds } from '../framesToMilliseconds';
import { logWithTime } from '../logWithTime';
import { Arm } from '../containers/Arm';
import { Blunda } from '../containers/Blunda';
import { Candle } from '../containers/Candle';
import { Gramophone } from '../containers/Gramophone';
import { GramophoneButton } from '../containers/GramophoneButton';
import { Huvud } from '../containers/Huvud';
import { Meters } from '../containers/Meters';

export class Game extends Scene
{
  arm: Arm;
  blunda: Blunda;
  candle1: Candle;
  candle2: Candle;
  gramophone: Gramophone;
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
  gramophoneSounds: array;
  gramophoneSoundListeners: array = [];
  introText: GameObjects.Image;
  overlay: GameObjects.Rectangle;
  overlayHitarea: GameObjects.Zone;
  pupillLeft: GameObjects.Rectangle;
  pupillRight: GameObjects.Rectangle;

  constructor () {
    super('Game');
  }

  create() {
    logWithTime('Game.create');

    this.gramophoneSounds = [
      this.sound.add('sound1'),
      this.sound.add('sound2'),
      this.sound.add('sound3'),
    ];

    this.scene1();
  }

  onCompleteGramophoneSound(key) {
    //console.log('onCompleteGramophoneSound', key);
    this.gramophoneSounds[key].removeAllListeners('complete');

    this.gramophone.disable();
  }

  onToggleGramophoneButton(target) {
    this.gramophoneSounds.forEach((sound) => {
      sound.stop();
      sound.removeAllListeners('complete');
    });

    this.gramophone.enable();

    if (target.isActive) {
      this.gramophoneButtons.forEach((button, key) => {
        if (button === target) {
          this.gramophoneSounds[key].play();
          // TODO: sound(8).volume = 96
          this.gramophoneSoundListeners[key] = this.gramophoneSounds[key].addListener('complete', () => this.onCompleteGramophoneSound(key));
        } else {
          button.disable();
        }
      });
    }
  }

  scene1() {
    this.add.image(config.width / 2, config.height / 2, 'background');

    this.add.image(274+1, 205, 'tolkien');
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

    const corners = this.add.image(config.width / 2, config.height / 2, 'corners');
    corners.depth = 20;

    // block all interactions
    this.overlayHitarea = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);
    this.overlayHitarea.setInteractive();
    this.overlayHitarea.depth = 242;

    this.time.addEvent({
      delay: framesToMilliseconds(1),
      loop: false,
      callback: () => this.scene2(),
      callbackScope: this,
    });
  }

  scene2() {
    logWithTime('scene2');
    this.gramophone = new Gramophone(this, 457, 238);

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

    this.meters = new Meters(this, 79, 39);
    this.meters.excitement(0.0625);
    this.meters.time(.68);

    // this. = this.add.image(, , '');
    // this. = this.add.image(, , '');
    // this. = this.add.image(, , '');
    // this. = this.add.image(, , '');

    this.time.addEvent({
      delay: framesToMilliseconds(1),
      loop: false,
      callback: () => this.scene4(),
      callbackScope: this,
    });
  }

  scene4() {
    logWithTime('scene4');
    this.candle1 = new Candle(this, 85, 358, 'a');

    this.time.addEvent({
      delay: framesToMilliseconds(1),
      loop: false,
      callback: () => this.scene5(),
      callbackScope: this,
    });
  }

  scene5() {
    logWithTime('scene5');
    this.candle2 = new Candle(this, 481, 353, 'b');

    this.time.addEvent({
      delay: framesToMilliseconds(5), // TODO
      loop: false,
      callback: () => this.scene242(),
      callbackScope: this,
    });
  }

  scene242() { // TODO final nr
    logWithTime('scene242');

    // remove overlay ...
    this.overlay.destroy();
    // ... and enable interaction
    this.overlayHitarea.destroy();
    delete this.overlayHitarea;

    // TODO is this needed if the scene is reset?
    this.candle1.reset();
    this.candle2.reset();
  }

  update() {
    if (this.blunda) {
      this.blunda.update();
    }

    if (!this.overlayHitarea) {
      if (this.gramophone) {
        this.gramophone.update();
      }

      if (this.candle1) {
        this.candle1.update();
      }

      if (this.candle2) {
        this.candle2.update();
      }
    }
  }
}
