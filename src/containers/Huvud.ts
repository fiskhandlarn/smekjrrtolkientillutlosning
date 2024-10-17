import { GameObjects, Scene } from 'phaser';
import { framesToMilliseconds } from '../framesToMilliseconds';
// import { logWithTime } from '../logWithTime';

export class Huvud extends GameObjects.Container
{
  arg: GameObjects.Image;
  arg2: GameObjects.Image;
  state: integer;
  isHappy: boolean = true;

  STATE_ANGRY1 = 11;
  STATE_ANGRY2 = 12;
  STATE_HAPPY1 = 21;
  STATE_HAPPY2 = 22;

  constructor(scene: Scene, x: number, y: number, children?: Array<GameObjects.GameObject>) {
    super(scene, x, y, children);

    this.arg = this.scene.add.image(x, y, 'huvud_arg');
    this.arg2 = this.scene.add.image(x, y, 'huvud_arg2');

    this.setState(this.STATE_HAPPY2);

    // TODO remove this
    const text = this.scene.add.text(x - 100, y - 30, 'toggle mood', { font: '16px Courier', fill: '#00ff00' });
    text.setInteractive();
    text.on('pointerdown', () => {
      this.toggle();
    });
  }

  toggle() {
    //logWithTime('toggle');

    if (this.isHappy) {
      this.setState(this.STATE_ANGRY1);

      this.scene.time.addEvent({
        delay: framesToMilliseconds(3),
        loop: false,
        callback: () => {
          this.setState(this.STATE_ANGRY2);
        },
        callbackScope: this,
      });
    } else {
      this.setState(this.STATE_HAPPY1);

      this.scene.time.addEvent({
        delay: framesToMilliseconds(3),
        loop: false,
        callback: () => {
          this.setState(this.STATE_HAPPY2);
        },
        callbackScope: this,
      });
    }

    this.isHappy = !this.isHappy;
  }

  setState(newState: integer) {
    //logWithTime('switching to new state: ' + newState);

    this.state = newState;

    switch (this.state) {
    case (this.STATE_ANGRY1):
      // TODO which sprite is visible in original?
      this.arg.visible = false;
      this.arg2.visible = true;
      //myState = #goAngry2
      break;
    case this.STATE_ANGRY2:
      this.arg.visible = true;
      this.arg2.visible = false;
      // myState = #isAngry
      break;
    case this.STATE_HAPPY1:
      this.arg.visible = false;
      this.arg2.visible = true;
      // myState = #goHappy2
      break;
    case this.STATE_HAPPY2:
      this.arg.visible = false;
      this.arg2.visible = false;
      // myState = #idle
      break;
    }
  }
}
