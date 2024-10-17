import { GameObjects, Scene } from 'phaser';

export class Blunda extends GameObjects.Container
{
  image: GameObjects.Image;
  step: integer = 1;

  constructor(scene: Scene, x: number, y: number, children?: Array<GameObjects.GameObject>) {
    super(scene, x, y, children);

    this.image = this.scene.add.image(x, y, 'blunda');
    this.image.visible = false;
  }

  update() {
    this.step++;

    if (12 === this.step) {
      this.step = 0;
      this.image.visible = (1 === Math.round(Math.random()*10));
    }
  }
}
