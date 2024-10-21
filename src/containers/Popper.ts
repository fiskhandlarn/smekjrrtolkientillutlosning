import { GameObjects, Scene, Sound } from 'phaser';
import { Draggable } from './Draggable';

export class Popper extends Draggable
{
  playPoppersAnim = false;
  playPoppersAnimCount: number = 0;
  sound: Sound.NoAudioSound | Sound.HTML5AudioSound | Sound.WebAudioSound;

  constructor(scene: Scene, x: number, y: number, children?: Array<GameObjects.GameObject>) {
    super(scene, x, y, 'poppers', children);

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

    /* TODO:
    this.scene.input.on('dragstart', () => {

      if (parentScript.handPenisState = 0) {
        sprite(spriteNum).locZ = parentScript.spriteZ // ???
        parentScript.spriteZ = parentScript.spriteZ + 1 // ???
        parentScript.poppersState = 1 // this only controls if the popper should follow the mouse in Internal_16_poppersBehavior.ls
      }
    });
     */

    this.scene.input.on('dragend', () => {
      this.scene.input.setDefaultCursor('grab');

      if (this.originX !== this.sprite.x && this.originY !== this.sprite.y) {
        this.disableDrag();

        if (this.isEnabled) {
          this.isEnabled = false;
          this.sound.play();

          this.backPlaceMoving = false;
          this.playPoppersAnim = true;

          this.alignFramesWithSprite();
        } else {
          this.backPlaceMoving = true;
          this.playPoppersAnim = false;
        }

        this.currentFrame = this.sprite;
        this.backPlacefromX = this.sprite.x;
        this.backPlacefromY = this.sprite.y;
        this.backPlaceCount = 1;
        this.playPoppersAnimCount = 0;
      }
    });

    this.enableDrag();
  }

  update() {
    //console.log('update', this.isEnabled);

    super.update();

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
        this.currentFrame = this.sprite;

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
