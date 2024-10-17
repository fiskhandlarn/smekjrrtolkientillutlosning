import { GameObjects, Input, Scene, Sound } from 'phaser';

export class Popper extends GameObjects.Container
{
  backPlaceCount = 1;
  backPlacefromX: number;
  backPlacefromY: number;
  backPlaceMoving = false;
  currentFrame: GameObjects.Image;
  frames: Array<GameObjects.Image> = [];
  isEnabled: boolean = false;
  originX: number;
  originY: number;
  playPoppersAnim = false;
  playPoppersAnimCount: number = 0;
  popper: GameObjects.Image;
  sound: Sound.NoAudioSound | Sound.HTML5AudioSound | Sound.WebAudioSound;

  constructor(scene: Scene, x: number, y: number, children: Array<GameObjects.GameObject>) {
    super(scene, x, y, children);

    this.originX = x;
    this.originY = y;

    this.popper = this.scene.add.image(x, y, 'poppers');
    this.popper.setInteractive();
    // this.popper.name = 'poppers'; // TODO tmp
    this.frames.push(this.popper);

    [
      'popperanim1',
      'popperanim2',
      'popperanim3',
      'popperanim4',
      'popperanim5',
    ].forEach((texture) => {
      const frame = this.scene.add.image(x, y, texture);
      frame.visible = false;
      // frame.name = texture; // TODO tmp
      this.frames.push(frame);
    });

    this.sound = this.scene.sound.add('popper');

    this.scene.input.on('drag', (pointer: Input.Pointer, gameObject: GameObjects.Image, dragX: number, dragY: number) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.scene.input.on('dragstart', () => {
      this.scene.input.setDefaultCursor('grabbing');

      /* TODO:
      if (parentScript.handPenisState = 0) {
        sprite(spriteNum).locZ = parentScript.spriteZ // ???
        parentScript.spriteZ = parentScript.spriteZ + 1 // ???
        parentScript.poppersState = 1 // this only controls if the popper should follow the mouse in Internal_16_poppersBehavior.ls
      }
       */
    });

    this.scene.input.on('dragend', () => {
      this.scene.input.setDefaultCursor('grab');

      if (this.originX !== this.popper.x && this.originY !== this.popper.y) {
        this.disableDrag();

        if (this.isEnabled) {
          this.isEnabled = false;
          this.sound.play();

          this.backPlaceMoving = false;
          this.playPoppersAnim = true;

          // move all frames to current position
          this.frames.slice(1).forEach((frame) => {
            frame.x = this.popper.x;
            frame.y = this.popper.y;
          });
        } else {
          this.backPlaceMoving = true;
          this.playPoppersAnim = false;
        }

        this.currentFrame = this.popper;
        this.backPlacefromX = this.popper.x;
        this.backPlacefromY = this.popper.y;
        this.backPlaceCount = 1;
        this.playPoppersAnimCount = 0;
      }
    });

    this.enableDrag();
  }

  disable() {
     this.isEnabled = false;
  }

  disableDrag() {
    this.scene.input.setDefaultCursor('default');
    this.popper.off('pointerover');
    this.popper.off('pointerout');
    this.scene.input.setDraggable(this.popper, false);
  }

  enable() {
    this.isEnabled = true;
  }

  enableDrag() {
    this.popper.on('pointerover', () => {
      this.scene.input.setDefaultCursor('grab');
    });

    this.popper.on('pointerout', () => {
      this.scene.input.setDefaultCursor('default');
    });

    this.scene.input.setDraggable(this.popper);
  }

  hitarea() {
    return this.popper;
  }

  update() {
    //console.log('update', this.isEnabled);

    if (this.backPlaceMoving) {
      let percent = (1 - Math.cos((this.backPlaceCount * 10) / 100 * Math.PI)) / 2;
      this.popper.x = ((1 - percent) * this.backPlacefromX) + (percent * this.originX);
      this.popper.y = ((1 - percent) * this.backPlacefromY) + (percent * this.originY);
      this.backPlaceCount++;

      // console.log(
      //   'update moving back',
      //   percent,
      //   this.backPlaceMoving,
      //   this.playPoppersAnim,
      //   this.backPlacefromX,
      //   this.backPlacefromY,
      //   this.backPlaceCount,
      // );
    }

    if (this.backPlaceMoving && this.backPlaceCount > 9) {
      this.backPlaceMoving = false;
      this.enableDrag();

      // console.log(
      //   'update: stop moving back',
      //   this.backPlaceCount,
      // );
    }

    if (this.playPoppersAnim) {
      // console.log(
      //   'update play anim',
      //   this.backPlaceMoving,
      //   this.playPoppersAnim,
      //   this.backPlacefromX,
      //   this.backPlacefromY,
      //   this.backPlaceCount,
      //   this.playPoppersAnimCount,
      // );

      /*
      this will make the animation play like this ¯\_(ツ)_/¯
      frame  0: poppers
      frame  1: poppers
      frame  2: popperanim1
      frame  3: popperanim1
      frame  4: popperanim2
      frame  5: popperanim2
      frame  6: popperanim3
      frame  7: popperanim3
      frame  8: popperanim4
      frame  9: popperanim4
      frame 10: popperanim5
      frame 11: poppers
       */

      if (this.frames[this.playPoppersAnimCount]) {
        this.currentFrame = this.frames[this.playPoppersAnimCount];
      }

      if (this.playPoppersAnimCount > 5) {
        this.currentFrame = this.popper;

        this.backPlaceMoving = true;
        this.playPoppersAnim = false;
      }

      // console.log('frame', (this.playPoppersAnimCount*2) + ':', this.currentFrame.name);

      this.frames.forEach((frame) => {
        frame.visible = (frame === this.currentFrame);
      });

      this.playPoppersAnimCount = this.playPoppersAnimCount + 0.5;
    }
  }
}
