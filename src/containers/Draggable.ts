import { GameObjects, Input, Scene, Sound } from 'phaser';

export class Draggable extends GameObjects.Container
{
  backPlaceCount: number = 1;
  backPlacefromX: number;
  backPlacefromY: number;
  backPlaceMoving: boolean = false;
  frames: Array<GameObjects.Image> = [];
  currentFrame: GameObjects.Image;
  isEnabled: boolean = false;
  originX: number;
  originY: number;
  sprite: GameObjects.Image;

  constructor(scene: Scene, x: number, y: number, texture: string, children?: Array<GameObjects.GameObject>) {
    super(scene, x, y, children);

    this.originX = x;
    this.originY = y;

    this.sprite = this.scene.add.image(x, y, texture);
    this.sprite.setInteractive();
    this.frames.push(this.sprite);
    this.currentFrame = this.sprite;

    this.scene.input.on('drag', (pointer: Input.Pointer, gameObject: GameObjects.Image, dragX: number, dragY: number) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.scene.input.on('dragstart', () => {
      this.scene.input.setDefaultCursor('grabbing');
    });
  }

  alignFramesWithSprite() {
    // move all frames to current position
    this.frames.slice(1).forEach((frame) => {
      frame.x = this.sprite.x;
      frame.y = this.sprite.y;
    });
  }

  disable() {
     this.isEnabled = false;
  }

  disableDrag() {
    this.scene.input.setDefaultCursor('default');
    this.sprite.off('pointerover');
    this.sprite.off('pointerout');
    this.scene.input.setDraggable(this.sprite, false);
  }

  enable() {
    this.isEnabled = true;
  }

  enableDrag() {
    this.sprite.on('pointerover', () => {
      this.scene.input.setDefaultCursor('grab');
    });

    this.sprite.on('pointerout', () => {
      this.scene.input.setDefaultCursor('default');
    });

    this.scene.input.setDraggable(this.sprite);
  }

  hitarea() {
    return this.sprite;
  }

  update() {
    if (this.backPlaceMoving) {
      let percent = (1 - Math.cos((this.backPlaceCount * 10) / 100 * Math.PI)) / 2;
      this.sprite.x = ((1 - percent) * this.backPlacefromX) + (percent * this.originX);
      this.sprite.y = ((1 - percent) * this.backPlacefromY) + (percent * this.originY);
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
  }
}
