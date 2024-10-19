import { GameObjects, Input, Scene, Sound } from 'phaser';

export class Draggable extends GameObjects.Container
{
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

    this.scene.input.on('dragend', () => {
      this.scene.input.setDefaultCursor('grab');
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
}
