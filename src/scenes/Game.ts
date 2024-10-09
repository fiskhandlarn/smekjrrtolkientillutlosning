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
import { Popper } from '../containers/Popper';

export class Game extends Scene
{
  arm: Arm;
  blunda: Blunda;
  candle1: Candle;
  candle2: Candle;
  champagneFlaska: GameObjects.Image;
  gramophone: Gramophone;
  gramophoneButton1: GramophoneButton;
  gramophoneButton2: GramophoneButton;
  gramophoneButton3: GramophoneButton;
  gramophoneButtons: array;
  gramophoneSoundListeners: array = [];
  gramophoneSounds: array;
  huvud: Huvud;
  introText: GameObjects.Image;
  kork: GameObjects.Image;
  overlay: GameObjects.Rectangle;
  overlayHitarea: GameObjects.Zone;
  popper: Popper;
  pupillLeft: GameObjects.Rectangle;
  pupillRight: GameObjects.Rectangle;

  constructor () {
    super('Game');
  }

  advance(nrFrames: integer, scene: () => void) {
    this.time.addEvent({
      delay: framesToMilliseconds(nrFrames),
      loop: false,
      callback: scene,
      callbackScope: this,
    });
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
    logWithTime('scene1');

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

    this.advance(1, this.scene2);
  }

  scene2() {
    logWithTime('scene2');

    this.gramophone = new Gramophone(this, 457, 238);

    this.advance(1, this.scene3);
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

    this.advance(1, this.scene4);
  }

  scene4() {
    logWithTime('scene4');

    this.candle1 = new Candle(this, 85, 358, 'a');

    this.advance(1, this.scene5);
  }

  scene5() {
    logWithTime('scene5');

    this.candle2 = new Candle(this, 481, 353, 'b');

    this.advance(1, this.scene6);
  }

  scene6() {
    logWithTime('scene6');

    this.popper = new Popper(this, 406, 299);

    // TODO set delay
    this.advance(5, this.scene242);
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
