import { GameObjects, Scene } from 'phaser';
//import { framesToMilliseconds } from '../framesToMilliseconds';
// import { logWithTime } from '../logWithTime';

const originX = 78;

export class Meters extends GameObjects.Container
{
  excitementMeter: GameObjects.Image;
  timeMeter: GameObjects.Image;
  currentExcitement: integer = 0;
  currentTime: integer = 0;

  constructor(scene: Scene, x: number, y: number, children: Array<GameObjects.GameObject>) {
    super(scene, x, y, children);

    this.scene.add.image(x, y, 'controllers');

    this.excitementMeter = this.scene.add.image(originX, 20, 'controllers_upphetsningfyll');
    this.timeMeter = this.scene.add.image(originX, 56, 'controllers_tidfyllnad');

    this.excitementMeter.setMask(this.scene.add.bitmapMask(null, this.excitementMeter.x, this.excitementMeter.y, 'controllers_mask'));
    this.timeMeter.setMask(this.scene.add.bitmapMask(null, this.timeMeter.x, this.timeMeter.y, 'controllers_mask'));

    this.excitement(this.currentExcitement);
    this.time(this.currentTime);
  }

  excitement(value) {
    this.currentExcitement = value;
    this.excitementMeter.x = Math.round(originX - (1 - this.currentExcitement) * this.excitementMeter.width);
  }

  time(value) {
    this.currentTime = value;
    this.timeMeter.x = Math.round(originX - (1 - this.currentTime) * this.timeMeter.width);
  }
}
