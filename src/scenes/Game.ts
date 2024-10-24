import { Scene, GameObjects } from 'phaser';
import { config } from '../main';
import { framesToMilliseconds } from '../framesToMilliseconds';
import { logWithTime } from '../logWithTime';
import { Arm } from '../containers/Arm';
import { Blunda } from '../containers/Blunda';
import { Candle } from '../containers/Candle';
import { Gramophone } from '../containers/Gramophone';
import { GramophoneButton } from '../containers/GramophoneButton';
import { Hitarea } from '../containers/Hitarea';
import { Huvud } from '../containers/Huvud';
import { Meters } from '../containers/Meters';
import { Pipe } from '../containers/Pipe';
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
  hitarea: Hitarea;
  huvud: Huvud;
  introText: GameObjects.Image;
  kork: GameObjects.Image;
  overlay?: GameObjects.Rectangle;
  overlayHitarea?: GameObjects.Zone;
  pipe: Pipe;
  popper: Popper;
  pupillLeft: GameObjects.Rectangle;
  pupillRight: GameObjects.Rectangle;
  updateItems: Array<GameObjects.Container> = [];

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
    this.updateItems.push(this.blunda);

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

    this.advance(1, this.scene7);
  }

  scene7() {
    logWithTime('scene7');

    this.pipe = new Pipe(this, 123, 392);

    // TODO set delay
    this.advance(5, this.scene242);
  }

  scene242() { // TODO final nr
    logWithTime('scene242');

    this.hitarea = new Hitarea(this, 270, 72, 32, 46);
    this.hitarea.on('overlapstart', (target: GameObjects.Image) => {
      switch (target) {
        case this.pipe.hitarea():
          this.pipe.enable();
          break;
        case this.popper.hitarea():
          this.popper.enable();
          break;
      }
    });
    this.hitarea.on('overlapend', (target: GameObjects.Image) => {
      switch (target) {
        case this.pipe.hitarea():
          this.pipe.disable();
          break;
        case this.popper.hitarea():
          this.popper.disable();
          break;
      }
    });

    this.hitarea.addCollider(this.popper.hitarea());
    this.hitarea.addCollider(this.pipe.hitarea());

    // remove overlay ...
    this.overlay?.destroy();
    delete this.overlay;
    // ... and enable interaction
    this.overlayHitarea?.destroy();
    delete this.overlayHitarea;

    // enable updating components
    this.updateItems.push(this.gramophone);
    this.updateItems.push(this.candle1);
    this.updateItems.push(this.candle2);
    this.updateItems.push(this.popper);
    this.updateItems.push(this.hitarea);
    this.updateItems.push(this.pipe);

    // TODO is this needed if the scene is reset?
    this.candle1.reset();
    this.candle2.reset();
  }

  update() {
    this.updateItems.forEach((item) => {
      item.update();
    });
  }
}
