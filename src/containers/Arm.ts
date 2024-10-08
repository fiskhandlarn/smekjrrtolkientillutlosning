import { GameObjects } from 'phaser';

export class Arm extends GameObjects.Container
{
  arm1: GameObjects.Image;
  arm2: GameObjects.Image;

  constructor(scene, x, y, children) {
    super(scene, x, y, children);

    this.arm1 = this.scene.add.image(x, y, 'tolkien_arm1');
    this.arm2 = this.scene.add.image(x, y, 'tolkien_arm2');

    // TODO logic for arm
    this.arm2.visible = false;
  }
}