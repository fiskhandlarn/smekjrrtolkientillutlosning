import { GameObjects, Scene } from 'phaser';

export class Candle extends GameObjects.Container
{
  candle: GameObjects.Image;
  fire1: GameObjects.Image;
  fire2: GameObjects.Image;
  isActive: boolean = false;
  counter: integer = 0;

  constructor(scene: Scene, x: number, y: number, candleType: string, children: Array<GameObjects.GameObject>) {
    super(scene, x, y, children);

    this.candle = this.scene.add.image(x, y, 'ljus_' + candleType);
    this.fire1 = this.scene.add.image(x + (86 - 85), y + (321 - 358), 'fire1');
    this.fire2 = this.scene.add.image(x + (86 - 85), y + (321 - 358), 'fire2');

    this.fire1.visible = false;
    this.fire2.visible = false;

    this.candle.setInteractive();
  }

  activate() {
    this.isActive = true;
    this.counter = 0;
    this.fire1.visible = true;
  }

  reset() {
    this.fire1.visible = false;
    this.fire2.visible = false;
    this.isActive = false;
    this.candle.once('pointerdown', () => this.activate());
  }

  update() {
    if (this.isActive) {
      if (this.counter > 9) {
        this.counter = 0;

        // switch fire image
        this.fire1.visible = !this.fire1.visible;
        this.fire2.visible = !this.fire2.visible;
      }

      this.counter++;
    }
  }
}
